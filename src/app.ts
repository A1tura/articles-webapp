import express, { Application } from "express";

import testRoute from "./routes/test.route";

function buildApp(): Application {
    const app = express();

    app.use(express.json());

    // register routes
    app.use("/test", testRoute);

    return app;
}

export default buildApp();