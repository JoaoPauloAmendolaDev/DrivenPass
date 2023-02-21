import { AuthenticatedRequest } from "@/middlewares/jwtValidator-middleware";
import userService from "@/services/user-service";
import wifiService from "@/services/wifi-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function findWifi(req: AuthenticatedRequest, res: Response){
    const userEmail = req.email
    const wifiId: number | undefined = Number(req.params.wifiId)

    try {
        if(wifiId){
            const findUserid = await userService.getUserIdByEmail(userEmail)
            const findWifi = await wifiService.findWifi(wifiId, findUserid)
        } else {
            const findUserid = await userService.getUserIdByEmail(userEmail)
            const findAllWifi = await wifiService.findAllWifi(findUserid)
        }
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}