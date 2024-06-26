const express = require("express");

const router = express.Router();
const authControllers = require("../controllers/auth-controller");

// middile-ware is validate 
const validate = require("../middlewares/validate-middleware");
const authValidator = require("../validators/auth-validators");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);
router
    .route("/register")
    .post(validate(authValidator.signupSchema), authControllers.register);
router
    .route("/login")
    .post(validate(authValidator.loginSchema), authControllers.login);
router
    .route("/userList")
    .get(authMiddleware, authControllers.userList);
router
    .route("/delete")
    .post(validate(authValidator.deleteUserSchema), authControllers.deleteUser)

module.exports = router;