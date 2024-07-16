import express, { Application } from "express";

import testRoute from "./routes/test.route";
import userRoute from "./routes/user.route";
import articleRoute from "./routes/article.route"
import categoryRoute from "./routes/category.router"

function buildApp(): Application {
    const app = express();

    app.use(express.json());

    // register routes
    app.use("/test", testRoute);
    app.use("/user", userRoute);
    app.use("/articles", articleRoute)
    app.use("/category", categoryRoute);

    return app;
}

export default buildApp();