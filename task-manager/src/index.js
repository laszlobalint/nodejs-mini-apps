const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

process.env["NO_PROXY"] = "*";
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Web Server has started on port ${port}!`));
