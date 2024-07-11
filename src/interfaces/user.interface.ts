import { ObjectId } from "mongodb";

export interface UserDb {
    _id: ObjectId;
    username: string;
    passwordHash: passwordHash;
    createdAt: Date;
}

export interface User {
    username: string;
    passwordHash: passwordHash;
}