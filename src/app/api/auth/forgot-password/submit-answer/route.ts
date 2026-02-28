import dbConnection from "@/connection/dbconnection";
import Signup from "@/models/signup.model";

export async function POST(request: Request) {
  await dbConnection();
  const body = await request.json();

  try {
    const { email, answer } = body;

    if (!email || !answer) {
      return Response.json(
        { message: "Email and answer are required", success: false },
        { status: 400 },
      );
    }

    const user = await Signup.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "Somethings went wrong", success: false },
        { status: 404 },
      );
    }

    if (!user.securityAnswer || user.securityAnswer.toLowerCase().trim() !== answer.toLowerCase().trim()) {
      return Response.json(
        { message: "Incorrect answer", success: false },
        { status: 400 },
      );
    }

    return Response.json(
      {
        message: "Answer verified successfully",
        success: true,
        data: { email: user.email },
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: "Invalid request body", success: false },
      { status: 400 },
    );
  }
}
