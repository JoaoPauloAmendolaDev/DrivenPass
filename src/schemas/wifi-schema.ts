import joi from "joi";

type wifi = {
    title: string,
    username: string,
    password: string,
}

export const wifiSchema = joi.object<wifi>({
    title: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
})