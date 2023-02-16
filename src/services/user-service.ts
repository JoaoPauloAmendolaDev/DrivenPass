import httpStatus from "http-status"
import {User} from "@prisma/client"
import userRepository from "@/repositories/user-repository";
import { conflictError, notFoundError, unauthorizedError } from "@/errors";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export type CreateUserType = Pick<User, "email" | "password">;

async function createUser(userData: CreateUserType){
    const verify = await verifyIfExistAnotherEmail(userData.email)
    if(verify) throw conflictError('this email is already registred')
    
    const cryptedPassword = await bcrypt.hash(userData.password, 10)

    const user = userRepository.createUser({email : userData.email, password: cryptedPassword})
    return user
}

async function verifyIfExistAnotherEmail(email: string){
    const verify = await userRepository.findUserByEmail(email)
    return verify
}

async function loginUser(userData: CreateUserType){
    const verify = await userRepository.findUserByEmail(userData.email)
    if(!verify) throw notFoundError()

    const verifyPassword = await bcrypt.compare(userData.password, verify.password)
    if(!verifyPassword) throw unauthorizedError()

    const secret = process.env.JWT_SECRET
    const payload = {
        email: verify.email
    }

    const jwtToken = jwt.sign(payload, secret)
    return {jwtToken, payload}
}


const userService = {
    createUser,
    verifyIfExistAnotherEmail,
    loginUser
}

export default userService