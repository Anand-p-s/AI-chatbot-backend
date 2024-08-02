import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Token not recieved" })
  }
  return new Promise<void>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err)
        return res.status(401).json({ message: "Token Expired" })
      } else {
        resolve();
        res.locals.jwtData = success;        
        return next()
      }
    });
  });
};
