const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { getRandomThought, getRandomName, getRandomEmail } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  // Create empty array to hold the users
  const users = [];

  // Loop 5 times -- add users to the users array
  for (let i = 0; i < 5; i++) {
    let userName = getRandomName();
    let email = `${userName}-${getRandomEmail()}@email.com`;
    users.push({
      userName,
      email,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
