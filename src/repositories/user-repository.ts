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

const userRepository = {
    findUserByEmail,
    createUser
}

export default userRepository