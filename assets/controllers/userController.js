const { User, Thought } = require("../models");
//user controller
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const courses = await User.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a user
  async addUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({
          message: "No user found with this id",
        });
      }
      //bonus
      const deletingThoughts = await Thought.deleteMany({
        _id: { $in: user.thoughts },
      });
      if (!deletingThoughts) {
        return res.status(404).json({
          message: "User deleted, but thougths were not",
        });
      }
      res.json({ message: "User Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status.json({ message: "user has no friends hehe" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status.json({ message: "user has no friends hehe" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
