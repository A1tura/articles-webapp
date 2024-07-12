import { ObjectId, WithId } from "mongodb";

import * as types from "../types/user.types";

export interface UserDb {
    _id: ObjectId;
    username: types.username;
    email: types.email;
    passwordHash: types.passwordHash;
    createdAt: Date;
    emailVerificated: boolean;
}

export interface User {
    username: types.username;
    passwordHash: types.passwordHash;
    email: types.email;
    emailVerificated: boolean;
}