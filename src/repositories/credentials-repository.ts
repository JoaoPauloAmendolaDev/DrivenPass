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

async function verifyIfCredentialIdIsFromUser(userId: number, credentialId: number){
    return await prisma.credential.findFirst({
        where: {
            id: credentialId,
            userId
        }
    })
}

async function findCredentialById(credentialId: number){
    return await prisma.credential.findFirst({
        where:{
            id: credentialId
        }
    })
}

async function deleteCredential(credentialId: number){
    return await prisma.credential.delete({
        where:{
            id: credentialId
        }
    })
}

const credentialRepository = {
    createCredential,
    findTitle,
    findAllCredentialsOfUser,
    getAllCredentials,
    verifyIfCredentialIdIsFromUser,
    findCredentialById,
    deleteCredential
}

export default credentialRepository