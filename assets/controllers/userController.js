const { User } = require("../models");
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
};
