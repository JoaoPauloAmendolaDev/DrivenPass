import { prisma } from "@/config";
import { CreateUserType } from "@/services";

async function findUserByEmail(email: string){
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}

async function createUser(userData: CreateUserType){
    return await prisma.user.create({
        data: userData
    })
}

async function getUserIdByEmail(userEmail: string){
    return await prisma.user.findFirst({
        where:{
            email : userEmail
        }
    })
}

const userRepository = {
    findUserByEmail,
    createUser,
    getUserIdByEmail
}

export default userRepository