const router = require("express").Router();
const Review = require("../controller/Review");

router.post("/create", Review.Create);
router.get("/all/:postId", Review.GetAll);

module.exports = router;
