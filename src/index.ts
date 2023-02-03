#!/usr/bin/env node

import { compile, rename } from "./build";
import fs from "fs";

const main = async () => {
  let outputDirName = process.argv[2];
  let dataFileName = process.argv[3];
  let templateDirName = process.argv[4];

  if (!templateDirName) {
    templateDirName = `${__dirname}/../template`;
  }
  if (!outputDirName || !dataFileName) {
    console.log(
      "please specify argument of <output dir> <definition file name>"
    );
    process.exit();
  }

  if (!fs.statSync(templateDirName).isDirectory()) {
    console.error("error: wrong template dir");
    process.exit();
  }
  const dataStr = fs.readFileSync(dataFileName, "utf8");
  const data = JSON.parse(dataStr);
  try {
    await compile(templateDirName, outputDirName, data);
    rename(outputDirName, `filename-def.json`);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

main();
