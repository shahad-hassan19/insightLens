import { Router } from "express";
import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    getSector,
    getIntensity,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from './../middlewares/auth.middleware.js';

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "profile",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)
router.route("/currentUser").get(verifyJWT, getCurrentUser)
router.route("/sector").get( getSector)
router.route("/intensity").get( getIntensity)
router.route("/logout").post(verifyJWT, logoutUser)


export default router;