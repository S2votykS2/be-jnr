import { first, reject } from "lodash";
import db from "../models/index";
import apiService from "./apiService";

let createUser = async (data) =>
  new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.password ||
        !data.rePassword ||
        !data.firstName ||
        !data.lastName ||
        !data.phoneNumber ||
        !data.gender ||
        !data.address
      ) {
        resolve({
          code: 1,
          message: "Missing required parameters",
        });
        return;
      }
      let checkEmail = await apiService.checkEmailExited(data.email);
      if (checkEmail) {
        resolve({
          code: 2,
          message: "This email is exited, please choose another email",
        });
        return;
      }

      let checkPhone = await apiService.checkPhoneNumberExited(
        data.phoneNumber
      );
      if (checkPhone) {
        resolve({
          code: 3,
          message:
            "This phone number is exited, please choose another phone number",
        });
        return;
      }

      if (data.password.length < 4 && data.rePassword.length < 4) {
        resolve({
          code: 4,
          message: "Your password must have more than 4 letters",
        });
        return;
      }
      if (data.password !== data.rePassword) {
        resolve({
          code: 5,
          message: "Password and RePassword are not same",
        });
        return;
      }

      const user = await db.User.create({
        email: data.email,
        password: apiService.hashPassword(data.password),
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        classId: "Not Update",
        groupId: "1",
      });
      resolve({
        code: 0,
        message: "Create new user success",
      });
      return;
    } catch (e) {
      reject(e);
    }
  });

const displayUser = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      if (id === "ALL") {
        let users = await db.User.findAll({
          attributes: [
            "id",
            "email",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "gender",
          ],
          include: {
            model: db.Group,
            as: "group",
            attributes: ["id", "name", "description"],
          },
          nest: true,
          raw: true,
        });

        resolve({
          code: 0,
          message: "OK",
          data: users,
        });
        return;
      }

      let user = await db.User.findOne({
        where: { id: id },
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "address",
          "phoneNumber",
          "gender",
        ],
        include: {
          model: db.Group,
          as: "group",
          attributes: ["id", "name", "description"],
        },
        nest: true,
        raw: true,
      });

      console.log("chck gourp", group);
      resolve({
        code: 0,
        message: "OK",
        data: user,
      });
      return;
    } catch (e) {
      reject(e);
    }
  });
const displayUserWithPagination = async (page, limit) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!page || !limit) {
        resolve({
          code: 0,
          message: "Missing required parameters",
        });
        return;
      }
      let offset = (page - 1) * limit;
      let data = await db.User.findAndCountAll({
        offset: +offset,
        limit: +limit,
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "address",
          "phoneNumber",
          "gender",
        ],
        include: {
          model: db.Group,
          as: "group",
          attributes: ["id", "name", "description"],
        },
        raw: true,
        nest: true,
      });

      let totalPage = Math.ceil(data.count / limit);
      resolve({
        code: 0,
        message: "OK",
        data: { ...data, totalPage },
      });
    } catch (e) {
      reject(e);
    }
  });
let updateUser = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.email ||
        !data.firstName ||
        !data.lastName ||
        !data.phoneNumber ||
        !data.address ||
        !data.gender
      ) {
        resolve({
          code: 1,
          message: "Missing required parameters",
        });
        return;
      }
      // if (data.groupId !== 1) {
      //   resolve({
      //     code: 2,
      //     message: "This email not belong to group auth, can't update",
      //   });
      //   return;
      // }
      let emailExited = await apiService.checkEmailExited(data.email);
      if (!emailExited) {
        resolve({
          code: 3,
          message: "This email is not found, can't update",
        });
        return;
      }

      await db.User.update(
        {
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          address: data.address,
          // groupName: req.body.groupName,
          // groupDescription: req.body.groupDescription,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      resolve({
        code: 0,
        message: "Update success",
      });
    } catch (e) {
      reject(e);
    }
  });

let deleteUser = (idInput) =>
  new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: idInput },
      });
      if (!user) {
        resolve({
          code: 1,
          message: "This user not found in database",
        });
      }
      await db.User.destroy({
        where: { id: idInput },
      });
      resolve({
        code: 0,
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });

let getAllGroup = () =>
  new Promise(async (resolve, reject) => {
    try {
      let groups = await db.Group.findAll();
      resolve({
        code: 0,
        message: "OK",
        data: groups,
      });
    } catch (e) {
      reject(e);
    }
  });
module.exports = {
  createUser,
  displayUser,
  displayUserWithPagination,
  updateUser,
  deleteUser,
  getAllGroup,
};
