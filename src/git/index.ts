import Debug from "debug";
import chalk from "chalk";
import { execSync } from "child_process";

const debug = Debug("pull-all:git");

const checkBranch = () => {
  const branch = execSync("git branch --show-current", {
    encoding: "ascii",
  }).trim();

  debug(chalk.green(`Pulling branch ${branch}`));

  if (branch !== "main" && branch !== "master") {
    debug(chalk.red("\n (NOT THE MAIN BRANCH!!!)\n"));
  }
};

const pull = () => {
  const stdout = execSync("git restore . && git pull", {
    encoding: "ascii",
  });
  console.log(stdout);
};

const info = () => {
  console.log(
    chalk.blue("Last commit: "),
    execSync("git log -1 --format=%cd", { encoding: "ascii" })
  );
};

export default {
  pull,
  checkBranch,
  info,
};
