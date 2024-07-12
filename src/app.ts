import express, { Application } from "express";

import testRoute from "./routes/test.route";
import userRoute from "./routes/user.route";
import articleRoute from "./routes/article.route"

function buildApp(): Application {
    const app = express();

    app.use(express.json());

    // register routes
    app.use("/test", testRoute);
    app.use("/user", userRoute);
    app.use("/articles", articleRoute)

    return app;
}

export default buildApp();