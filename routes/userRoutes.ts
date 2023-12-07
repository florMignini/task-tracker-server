import express from "express";
import { confirmSession, login, recoverPassword, register, updatePassword, userProfile, verifyToken } from "../controllers/userController";
import { checkAuth } from "../middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/confirm/:token", confirmSession);
router.post("/recover-password", recoverPassword);
router.route("/recover-password/:token").get(verifyToken).post(updatePassword);
router.get("/profile", checkAuth, userProfile)


export default router;