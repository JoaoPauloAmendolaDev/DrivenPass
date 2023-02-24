import app, { init } from "@/app";
import { prisma } from "@/config";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import { mockCredential } from "../factories/credentials-factory";

beforeEach( async () => {
    await init()
    await cleanDb()
})

const server = supertest(app)

describe("POST /credentials", () => {
    it("Should respond with status 401 if given token is invalid", async () => {
        const token = faker.lorem.word()

        const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`)
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("Should respond with status 401 when no token is given", async () => {

        const response = await server.post("/credentials").set("Authorization", `Bearer`)
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("Should respond with status 400 if body data is incomplete", async () =>{
        const createdUser = await createUser()
        const token = await generateValidToken(createdUser) 

        const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("Should respond with status 409 when title is not unique", async () => {
        const createdUser = await createUser()
        const token = await generateValidToken(createdUser)
        const credentialData = mockCredential
        console.log(credentialData)

        const firstRequest = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(credentialData)
        const secondRequest = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(credentialData)

        expect(secondRequest.status).toBe(httpStatus.CONFLICT)
    })

    it("Should respond with status 201 when title is not unique but with different user", async () => {
        const createdUser = await createUser()
        const token = await generateValidToken(createdUser)

        const credentialData = mockCredential

        const firstRequest = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(credentialData)
        
        const createdSecondUser = await createUser()
        const tokenOfSecondUser = await generateValidToken(createdSecondUser)

        const secondRequest = await server.post("/credentials").set("Authorization", `Bearer ${tokenOfSecondUser}`).send(credentialData)
        expect(secondRequest.status).toBe(httpStatus.CREATED)
    })
})