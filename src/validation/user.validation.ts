import * as types from "../types/user.types";

export function validateUsername(username: types.username): string[] {

    const errors: string[] = []

    if (username.length < 6) {
        errors.push("Username must be at last 6 symbols.");
    } else if (username.length > 30) {
        errors.push("Username should not be more than 30 symbols.");
    }

    return errors;

}

export function validateEmail(email: types.email): string[] {
    const errors: string[] = [];

    if (!email.includes("@")) {
        errors.push("Incorrect email.")
    }

    return errors;
}