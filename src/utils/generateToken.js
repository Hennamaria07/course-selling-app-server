import jwt from "jsonwebtoken";

export const generateToken = async (email) => {
  return jwt.sign({ data: email }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1d" });
};

export const adminToken = (user) => {
  return jwt.sign({ data: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
};