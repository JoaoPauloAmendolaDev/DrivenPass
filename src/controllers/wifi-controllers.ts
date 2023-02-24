import { AuthenticatedRequest } from "@/middlewares/jwtValidator-middleware";
import userService from "@/services/user-service";
import wifiService, { createWifiType } from "@/services/wifi-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function findWifi(req: AuthenticatedRequest, res: Response){
    const userEmail = req.email
    const wifiId: number | undefined = Number(req.params.wifiId)

    try {
        if(wifiId){
            const findUserid = await userService.getUserIdByEmail(userEmail)
            const findWifi = await wifiService.findWifi(wifiId, findUserid)
            return res.status(httpStatus.OK).send(findWifi)
        } else {
            const findUserid = await userService.getUserIdByEmail(userEmail)
            const findAllWifi = await wifiService.findAllWifi(findUserid)
            return res.status(httpStatus.OK).send(findAllWifi)
        }
    } catch (error) {
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED)
        if (error.name === 'NotFoundError')return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function deleteWifi(req: AuthenticatedRequest, res: Response){
    const userEmail = req.email
    const wifiId: undefined | Number = Number(req.params.wifiId)
    if(!wifiId) return res.sendStatus(httpStatus.BAD_REQUEST)

    try {
        const findUserid = await userService.getUserIdByEmail(userEmail)
        const deleteWifi = await wifiService.deleteWifi(wifiId as number,findUserid)
    
        return res.sendStatus(httpStatus.OK)    
    } catch (error) {
        if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED)
        if (error.name === 'NotFoundError')return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function createWifi(req: AuthenticatedRequest, res: Response){
    const userEmail = req.email

    try {
        const findUserid = await userService.getUserIdByEmail(userEmail)
        
        const wifiNewData: createWifiType = {
            ...req.body,
            userId: findUserid
        }
        
        const createWifi = await wifiService.createWifi(wifiNewData)
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}