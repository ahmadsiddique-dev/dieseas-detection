import dbConnection from "@/connection/dbconnection";
import Signup from "@/models/signup.model";
import bcrypt from "bcryptjs";
import { ISignup } from "@/models/signup.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnection();

  try {
    const data: ISignup = await request.json();
    let { email, password, securityQuestion, securityAnswer } = data;

    if (!email || !password || !securityQuestion || !securityAnswer) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 },
      );
    }

    const existingUser = await Signup.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 400 },
      );
    }

    const encodedPassword = await bcrypt.hash(password, 10);

    if (!encodedPassword) {
      return NextResponse.json(
        { message: "Error encoding password", success: false },
        { status: 500 },
      );
    }

    data.password = encodedPassword;
    const user = await Signup.create(data);

    Object.assign(user, { password: undefined });

    
    let response = NextResponse.json(
      { message: "User signed up successfully", success: true, data: user },
      { status: 200 },
    );

    response.cookies.set("id", user._id.toString(), { httpOnly: true, secure: true });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Error signing up user", success: false },
      { status: 500 },
    );
  }
}
