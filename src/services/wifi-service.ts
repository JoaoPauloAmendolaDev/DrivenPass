import { notFoundError, unauthorizedError } from "@/errors"
import wifiRepositories from "@/repositories/wifi-repositories"


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


const wifiService = {
    findWifi,
    findAllWifi
}

export default wifiService