import { prisma } from "@/config"
import { createCredentialType } from "@/services"

async function createCredential(credentialData: createCredentialType){
    return await prisma.credential.create({
        data: credentialData
    })
}

async function findTitle(title: string, userId: number){
    return await prisma.credential.findFirst({
        where:{
            title,
            userId
        }
    })
}

async function findAllCredentialsOfUser(userId: number){
    return await prisma.credential.findMany({
        where: {
            userId
        }
    })
}

async function getAllCredentials(){
    return await prisma.credential.findMany()
}

const credentialRepository = {
    createCredential,
    findTitle,
    findAllCredentialsOfUser,
    getAllCredentials
}

export default credentialRepository