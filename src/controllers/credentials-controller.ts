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
        console.log(error)
        if(error.name === "ConflictError") return res.sendStatus(httpStatus.CONFLICT)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function findCredentials(req: AuthenticatedRequest, res:Response){
    const userEmail = req.email
    const credentialId = Number(req.params.credentialId)
    
    try {
        const userExist = await userService.getUserIdByEmail(userEmail)

        if(userExist){
            const getUserCredentials = await credentialService.getUserCredentials(credentialId)
            return res.status(httpStatus.OK).send(getUserCredentials)
        } else{
            const getAllCredentials = await credentialService.getAllCredentials()
            return res.status(httpStatus.OK).send(getAllCredentials)
        }

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}