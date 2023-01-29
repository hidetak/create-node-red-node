import ejs from "ejs";
import fs from "fs";

const compile = async (
  templateDirName: string,
  outputDirName: string,
  data: object
) => {
  await makeDir(outputDirName);
  const tempFileNames = fs.readdirSync(templateDirName);
  for (const tempFileName of tempFileNames) {
    const tempFilePath = templateDirName + `/${tempFileName}`;
    const outFilePath = outputDirName + `/${tempFileName}`;
    if (fs.statSync(tempFilePath).isDirectory()) {
      await compile(tempFilePath, outFilePath, data);
    } else {
      let template = fs.readFileSync(tempFilePath, "utf8");
      console.log(`convert ${tempFilePath} => ${outFilePath}`);
      let content = ejs.render(template, data);
      fs.writeFileSync(outFilePath, content, "utf8");
    }
  }
};

const makeDir = async (path: string) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        if (fs.statSync(path).isDirectory()) {
          resolve(null);
        } else {
          reject(`error: ${path} is not directory`);
        }
      } else {
        resolve(null);
      }
    });
  });
};

const rename = (outputDirName, defFileName) => {
  const defStr = fs.readFileSync(`${outputDirName}/${defFileName}`, "utf8");
  const def = JSON.parse(defStr);
  for (const beforePath in def) {
    if (fs.existsSync(`${outputDirName}/${beforePath}`)) {
      fs.renameSync(
        `${outputDirName}/${beforePath}`,
        `${outputDirName}/${def[beforePath]}`
      );
      console.log(
        `rename ${outputDirName}/${beforePath} => ${outputDirName}/${def[beforePath]}`
      );
    } else {
      console.log(`skip ${outputDirName}/${beforePath}`);
    }
  }
};

const main = async () => {
  const templateDirName = process.argv[2];
  const outputDirName = process.argv[3];
  const dataFileName = process.argv[4];

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
