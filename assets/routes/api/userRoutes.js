const router = require("express").Router();
const {
  //add functions
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");
// /api/users
router.route("/").get(getUsers).post(addUser);
// /api/users/userId
router.route("/:userId").put(updateUser).delete(deleteUser);
// /api/users/userId/friends/friendsId
router
  .route("/:userId/friends/:friendsId")
  .post(addFriend)
  .delete(deleteFriend);
module.exports = router;
