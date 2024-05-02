import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    return res.status(500).json({
      msg: "No Token Found or Invalid Token",
    });
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};
