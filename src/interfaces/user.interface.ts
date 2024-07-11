import { ObjectId } from "mongodb";

import * as types from "../types/user.types";

export interface UserDb {
    _id: ObjectId;
    username: types.username;
    email: types.email;
    passwordHash: types.passwordHash;
    createdAt: Date;
}

export interface User {
    username: types.username;
    passwordHash: types.passwordHash;
    email: types.email;
}