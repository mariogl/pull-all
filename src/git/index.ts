import Debug from "debug";
import chalk from "chalk";
import fs from "fs";
import path from "path";
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

const checkIfPathsExists = (
  repoTargetFolder: string,
  paths: string[]
): void => {
  const output = execSync(
    "git diff HEAD~ HEAD --name-only",
    {
      encoding: "ascii",
    }
  );  
  paths.forEach((pathName) => {
    if (output.includes(path.basename(pathName))) {
      debug(chalk.red(`The project contains ${path.basename(pathName)}`));
    }
  });
};

export default {
  pull,
  checkBranch,
  checkIfPathsExists,
  info,
};
