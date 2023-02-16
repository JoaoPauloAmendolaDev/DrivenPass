import userService from "@/services/user-service";
import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";



export async function createUser(req: Request, res: Response, next: NextFunction){
    const userData = req.body
    try {
        const user = await userService.createUser(userData)
        return res.send({
            email: user.email,
            password: user.password
        }).status(httpStatus.CREATED)
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
        console.log(error)
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}