import userService from "@/services/user-service";
import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";


export async function createUser(req: Request, res: Response, next: NextFunction){
    const userData = req.body
    try {
        await userService.createUser(userData)
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        if(error === 409) return res.sendStatus(httpStatus.CONFLICT)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}