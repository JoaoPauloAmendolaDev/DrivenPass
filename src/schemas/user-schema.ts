import joi from "joi"

type user = {
    email: string,
    password: string
}

export const createUserSchema = joi.object<user>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})