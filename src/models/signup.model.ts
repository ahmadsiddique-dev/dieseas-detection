import { Schema, model, models, Document } from 'mongoose';

export interface ISignup extends Document {
    email: string;
    password: string;
    securityAnswer: string;
    securityQuestion: string;
}

const SignupSchema = new Schema<ISignup>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    securityAnswer: {
        type: String,
        required: [true, "Security answer is required"],   
    },
    securityQuestion: {
        type: String,
        required: [true, "Security question is required"],
    },
})


const Signup = models.SignIn || model<ISignup>('SignIn', SignupSchema);

export default Signup;