const router = require("express").Router();
const {
  //add functions
  getUsers,
  createUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

module.exports = router;
