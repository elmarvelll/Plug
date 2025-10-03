
import bcrypt from 'bcrypt'
const saltRounds = 10

export const hashPassword = async(password: string): Promise<string>=>{
    const hash = bcrypt.hash(password,saltRounds)
    return hash
}

export const comparePassword = async (password: string, hash: string) =>{
 return await bcrypt.compare(password,hash)
}