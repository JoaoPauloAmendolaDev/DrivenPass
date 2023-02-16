import httpStatus from "http-status"
import {User} from "@prisma/client"
import userRepository from "@/repositories/user-repository";
import { conflictError } from "@/errors";

export type CreateUserType = Pick<User, "email" | "password">;

async function createUser(userData: CreateUserType){
    const verify = await verifyIfExistAnotherEmail(userData.email)
    console.log(verify)
    if(verify) throw conflictError('this email already are registred')
    userRepository.createUser(userData)
}

async function verifyIfExistAnotherEmail(email: string){
    const verify = await userRepository.findUserByEmail(email)
    return verify
}


const userService = {
    createUser,
    verifyIfExistAnotherEmail
}

export default userService