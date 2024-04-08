import { Router } from "express";
import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    getSector,
    getIntensity,
    getYear,
    getPestle,
    getCountry,
    deleteUser,
    addNewReport,
    uploadUserProfile,
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
router.route("/year").get( getYear)
router.route("/pestle").get( getPestle)
router.route("/country").get( getCountry)
router.route("/addNewReport").post( addNewReport)
router.route("/upload-profile").post(upload.single("profile"), uploadUserProfile)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/deactivation").post(verifyJWT, deleteUser)


export default router;