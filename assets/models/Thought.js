const { Schema, model } = require("mongoose");
const { userSchema } = require("./User");
const { reactionSchema } = require("./Reaction");
// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    //use getter method to format timestamp on query?
    createdAt: {
      type: Date,
      // Sets value to current date
      default: Date.now(),
    },
    userName: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
