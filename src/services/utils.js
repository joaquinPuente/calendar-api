import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export async function hashPassword(password){
    const saltRound = 10;
    try {
        const hashPassword = await bcrypt.hash(password,saltRound)
        return hashPassword
    } catch (error) {
        throw new Error('Error to hash')
    }
}

export async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    } catch (error) {
        throw new Error('Not valid password')
    }
}

