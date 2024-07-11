import app from "./app";
import dotenv from "dotenv";

import {Server, IncomingMessage, ServerResponse} from "http"
import { connect } from "./db/db";

dotenv.config({path: "../.env"});


async function bootServer(): Promise<Server<typeof IncomingMessage, typeof ServerResponse>>{

    await connect();

    return app.listen(process.env["PORT"], () => {
        console.log("Listening at port " + process.env["PORT"]);
    })
}

bootServer()