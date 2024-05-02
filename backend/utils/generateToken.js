import jwt from "jsonwebtoken";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY);
};

export default generateToken;