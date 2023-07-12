const router = require("express").Router();
const {
  //add functions
  getUsers,
  addUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(addUser);

module.exports = router;
