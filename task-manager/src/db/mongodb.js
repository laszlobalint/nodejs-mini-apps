const { MongoClient, ObjectId } = require("mongodb");

const CONNECTION_URL = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "task-manager";

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) return console.log("Unable to connect to database");

  const db = client.db(DATABASE_NAME);
  console.log("Connected to MongoDB server and 'task-manager' database!");
});
