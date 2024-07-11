import app from "./app";
import dotenv from "dotenv";

import {Server, IncomingMessage, ServerResponse} from "http"

dotenv.config({path: "../.env"});


function bootServer(): Server<typeof IncomingMessage, typeof ServerResponse> {
    return app.listen(process.env["PORT"], () => {
        console.log("Listening at port " + process.env["PORT"]);
    })
}

bootServer()