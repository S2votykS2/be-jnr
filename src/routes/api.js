import express from "express";
let router = express.Router();
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";

let apiRouter = (app) => {
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.post("/create-user", userController.createUser);
    router.get("/read-user", userController.displayUser);
    router.get("/read-user-page", userController.displayUserWithPagination);
    router.put("/update-user", userController.updateUser);
    router.delete("/delete-user", userController.deleteUser);
    return app.use("/api", router);
};

export default apiRouter;