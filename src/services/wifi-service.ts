import { notFoundError, unauthorizedError } from "@/errors"
import wifiRepositories from "@/repositories/wifi-repositories"
import { Network } from "@prisma/client"
import Cryptr from "cryptr"

const cryptr = new Cryptr('secretKey')

async function findWifi(wifiId: number, userId: number){
    const verifyIfWifiExist = await wifiRepositories.findUniqueWifi(wifiId)
    if(!verifyIfWifiExist) throw notFoundError()

    const wifiData = await wifiRepositories.findWifi(wifiId, userId)
    if(!wifiData) throw unauthorizedError()

    return wifiData
}

async function findAllWifi(userId: number){
    const allWifi = await wifiRepositories.findAllWifi(userId)
}

async function deleteWifi(wifiId: number, userId: number){
    const verifyIfWifiExist = await wifiRepositories.findUniqueWifi(wifiId)
    if(!verifyIfWifiExist) throw notFoundError()

    const wifiData = await wifiRepositories.findWifi(wifiId, userId)
    if(!wifiData) throw unauthorizedError()

    await wifiRepositories.deleteWifi(wifiId)
}

async function createWifi(wifiData: createWifiType ){

    wifiData.password = cryptr.encrypt(wifiData.password)

    const createdWifi = await wifiRepositories.createWifi(wifiData)
    return createdWifi
}

const wifiService = {
    findWifi,
    findAllWifi,
    deleteWifi,
    createWifi
}

export type createWifiType = Pick<Network, 'title' | 'network' | 'password' | 'userId' >

export default wifiService