const mongoose = require("mongoose");

const CONNECTION_URL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
