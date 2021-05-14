const chalk = require("chalk");
const yargs = require("yargs");

const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "Add a new note!",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true,
    },
    body: {
      describe: "Note body",
      type: "string",
      demandOption: true,
    },
  },
  handler: (argv) => notes.add(argv.title, argv.body),
});

yargs.command({
  command: "remove",
  describe: "Removing an old note!",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true,
    },
  },
  handler: (argv) => notes.remove(argv.title),
});

yargs.command({
  command: "list",
  describe: "List all notes!",
  handler: () => notes.list(),
});

yargs.command({
  command: "read",
  describe: "Reading a note!",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true,
    },
  },
  handler: (argv) => notes.read(argv.title),
});

yargs.parse();
