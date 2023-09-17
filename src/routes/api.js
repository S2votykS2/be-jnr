import express from "express";
let router = express.Router();
import apiController from "../controllers/apiController"

let apiRouter = (app) => {
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    return app.use("/api", router);
}

export default apiRouter;