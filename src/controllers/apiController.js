import { reject } from "lodash";
import apiService from "../services/apiService";

let handleRegister = async (req, res) => {
  try {
    let data = {
      email: req.body.email,
      password: req.body.password,
      rePassword: req.body.rePassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    };
    let response = await apiService.handleRegister(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};

let handleLogin = async (req, res) => {
  try {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    let response = await apiService.handleLogin(data);
    if (response && response.code === 0 && response.token) {
      res.cookie("jwt", response.token, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      });
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};

let handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    // Bug, why can't clear cookie
    return res.status(200).json({
      code: 0,
      message: "Logout success ...",
    });
  } catch (e) {
    console.log("happen error", e);
    return res.status(200).json({
      code: -1,
      massage: "Error from server",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
