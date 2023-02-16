import { prisma } from "@/config";
import { unauthorizedError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type JWTPayload = {
    userEmail: string;
};

export default function(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw unauthorizedError();

    const bearer_token = authorization.split(" ");
    if (bearer_token.length !== 2 || bearer_token[0] !== "Bearer") throw unauthorizedError();


    const userEmailObject = jwt.verify(
        bearer_token[1],
        process.env.JWT_SECRET
    ) as JWTPayload


    if(!userEmailObject) throw unauthorizedError()
    const userEmail = userEmailObject.userEmail
    console.log(userEmail)
    next()
}

export type AuthenticatedRequest = Request & JWTPayload;




