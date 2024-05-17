import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log('token',token)
  if(!token) {
    return res.status(401).json({
        success: false,
        error:"Unauthenicated request",
        isAuthenticated: false
    });
};
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {

    if (err) return res.status(403).json({
        success: false,
        error:"Invalid token",
        isAuthenticated: false
    })

    req.user = user;
    console.log(req.user.role);

    next();
  });
}

export default authenticateUser;;