const express = require("express");
const router = express.Router();
const app = express();
const authController = require("../controllers/user.controller.js");
const authorizate = require("../middlewares/authorize.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/dashboard", authorizate("admin" || "manager"), (req, res) => {
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: `dashboard ${req.user.role}`,
  });
});
module.exports = router;
