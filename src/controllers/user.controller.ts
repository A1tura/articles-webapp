import { Request, Response } from "express";

import PasswordValidator from "password-validator";
import { Errors } from "../interfaces/validation.interface";
import { createUser, emailInUsage, usernameInUsage } from "../dal/user.dal";
import { User } from "../interfaces/user.interface";

import hashPassword from "../utils/hashPassword";
import { validateEmail, validateUsername } from "../validation/user.validation";

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
        email
    }

    const validator = schema.validate(password);

    let errors: Errors = {};


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

    if (await usernameInUsage(username)) {
        if (!errors.username) {
            errors.username = ["Username already in use!"];
        } else {
            errors.username.push("Username already in use!");
        }
    } else if (validateUsername(username).length != 0) {
        const usernameErrors = validateUsername(email);

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
        for (let i = 0; emailErrors.length; i++) {
            if (!errors.email) {
                errors.email = [emailErrors[i]];
            } else {
                errors.email.push(emailErrors[i]);
            }
        }
    }
    

    if (Object.keys(errors).length === 0) {
        createUser(User);
        return res.json({success: true});
    }  else {
        return res.json({success: false, errorFields: Object.keys(errors), error: errors});
    }
}