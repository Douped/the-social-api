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
};
