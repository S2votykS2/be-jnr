import { signToken, verifyToken, getRoleOfGroup } from "../services/jwtService";
const getUserFromCookie = async (req, res, next) => {
  try {
    let cookies = req.cookies;
    console.log("check cookies = ", cookies);
    console.log("check cookies.jwt = ", cookies.jwt);
    if (cookies && cookies.jwt) {
      let data = verifyToken(cookies.jwt);
      if (data) {
        req.user = data;
        next();
      } else {
        return res.status(200).json({
          code: -1,
          message: `You can't authenticated with this user`,
        });
      }
    } else {
      return res.status(200).json({
        code: -1,
        message: `You can't authenticated with this user`,
      });
    }
  } catch (e) {
    console.log("Check happen error", e);
  }
};

const checkAuthenticatedUser = async (req, res, next) => {
  try {
    let roles = req.user.group;
    console.log("check roles", roles);
    let currentPath = req.path;
    console.log("check path", currentPath);
    if (roles && roles.length > 0) {
      let isAccess = roles.some((item, index) => {
        return item.Roles.url === currentPath;
      });
      if (isAccess) {
        next();
      } else {
        return res.status(200).json({
          code: -1,
          message: "You do not permission to access the resource",
        });
      }
    } else {
      return res.status(200).json({
        code: -1,
        message: "You do not permission to access the resource",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export { getUserFromCookie, checkAuthenticatedUser };
