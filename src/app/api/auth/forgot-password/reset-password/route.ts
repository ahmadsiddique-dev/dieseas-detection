
import dbConnection from "@/connection/dbconnection";
import Signup from "@/models/signup.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnection();
  const body = await request.json();

  try {
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ message: "Email and password are required", success: false }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Signup.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return Response.json({ message: "Email not found", success: false }, { status: 404 });
    }

    return Response.json({ message: "Password reset successfully", success: true }, { status: 200 });

  } catch (error) {
    return Response.json({ message: "Invalid request body", success: false }, { status: 400 });
  }


}