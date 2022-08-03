const router = require("express").Router();
const AdminAuth = require("../controller/AdminAuth");

router.post("/login", AdminAuth.Login);
router.post("/signup", AdminAuth.SignUp);

module.exports = router;
