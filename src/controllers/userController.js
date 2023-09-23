import { reject } from "lodash";
import userService from "../services/userService";

let createUser = async (req, res) => {
  try {
    let data = {
      email: req.body.email,
      password: req.body.password,
      rePassword: req.body.rePassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      gender: req.body.gender,
    };
    let response = await userService.createUser(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};

let displayUser = async (req, res) => {
  try {
    let response = await userService.displayUser(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};

let displayUserWithPagination = async (req, res) => {
  try {
    let response = await userService.displayUserWithPagination(
      req.query.page,
      req.query.limit
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};
let updateUser = async (req, res) => {
  try {
    let data = {
      id: req.body.id,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      address: req.body.address,
      groupName: req.body.groupName,
      groupDescription: req.body.groupDescription,
    };
    let response = await userService.updateUser(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};

let deleteUser = async (req, res) => {
  try {
    let response = await userService.deleteUser(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};
let getAllGroup = async (req, res) => {
  try {
    let response = await userService.getAllGroup();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error from server",
    });
  }
};

module.exports = {
  createUser,
  displayUser,
  displayUserWithPagination,
  updateUser,
  deleteUser,
  getAllGroup,
};
