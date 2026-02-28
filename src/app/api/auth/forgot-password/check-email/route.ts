import dbConnection from "@/connection/dbconnection";
import Signup from "@/models/signup.model";

export async function POST(request: Request) {
   await dbConnection();
  const body = await request.json();

  try {
    const { email } = body;

    if (!email) {
        return Response.json({ message: "Email is required", success: false }, { status: 400 });
    }

    const user = await Signup.findOne({ email }).select("securityQuestion");

    if (!user) {
        return Response.json({ message: "Email not found", success: false }, { status: 404 });
    }   

    return Response.json({ message: "Email found", success: true, data: { securityQuestion: user.securityQuestion } }, { status: 200 });
    
  } catch (error) {
    return Response.json({ message: "Invalid request body", success: false }, { status: 400 });
  }

  
}