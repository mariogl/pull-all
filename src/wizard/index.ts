import inquirer from "inquirer";
import questions from "./questions.js";

const answers = await inquirer.prompt(questions);

export default answers;
