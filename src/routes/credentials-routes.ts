import { createCredentials, findCredentials } from "@/controllers/credentials-controller";
import { validateBody } from "@/middlewares";
import jwtValidatorMiddleware from "@/middlewares/jwtValidator-middleware";
import { credentialsSchema } from "@/schemas";
import { Router } from "express";

const usersRouter = Router();

usersRouter
    .all("/*", jwtValidatorMiddleware)
    .get("/:credentialId", findCredentials)
    .post("/", validateBody(credentialsSchema), createCredentials)


export default usersRouter