import { createCredentials, findCredentials, deleteCredentials } from "@/controllers/credentials-controller";
import { validateBody } from "@/middlewares";
import jwtValidatorMiddleware from "@/middlewares/jwtValidator-middleware";
import { credentialsSchema } from "@/schemas";
import { Router } from "express";

const credentialsRouter = Router();

credentialsRouter
    .all("/*", jwtValidatorMiddleware)
    .get("/:credentialId?", findCredentials)
    .post("/", validateBody(credentialsSchema), createCredentials)
    .delete("/:credentialId", deleteCredentials)


export default credentialsRouter