import app, { init } from "@/app";
import { prisma } from "@/config";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";


beforeAll( async () => {
    await init()
    await cleanDb()
})

const server = supertest(app)

describe("POST /user", () => {
    it("Should respond with status 400 when body is not given", async () => {
        const response = await server.post("/user")

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("Should respond with status 400 when password have less then 10 characters", async () => {
        const body = {
            email : faker.internet.email,
            password: faker.name.firstName().substring(0, 10)
        }

        const response = await server.post("/user").send(body)

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("Should respond with status 409 if email was already been on database", async () => {
        const createdUser = await createUser()

        const body = {
            email: createdUser.email,
            password: faker.name.fullName().substring(0, 11)
        }

        const response = await server.post("/user").send(body)
        expect(response.status).toBe(httpStatus.CONFLICT)
    })

    it("Should respond with status 201 and create user when email is unique", async () => {
        const body = {
            email: faker.internet.email(),
            password: faker.name.fullName().substring(0, 11)
        }

        const response = await server.post("/user").send(body)
        expect(response.status).toBe(httpStatus.CREATED)
    })
})

describe("POST /user/login", () => {
    it("Should respond with status 400 when password is not send", async () => {
        const body = {
            email: faker.internet.email()
        }

        const response = await server.post("/user/login").send(body)

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("Should respond with status 400 when email is not send", async () => {
        const body = {
            password: faker.name.fullName().substring(0, 11)
        }

        const response = await server.post("/user/login").send(body)

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("Should respond with status 404 when email is not in data base", async () => {
        const body = {
            email: faker.internet.email(),
            password: faker.name.fullName().substring(0, 11)
        }

        const response = await server.post("/user/login").send(body)

        expect(response.status).toBe(httpStatus.NOT_FOUND)
    })

    it("Should respond with status 401 when email is right and password is wrong", async () => {
        const createdUser = await createUser()

        const body = {
            email: createdUser.email,
            password: 'wrongPassword'
        }

        const response = await server.post("/user/login").send(body)

        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("Should respond with status 200 and JWT token", async () => {
        const userData = {
            email: faker.internet.email(),
            password: faker.name.fullName().substring(0, 11)
        }

        const createdUser = await createUser(userData.password)

        const body = {email: createdUser.email, password: userData.password}
        
        const response = await server.post("/user/login").send(body)

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual({
            jwtToken: expect.any(String),
            payload: {
                email: expect.any(String)
            }
        })
    })
})