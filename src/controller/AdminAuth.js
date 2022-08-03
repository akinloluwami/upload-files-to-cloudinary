const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function SignUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const admin = new Admin({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isNameValid = /^[a-zA-Z ]{2,30}$/.test(name);
  const emailExists = await Admin.findOne({ email });
  const passwordMatch = bcrypt.compareSync(password, confirmPassword);

  if (!isEmailValid) {
    return res.status(400).json({
      message: "Email is not valid",
    });
  }
  if (!isPasswordValid) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, contain at least one number, one uppercase letter and one special character",
    });
  }
  if (!isNameValid) {
    return res.status(400).json({
      message: "Name must be at least 2 characters long",
    });
  }
  if (emailExists) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }
  if (!passwordMatch) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    // await admin.save();
    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function Login(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({
      message: "Email or password is incorrect",
    });
  }
  const isPasswordValid = bcrypt.compareSync(password, admin.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Email or password is incorrect",
    });
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.status(200).json({
    message: "Admin logged in successfully",
    token,
  });
}
