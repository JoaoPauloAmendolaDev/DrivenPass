import { prisma } from "@/config"
import { faker } from "@faker-js/faker"
import { User } from "@prisma/client"
import bcrypt from "bcrypt"


export async function createUser(password?: string): Promise<User> {
    let uncryptedPassword
    if(password) {
     uncryptedPassword = password 
    } else {
     uncryptedPassword = faker.name.fullName().substring(0, 11)
    }

    const encryptedPassword: string = await bcrypt.hash(uncryptedPassword, 10)

    return prisma.user.create({
        data:{
            email: faker.internet.email(),
            password: encryptedPassword
        }
    })
}