import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;

    if (!headerToken) return res.status(401).json({ msg: "No token provided" });

    const token = headerToken.startsWith("Bearer ")
      ? headerToken.split(" ")[1]
      : headerToken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
