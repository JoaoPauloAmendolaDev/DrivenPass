import { prisma } from "@/config";
import { unauthorizedError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

type JWTPayload = {
    email: string;
};

export default function(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(httpStatus.UNAUTHORIZED)

    const bearer_token = authorization.split(" ");
    if (bearer_token.length !== 2 || bearer_token[0] !== "Bearer") return res.sendStatus(httpStatus.UNAUTHORIZED)
    
    let userEmailObject
    try {
    userEmailObject = jwt.verify(
        bearer_token[1],
        process.env.JWT_SECRET,
    ) as JWTPayload   
    } catch (error) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
    
    req.email = userEmailObject.email
    next()
}

export type AuthenticatedRequest = Request & JWTPayload;




