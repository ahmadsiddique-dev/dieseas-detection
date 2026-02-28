import bcrypt from "bcryptjs";

export async function validator(userPassword: string, encryptedPassword: string) {
    
    if (await bcrypt.compare(userPassword, encryptedPassword)) return true;
    return false;

}