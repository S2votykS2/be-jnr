import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

let validatePassword = (password, hashPassword) => {
  const check = bcrypt.compareSync(password, hashPassword);
  return check;
};

let checkEmailExited = async (emailInput) => {
  try {
    let isExited = false;
    let email = await db.User.findOne({
      where: { email: emailInput },
    });
    if (email) {
      isExited = true;
    }
    return isExited;
  } catch (e) {
    console.log("Happen error");
    return e;
  }
};

let checkPhoneNumberExited = async (phoneNumberInput) => {
  try {
    let isExited = false;
    let phoneNumber = await db.User.findOne({
      where: { phoneNumber: phoneNumberInput },
    });
    if (phoneNumber) {
      isExited = true;
    }
    return isExited;
  } catch (e) {
    console.log("Happen error");
    return e;
  }
};

let handleRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.password ||
        !data.rePassword ||
        !data.gender ||
        !data.address ||
        !data.phoneNumber ||
        !data.firstName ||
        !data.lastName
      ) {
        resolve({
          code: 1,
          message: "Missing required parameters",
        });
        return;
      }
      if (data.password.length < 4 && data.rePassword.length < 4) {
        resolve({
          code: 2,
          message: "Your password must have more than 4 letters",
        });
        return;
      }
      if (data.password !== data.rePassword) {
        resolve({
          code: 3,
          message: "Password and RePassword are not invalid",
        });
        return;
      }

      let isExited = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (isExited) {
        resolve({
          code: 4,
          message: "Email is exited, please choose another email",
        });
        return;
      }
      const user = await db.User.create({
        email: data.email,
        password: hashPassword(data.password),
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
        message: "Register success",
      });
      return;
    } catch (e) {
      reject(e);
    }
  });
};

let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          code: 1,
          message: "Missing required parameters",
        });
        return;
      }

      if (data.password.length < 4) {
        resolve({
          code: 2,
          message: "Your password must have more than 4 letters",
        });
        return;
      }

      let user = await db.User.findOne({
        where: { email: data.email },
      });
      let isTruePassword = validatePassword(data.password, user.password);
      if (!isTruePassword) {
        resolve({
          code: 3,
          message: "Password is not incorrect",
        });
        return;
      }
      resolve({
        code: 0,
        message: "OK",
      });
      return;
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleRegister,
  handleLogin,
  hashPassword,
  checkEmailExited,
  checkPhoneNumberExited,
};
