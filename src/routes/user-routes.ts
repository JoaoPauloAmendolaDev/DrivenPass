import { validateBody } from "@/middlewares";
import { createUserSchema } from "@/schemas";
import { Router } from "express";
import { createUser, loginUser } from "@/controllers/users-controller";

const usersRouter = Router();

usersRouter
    .post("/", validateBody(createUserSchema), createUser)
    .post("/login", validateBody(createUserSchema), loginUser)
export default usersRouter