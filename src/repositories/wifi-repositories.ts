import { prisma } from "@/config"

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

const wifiRepositories = {
    findWifi,
    findUniqueWifi,
    findAllWifi,
    deleteWifi
}

export default wifiRepositories