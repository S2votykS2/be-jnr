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
  router.post("/logout", apiController.handleLogout);

  router.post(
    "/create-user",
    getUserFromCookie,
    checkAuthenticatedUser,
    userController.createUser
  );
  router.get("/read-user", userController.displayUser);
  router.get(
    "/read-user-page",
    getUserFromCookie,
    checkAuthenticatedUser,
    userController.displayUserWithPagination
  );
  router.put(
    "/update-user",
    getUserFromCookie,
    checkAuthenticatedUser,
    userController.updateUser
  );
  router.delete(
    "/delete-user",
    getUserFromCookie,
    checkAuthenticatedUser,
    userController.deleteUser
  );

  router.get("/get-all-group", userController.getAllGroup);
  return app.use("/api", router);
};

export default apiRouter;
