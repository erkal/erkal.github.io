import inquirer from "inquirer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

// Ensure required tools are available
if (!shell.which("elm") || !shell.which("surge")) {
  shell.echo("This script requires elm and surge to be installed.");
  shell.exit(1);
}

// Get list of examples from pages-private
const getExamples = () => {
  const items = fs.readdirSync("pages-private", { withFileTypes: true });
  return items.filter((item) => item.isDirectory()).map((dir) => dir.name);
};

async function main() {
  // Let user choose an example
  const examples = getExamples();
  const { chosenExample } = await inquirer.prompt([
    {
      type: "list",
      name: "chosenExample",
      message: "Choose an example to deploy:",
      choices: examples,
    },
  ]);

  const tempDir = `temp-surge-deploy-${chosenExample}`;

  // Create temp directory
  shell.rm("-rf", tempDir);
  shell.mkdir(tempDir);

  // Run build script to generate all necessary files
  shell.exec("npm run build");

  // Copy required files to temp directory
  shell.cp(`build/${chosenExample}/index.html`, tempDir);
  shell.cp(`build/${chosenExample}/main.js`, tempDir);
  shell.cp("build/output.css", tempDir);
  shell.cp("build/input.js", tempDir);
  shell.cp("packages/playground/src/PlayEGI.js", tempDir);
  shell.cp("packages/scene-canvas2d/elm-canvas.js", tempDir);

  // Modify index.html paths
  try {
    let indexHtml = shell.cat(`${tempDir}/index.html`).toString();

    // Replace paths
    indexHtml = indexHtml.replace(/\.\.\/output\.css/g, "./output.css");
    indexHtml = indexHtml.replace(/\.\.\/input\.js/g, "./input.js");
    indexHtml = indexHtml.replace(/\.\.\/PlayEGI\.js/g, "./PlayEGI.js");
    indexHtml = indexHtml.replace(/\.\.\/elm-canvas\.js/g, "./elm-canvas.js");

    shell.ShellString(indexHtml).to(`${tempDir}/index.html`);
  } catch (error) {
    shell.echo(`Error while modifying index.html: ${error}`);
    shell.exit(1);
  }

  // Deploy to surge
  shell.cd(tempDir);
  shell.exec(`surge . ${chosenExample}.surge.sh`);
  shell.cd("..");

  // Cleanup
  shell.rm("-rf", tempDir);

  console.log(`\nDeployed successfully to https://${chosenExample}.surge.sh`);
}

main().catch(console.error);
