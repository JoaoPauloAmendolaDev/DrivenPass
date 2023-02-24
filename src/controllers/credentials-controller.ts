import { AuthenticatedRequest } from "@/middlewares/jwtValidator-middleware";
import { Response } from "express";
import credentialService from "@/services/credentials-service";
import userService from "@/services/user-service";
import httpStatus from "http-status";
import {createCredentialType} from "@/services/credentials-service"

export async function createCredentials(req: AuthenticatedRequest, res: Response){
    const userEmail = req.email

    try {
        const getUserIdByEmail = await userService.getUserIdByEmail(userEmail)
        const credentialNewData: createCredentialType = {
            ...req.body,
            userId: getUserIdByEmail
          };
        const createdCredential = await credentialService.createCredential(credentialNewData)
        
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        if(error.name === "ConflictError") return res.sendStatus(httpStatus.CONFLICT)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function findCredentials(req: AuthenticatedRequest, res:Response){
    const userEmail = req.email
    const credentialId = Number(req.params.credentialId)
    
    try {
        const userExist = await userService.getUserIdByEmail(userEmail)

        if(credentialId){
            const getUserCredentials = await credentialService.getUserCredentials(userExist, credentialId)
            return res.status(httpStatus.OK).send(getUserCredentials)
        } else{
            const getAllCredentials = await credentialService.getAllCredentials(userExist)
            return res.status(httpStatus.OK).send(getAllCredentials)
        }

    } catch (error) {
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED)
        if (error.name === 'NotFoundError')return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function deleteCredentials(req:AuthenticatedRequest, res: Response) {
    const userEmail = req.email

    const credentialId: number = Number(req.params.credentialId)
    if(!createCredentials) return res.sendStatus(httpStatus.BAD_REQUEST)

    try {
        const userExist = await userService.getUserIdByEmail(userEmail)
        const verifyIfCredentialIdIsFromUser = await credentialService.verifyIfCredentialIdIsFromUser(userExist, credentialId)

        return res.sendStatus(httpStatus.OK)
    } catch (error) {
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED)
        if (error.name === 'NotFoundError')return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}