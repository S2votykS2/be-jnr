import db from "../models/index";
import jwt from "jsonwebtoken";

require("dotenv").config();

const signToken = (payload) => {
  let key = process.env.JWT_KEY;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (e) {
    console.log("e");
  }
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_KEY;
  let data = null;
  try {
    data = jwt.verify(token, key);
  } catch (e) {
    console.log(e);
  }
  return data;
};

let getRoleOfGroup = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: { email: email },
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
          include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] },
          },
          nest: true,
          raw: true,
        },
        nest: true,
        raw: true,
      });
      let groups = await db.Group.findAll({
        where: { id: users.groupId },
        include: {
          model: db.Role,
          attributes: ["id", "url", "description"],
          through: { attributes: [] },
        },
        nest: true,
        raw: true,
      });
      resolve({
        user: users,
        group: groups,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getRoleOfGroup,
  signToken,
  verifyToken,
};
