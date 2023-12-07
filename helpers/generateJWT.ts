import jwt from "jsonwebtoken";

export const generateJWT = (userId:string) => {
  return jwt.sign(
    {
     userId
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};


