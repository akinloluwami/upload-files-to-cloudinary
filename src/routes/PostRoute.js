const AdminPost = require("../controller/AdminPost");
const router = require("express").Router();

router.post("/create", AdminPost.Create);
router.get("/all", AdminPost.GetAll);
router.delete("/delete/:id", AdminPost.Delete);
router.get("/:postId", AdminPost.getSinglePost)
module.exports = router;
