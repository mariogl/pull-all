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
  paths.forEach((pathName) => {
    checkIfFolderExists(path.join(repoTargetFolder, pathName));
  });
};

const checkIfFolderExists = (pathName: string): void => {
  try {
    fs.accessSync(pathName);

    debug(chalk.red(`The project contains ${path.basename(pathName)}`));
  } catch {}
};

export default {
  pull,
  checkBranch,
  checkIfPathsExists,
  info,
};
