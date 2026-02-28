import dbConnection from "@/connection/dbconnection";
import { validator } from "@/hooks/validator";
import Signup from "@/models/signup.model";

export async function POST(request: Request) {

    const { email, password } = await request.json();
    
    await dbConnection();
    try {
        if (!email || !password) {
            return Response.json({message: "Email or password missing", success: false}, {status: 400})
        }

        const user = await Signup.findOne({email})
        
        if (!user) {
            return Response.json({message: "User not found", success: false}, {status: 404})
        }
        
        const isPasswordCorrect = await validator(password, user.password);

        if (!isPasswordCorrect) {
            return Response.json({message: "Incorrect Email or Password", success: false}, {status: 400})
        }
        
        return Response.json({message: "User loggedIn successfully", success: true}, {status: 200})
    } catch (error) {
        return Response.json({message: "Someting went wrong", success: false}, {status: 500})
    }
}