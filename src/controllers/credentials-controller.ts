import { AuthenticatedRequest } from "@/middlewares/jwtValidator-middleware";
import { Response } from "express";
import credentialService from "@/services/credentials-service";
import userService from "@/services/user-service";
import httpStatus from "http-status";

export async function createCredentials(req: AuthenticatedRequest, res: Response){
    const userEmail = req.userEmail
    console.log('1')

    try {
        const getUserIdByEmail = await userService.getUserIdByEmail(userEmail)
        const credentialNewData = {...req.body, userId: getUserIdByEmail}
        const createdCredential = await credentialService.createCredential(credentialNewData)
        
        return res.send(createCredentials).status(httpStatus.CREATED)
    } catch (error) {
        console.log(error)
        if(error.name === "ConflictError") return res.sendStatus(httpStatus.CONFLICT)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}