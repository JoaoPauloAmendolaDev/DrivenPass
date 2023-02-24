import { createWifi, deleteWifi, findWifi } from "@/controllers/wifi-controllers";
import { validateBody } from "@/middlewares";
import jwtValidatorMiddleware from "@/middlewares/jwtValidator-middleware";
import { wifiSchema } from "@/schemas";
import { Router } from "express";

const wifiRouter = Router();

wifiRouter
    .all("/*", jwtValidatorMiddleware)
    .get("/:wifiId?", findWifi)
    .post("/", validateBody(wifiSchema), createWifi)
    .delete("/:wifiId", deleteWifi)


export default wifiRouter