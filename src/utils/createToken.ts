import crypto from "crypto";

export default function createToken(length: number): string {
    return crypto.randomBytes(length).toString("base64url");
}