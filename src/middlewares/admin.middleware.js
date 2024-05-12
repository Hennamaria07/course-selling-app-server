import jwt from "jsonwebtoken";

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.status(401).json({
        success: false,
        error:"Unauthenicated request",
        isAuthenticated: false
    });
};

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    console.log(err);

    if (err) return res.status(403).json({
        success: false,
        error:"Invalid token",
        isAuthenticated: false
    })

    req.user = user;

    console.log(req.user.role);
    
    if (req.user?.role !== "admin") {
      return res.send("not authenticated");
    }
    next();
  });
}

export default authenticateAdmin;