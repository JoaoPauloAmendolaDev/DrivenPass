import { conflictError, notFoundError, unauthorizedError } from "@/errors";
import credentialRepository from "@/repositories/credentials-repository";
import { Credential } from "@prisma/client";
import bcrypt from "bcrypt"
import Cryptr from "cryptr"

const cryptr = new Cryptr('secretKey')

async function createCredential(credentialData: createCredentialType){
    
    const verifyUniqueTitle = await credentialRepository.findTitle(credentialData.title, credentialData.userId)
    console.log(verifyUniqueTitle, 'AQUI SERVICE LOUCURAAAAA', credentialData.userId)
    if(verifyUniqueTitle) throw conflictError('title not unique')

    credentialData.password = cryptr.encrypt(credentialData.password)

    const createdCredential = await credentialRepository.createCredential(credentialData)
    return createdCredential
}

async function getUserCredentials(userId: number, credentialId: number){
    const findCredentialById = await credentialRepository.findCredentialById(credentialId)
    if(!findCredentialById) throw notFoundError()

    const verifyIfCredentialIdIsFromUser = await credentialRepository.verifyIfCredentialIdIsFromUser(userId, credentialId)
    if(!verifyIfCredentialIdIsFromUser) throw unauthorizedError()

    const findCredentialsOfUser = await credentialRepository.findCredentialsOfUser(userId, credentialId)
    findCredentialsOfUser.password = cryptr.decrypt(findCredentialsOfUser.password)

    return findCredentialsOfUser
}

async function getAllCredentials(userId : number){
    const findAllCredentials = await credentialRepository.getAllCredentials(userId)
    for(let i = 0; i < findAllCredentials.length; i++){
        findAllCredentials[i].password = 
        cryptr.decrypt(findAllCredentials[i].password)
    }
    return findAllCredentials
}

async function verifyIfCredentialIdIsFromUser(userId: number, credentialId: number){
    const findCredentialById = await credentialRepository.findCredentialById(credentialId)
    if(!findCredentialById) throw notFoundError()

    const verifyIfCredentialIdIsFromUser = await credentialRepository.verifyIfCredentialIdIsFromUser(userId, credentialId)
    if(!verifyIfCredentialIdIsFromUser) throw unauthorizedError()

    const deleteCredential = await credentialRepository.deleteCredential(credentialId)
    return deleteCredential
}


const credentialService = {
    createCredential,
    getUserCredentials,
    getAllCredentials,
    verifyIfCredentialIdIsFromUser
}

export type createCredentialType = Pick<Credential, "title" | "url" | "userId" | "username" | "password">;


export default credentialService