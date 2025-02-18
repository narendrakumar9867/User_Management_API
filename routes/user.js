const express = require("express");
const { handleUserSignup, handleUserLogin, handleCreateNewUsers, handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

router.route("/").get(handleGetAllUsers).post(handleCreateNewUsers);

router.route("/:id").get(handleGetUserById).put(handleUpdateUserById).delete(handleDeleteUserById);

module.exports = router;
