import { prisma } from "@/config";
import { faker } from "@faker-js/faker";


export const mockCredential = {
    title: faker.name.fullName(),
    url : faker.internet.avatar(),
    username: faker.name.firstName(),
    password: faker.finance.account(11)
}