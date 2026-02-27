import dbConnection from "@/connection/dbconnection";
import SignIn from "@/models/signin.model";
import bcrypt from 'bcryptjs'
  

export async function POST(request: Request) {
  await dbConnection();

  try {
    const data = await request.json();
    let {email, password} = data;

    if (!email || !password) {
        return Response.json({ message: "Email and password are required", success: false }, { status: 400 });
    }

    const existingUser = await SignIn.findOne({ email });

    if (existingUser) {
        return Response.json({ message: "Email already exists", success: false }, { status: 400 });
    }

    const encodedPassword = await bcrypt.hash(password, 10);

    if (!encodedPassword) {
        return Response.json({ message: "Error encoding password", success: false }, { status: 500 });
    }

    data.password = encodedPassword;

    const user = await SignIn.create(data);

    Object.assign(user, { password: undefined });

    return Response.json({ message: "User signed in successfully", success: true, data: user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        return Response.json({ message: error.message, success: false }, { status: 500 });
    }
    return Response.json({ message: "Error signing in user", success: false }, { status: 500 });
  }
}
