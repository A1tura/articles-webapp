import { json, Request, Response } from "express";

import dotenv from "dotenv";

import PasswordValidator from "password-validator";
import { signupErrors } from "../interfaces/validation.interface";
import { createUser, emailInUsage, getUser, usernameInUsage } from "../dal/user.dal";
import { User } from "../interfaces/user.interface";

import hashPassword from "../utils/hashPassword";
import { validateEmail, validateUsername } from "../validation/user.validation";
import sendEmail from "../utils/sendEmail";

import createToken from "../utils/createToken";
import {createToken as createTokenDb, isValidEmailToken, verificateEmailToken} from "../dal/verification.dal";

import jsonwebtoken from "jsonwebtoken";

dotenv.config({path: "../.env"});
const schema = new PasswordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)

export const test = (_: Request, res: Response): Response => {
    return res.json({success: true});
}

export const signup = async (req: Request, res: Response): Promise<Response> => {
    const {username, password, email} = req.body;
    const User: User = {
        username,
        passwordHash: hashPassword(password),
        email,
        emailVerificated: false,
    }

    const verifToken: string = createToken(50);

    const validator = schema.validate(password);

    let errors: signupErrors = {};


    if (!validator) {
        const validatorErrors = schema.validate(password, {details: true});

        if (typeof validatorErrors != "boolean") {
            for (let i = 0; i < validatorErrors.length; i++) {
                if (!errors.password) {
                    errors.password = [validatorErrors[i].message];
                } else {
                    errors.password.push(validatorErrors[i].message);
                }
            }
        }
    }

    if (await usernameInUsage(username) === true) {
        if (!errors.username) {
            errors.username = ["Username already in use!"];
        } else {
            errors.username.push("Username already in use!");
        }
    }  else if (validateUsername(username).length > 0) {
        const usernameErrors = validateUsername(username);

        for (let i = 0; i < usernameErrors.length; i++) {
            if (!errors.username) {
                errors.username = [usernameErrors[i]];
            } else {
                errors.username.push(usernameErrors[i]);
            }
        }    
    }

    if (await emailInUsage(email)) {
        if (!errors.email) {
            errors.email = ["Email already in use!"];
        } else {
            errors.email.push("Email already in use!");
        }
    } else if (validateEmail(email).length != 0) {
        const emailErrors = validateEmail(email);

        for (let i = 0; i < emailErrors.length; i++) {
            if (!errors.email) {
                errors.email = [emailErrors[i]];
            } else {
                errors.email.push(emailErrors[i]);
            }
        }
    }
    

    if (Object.keys(errors).length === 0) {
        createUser(User);
        createTokenDb(username, verifToken);
        await sendEmail(email, `Verificate your email: http://localhost:3000/user/verifEmail/${verifToken}`);
        return res.json({success: true});
    }  else {
        return res.json({success: false, errorFields: Object.keys(errors), error: errors});
    }
}

export const verifEmail = async (req: Request, res: Response): Promise<Response> => {
    const {token} = req.params;

    const errors: string[] = [];

    if (!(await isValidEmailToken(token))) {
        errors.push("Invalid token");
    }

    if (errors.length > 0) {
        return res.json({success: false, errors});
    } else {
        verificateEmailToken(token);
        return res.json({success: true})
    }
}

export const signin = async (req: Request, res: Response): Promise<Response> => {
    const {username, password} = req.body;

    const errors: string[] = [];

    const passwordHash = hashPassword(password);
    const user = await getUser(username);

    if (user) {
        if (user.passwordHash != passwordHash) {
            errors.push("Invalid password or username");
        } 
    } else {
        errors.push("Invalid password or username");
    }

    if (errors.length === 0) {
        // refactor
        const jwt: string = jsonwebtoken.sign({username}, process.env["JWT_SECRET"] || "ff", {expiresIn: (60 * 60) * 3});
        return res.json({success: true, jwt});
    } else {
        return res.json({success: false, errors});
    }
}

export const profile = async (req: Request, res: Response): Promise<Response> => {
    if (req.user) {
        const user = await getUser(req.user);

        if (user) {
            return res.json({success: true, user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                emailVerificated: user.emailVerificated
            }})
        }
        return res.json({success: false})
    } 
    return res.json({success: false})
}