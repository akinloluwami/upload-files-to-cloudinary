const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const dbConnection = require("./src/db/db");

dbConnection();

app.use(cors());
app.options("*", cors());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const uploadRouter = require("./src/routes/upload");
const adminAuthRouter = require("./src/routes/AdminAuthRoute");
const postRouter = require("./src/routes/PostRoute");

app.use("/upload", uploadRouter);
app.use("/admin", adminAuthRouter);
app.use("/post", postRouter);

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
