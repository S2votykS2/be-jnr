import express from "express";
let router = express.Router();
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import {
  getUserFromCookie,
  checkAuthenticatedUser,
} from "../middleware/cookieAction";

let apiRouter = (app) => {
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.post("/create-user", userController.createUser);
  router.get("/read-user", userController.displayUser);
  router.get(
    "/read-user-page",
    getUserFromCookie,
    checkAuthenticatedUser,
    userController.displayUserWithPagination
  );
  router.put("/update-user", userController.updateUser);
  router.delete("/delete-user", userController.deleteUser);

  router.get("/get-all-group", userController.getAllGroup);
  return app.use("/api", router);
};

export default apiRouter;
