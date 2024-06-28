import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log("Error: Token is required");
    return next(new ClientError("Token is required"));
  }

  try {
    console.log("Token received:", token); // Added this log
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.body.userId = decoded.userId;
    console.log("Token Check OK");
  } catch (error) {
    console.log("Error: Invalid token", error);
    return next(new ClientError("Invalid token"));
  }

  next();
};

export default checkLogin;
