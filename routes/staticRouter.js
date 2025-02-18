const express = require("express");
const { handleUserSignup, handleUserLogin} = require("../controllers/user");
const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

router.get("/signup", (req, res) => res.render("signup"));

router.get("/login", (req, res) => res.render("login"));

router.get("/", (req, res) => res.status(200).json({ msg: "auth route working."}));

module.exports = router;

