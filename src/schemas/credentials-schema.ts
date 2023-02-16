import joi from "joi";

type credentials = {
    title: string,
    username: string,
    url: string,
    password: string,
}

export const credentialsSchema = joi.object<credentials>({
    title: joi.string().required(),
    url: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
})