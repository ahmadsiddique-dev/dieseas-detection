import { Schema, model, models, Document } from 'mongoose';

interface ISingIn extends Document {
    email: string;
    password: string;
}

const SignInSchema = new Schema<ISingIn>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
})


const SignIn = models.SignIn || model<ISingIn>('SignIn', SignInSchema);

export default SignIn;