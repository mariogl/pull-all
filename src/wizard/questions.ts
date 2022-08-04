const questions = [
  {
    type: "input",
    name: "folder",
    message: "Folder: ",
    default: ".",
  },
  {
    type: "confirm",
    name: "install",
    message: "Install dependencies: ",
    default: false,
  },
];

export default questions;
