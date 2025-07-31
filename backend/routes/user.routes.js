const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const upload = require("../multer.setup")
const authenticate = require("../middleware/auth.middleware")

router.post("/signup",upload.single("img") , userController.userSignup)
router.post("/login", userController.userLogin)
router.get("/logout", userController.logout)
router.get("/me", authenticate.userAuthentication ,  userController.userProfile)

module.exports = router;