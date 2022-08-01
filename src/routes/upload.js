const upload = require("../controller/upload");
const router = require("express").Router();

router.post("/image", upload.uploadImage);

module.exports = router;
