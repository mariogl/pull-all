import chalk from "chalk";
import { execSync } from "child_process";
import Debug from "debug";

const debug = Debug("pull-all:npm");

const install = () => {
  debug(chalk.green("Installing dependencies..."));
  execSync("npm i");
};

export default {
  install,
};
