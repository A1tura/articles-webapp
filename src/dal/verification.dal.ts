import { Collection } from "mongodb";
import { db } from "../db/db";
import * as types from "../types/user.types";
import { verificateUserEmail } from "./user.dal";
import { UserDb } from "../interfaces/user.interface";

const getCollection = (): Collection => db.collection("tokens");

export const createToken = (username: types.username, token: string): void => {
    getCollection().insertOne({username, token});
}

export const isValidEmailToken = async (token: string): Promise<boolean> => {
    const document = await getCollection().findOne({token});

    if (document === null) {
        return false
    }

    return true;
}

export const verificateEmailToken = async (token: string): Promise<void> => {
    const document = await getCollection().findOne({token});

    if (document) {
        verificateUserEmail(document.username);
        getCollection().deleteOne({token});
    }
}