#!/usr/bin/env node

import "./loadEnv.js";
import Debug from "debug";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import answers from "./wizard/index.js";
import git from "./git/index.js";
import npm from "./npm/index.js";
import forbiddenPaths from "./forbiddenPaths.js";

const debug = Debug("pull-all:root");

const dir = answers.folder ?? ".";

try {
  const files = (await fs.readdir(dir)).filter(
    (file) => file !== "node_modules"
  );

  files.forEach(async (file) => {
    try {
      const directoryPath = path.resolve(dir, file);

      const stats = await fs.stat(directoryPath);
      if (stats.isDirectory()) {
        debug(`Project ${chalk.yellow(file)}`);
        process.chdir(directoryPath);

        git.checkBranch();

        console.log("\n");

        git.pull();

        git.checkIfPathsExists(directoryPath, forbiddenPaths);

        if (answers.install) {
          npm.install();
        }

        git.info();
      }
    } catch {
      return;
    }
  });
} catch (error) {
  console.error(chalk.red(error.message));
}
