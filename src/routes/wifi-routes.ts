import { createCredentials, findCredentials, deleteCredentials } from "@/controllers/credentials-controller";
import { validateBody } from "@/middlewares";
import jwtValidatorMiddleware from "@/middlewares/jwtValidator-middleware";
import { wifiSchema } from "@/schemas";
import { Router } from "express";

const wifiRouter = Router();

wifiRouter
    .all("/*", jwtValidatorMiddleware)
    .get("/:credentialId?", findWifi)
    .post("/", validateBody(wifiSchema), createCredentials)
    .delete("/:credentialId", deleteCredentials)


export default wifiRouter