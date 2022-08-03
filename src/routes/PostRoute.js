const AdminPost = require("../controller/AdminPost");
const router = require("express").Router();

router.post("/create", AdminPost.Create);

module.exports = router;
