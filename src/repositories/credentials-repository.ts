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

const credentialRepository = {
    createCredential,
    findTitle
}

export default credentialRepository