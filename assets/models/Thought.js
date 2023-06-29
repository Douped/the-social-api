const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time) => new Date(time).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
//virtual for getting the amount of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
