const chalk = require("chalk");
const fs = require("fs");

const load = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (e) {
    return [];
  }
};

const save = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const add = (title, body) => {
  const notes = load();
  if (notes.every((note) => note.title !== title)) {
    notes.push({
      title,
      body,
    });
    save(notes);
    console.log(chalk.green.bold.inverse("Note is added!"));
  } else {
    console.log(chalk.red.bold.inverse("Note title is already taken!"));
  }
};

const remove = (title) => {
  const notes = load();

  if (!notes.every((note) => note.title !== title)) {
    save(notes.filter((note) => note.title !== title));
    console.log(chalk.green("Note removed!"));
  } else {
    console.log(chalk.red("Note not found!"));
  }
};

const list = () => {
  load().forEach((note) => console.log(chalk.yellow.bold.inverse(`Note --> Title: ${note.title} | Body: ${note.body}`)));
};

const read = (title) => {
  const note = load().find((note) => note.title === title);
  console.log(chalk.yellow.bold.inverse(`Note --> Title: ${note.title} | Body: ${note.body}`));
};

module.exports = {
  add,
  remove,
  list,
  read,
};
