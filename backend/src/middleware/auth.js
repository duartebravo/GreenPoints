import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith("Bearer "))
    return res.status(403).json({ error: "Token em falta" });

  const token = h.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { sub, role, iat, exp }
    return next();
  } catch {
    return res.status(403).json({ error: "Token inválido/expirado" });
  }
}
