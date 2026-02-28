import dbConnection from "@/connection/dbconnection";
import { validator } from "@/hooks/validator";
import Signup from "@/models/signup.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { email, password } = await request.json();
    
    await dbConnection();
    try {
        console.log("Received login request for email:", email, password);
        if (!email || !password) {
            return NextResponse.json({message: "Email or password missing", success: false}, {status: 400})
        }

        const user = await Signup.findOne({email})
        
        if (!user) {
            return NextResponse.json({message: "User not found", success: false}, {status: 404})
        }
        
        const isPasswordCorrect = await validator(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({message: "Incorrect Email or Password", success: false}, {status: 400})
        }
        let response = NextResponse.json({message: "User loggedIn successfully", success: true}, {status: 200});

        response.cookies.delete("id");
        response.cookies.set("id", user._id.toString(), { httpOnly: true, secure: true });
        
        return response;
    } catch (error) {
        return NextResponse.json({message: "Someting went wrong", success: false}, {status: 500})
    }
}