import userService from "@/services/user-service";
import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";



export async function createUser(req: Request, res: Response, next: NextFunction){
    const userData = req.body
    try {
        const user = await userService.createUser(userData)
        return res.status(httpStatus.CREATED).send({
            email: user.email,
            password: user.password
        })
    } catch (error) {
        if(error.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(error.message)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}

export async function loginUser(req: Request, res: Response){
    const loginData = req.body

    try {
        const user = await userService.loginUser(loginData)
        return res.status(httpStatus.OK).send(user)
    } catch (error) {
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED)
        if (error.name === 'NotFoundError')return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}