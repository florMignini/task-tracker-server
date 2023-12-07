import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";


interface decodedType {
  id: string;
  iat: number;
  exp: number;
}

export const checkAuth = async (req: any, res: Response, next: any) => {

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        const error = new Error(`Invalid authorization`);
       return res.status(401).json({
          msg: error.message,
        });
      }
      const decoded: any = await jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await User.findById(decoded.userId).select(
        "-password -confirm -token -__v"
        );

      return next();
    } catch (error) {
      return res.status(500).json({
        msg: `Something went wrong with the server`,
      });
    }
  }

  next();
};
