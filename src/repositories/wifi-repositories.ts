import { prisma } from "@/config"
import { createWifiType } from "@/services"

async function findWifi(wifiId : number, userId: number){
    return await prisma.network.findFirst({
        where: {
            id: wifiId,
            userId
        }
    })
}

async function findUniqueWifi(wifiId: number){
    return await prisma.network.findFirst({
        where: {
            id: wifiId
        }
    })
}

async function findAllWifi(userId: number){
    return await prisma.network.findMany({
        where:{
            userId
        }
    })
}

async function deleteWifi(wifiId: number){
    return await prisma.network.delete({
        where: {
            id: wifiId
        }
    })
}

async function createWifi(wifiData: createWifiType){
    return await prisma.network.create({
        data: wifiData
    })
}

const wifiRepositories = {
    findWifi,
    findUniqueWifi,
    findAllWifi,
    deleteWifi,
    createWifi
}

export default wifiRepositories