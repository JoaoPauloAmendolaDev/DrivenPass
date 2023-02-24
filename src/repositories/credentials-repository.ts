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
            AND: {
                title,
                userId
            }
        }
    })
}

async function findCredentialsOfUser(userId: number, credentialId: number){
    return await prisma.credential.findFirst({
        where: {
            id: credentialId,
            userId
        }
    })
}

async function getAllCredentials(userId: number){
    return await prisma.credential.findMany({
        where: {
            userId
        }
    })
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
    findCredentialsOfUser,
    getAllCredentials,
    verifyIfCredentialIdIsFromUser,
    findCredentialById,
    deleteCredential
}

export default credentialRepository