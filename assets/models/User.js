const { Schema, model } = require("mongoose");
// Schema to create Student model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (x) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(x);
        },
        message: (email) => `${email.value} is not a valid email`,
      },
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    //dont need id's for users
    id: false,
  }
);

const User = model("User", userSchema);

module.exports = User;
