import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

export default function verificateJWT(req: Request, res: Response, next: NextFunction): void | Response {

    const token = req.headers["authorization"]?.split(" ");

    if (token?.length != 2) {
        return res.json({success: false, errors: ["Auth failure: Invalid JWT token"]}).status(401);
    }

    if (token[0] != "Bearer") {
        return res.json({success: false, errors: ["Auth failure: Invalid JWT token"]}).status(401);
    }

    try {
        // refactor
        const decoded = jsonwebtoken.verify(token[1], process.env["JWT_SECRET"] || "ff");

        if (typeof decoded === "object" && "username" in decoded) {
            req.user = decoded.username;
        } else {
            return res.json({success: false, errors: ["Auth failure: Invalid JWT token"]}).status(401);
        }
    } catch (err) {
        return res.json({success: false, err}).status(401);
    }

    next();
}