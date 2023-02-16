import { validateBody } from "@/middlewares";
import { createUserSchema } from "@/schemas";
import { Router } from "express";
import { createUser } from "@/controllers/users-controller";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), createUser)

export default usersRouter