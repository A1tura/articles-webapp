import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

const transporter = nodemailer.createTransport({
    host: process.env["EMAIL_HOST"] || "localhost",
    port: Number(process.env["EMAIL_PORT"]),
    secure: false,
    auth: {
        user: process.env["EMAIL_USER"],
        pass: process.env["EMAIL_PASSWORD"]
    }
})

export default async function sendEmail(to: string, text:string, html?: string, subject?: string): Promise<void> {
    const info = transporter.sendMail({
        from: "Me",
        to,
        subject,
        html,
        text
    })
}