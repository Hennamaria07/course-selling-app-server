import jwt from "jsonwebtoken";
import User from "../models/user.model";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.status(401).json({
        success: false,
        error:"Unauthenicated Instructor request",
        isAuthenticated: false
    });
};
const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
console.log('decoded token', decodedToken)
        const user = await User.findOne({email: decodedToken?.data}) 
        if(!user) {
            return res.status(404).json({
                success: false,
                error:"Invalid token",
                isAuthenticated: false
            });
        }
        console.log('decoded data', user)
        req.user = user;
        next();
}

export default authenticateUser;

        
        