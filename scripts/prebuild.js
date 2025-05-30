const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

const buildDir = "./build";
const exampleDirs = ["./pages", "./pages-private"];

// Delete the build directory if it exists
if (shell.test("-d", buildDir)) {
  shell.rm("-rf", buildDir);
}

// Create a new build directory
shell.mkdir("-p", buildDir);

// Initialize a variable for targets JSON
let targets = {};

// Function to process each pages directory
function processDirectory(dir) {
  if (!shell.test("-d", dir)) {
    return;
  }

  // Read all directories in the pages directory
  const pages = fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });

  pages.forEach((exampleName) => {
    const examplePath = path.join(dir, exampleName);
    const buildExamplePath = path.join(buildDir, exampleName);

    // Create a new directory under the build directory named as the example
    shell.mkdir("-p", buildExamplePath);

    // Copy scripts/index.html and replace every occurrence of
    // EXAMPLE_NAME with the example directory name
    let templateFile = fs.readFileSync(
      "packages/playground/src/index-template.html",
      "utf8"
    );
    let resultFile = templateFile.replace(/EXAMPLE_NAME/g, exampleName);
    fs.writeFileSync(`${buildExamplePath}/index.html`, resultFile);

    // If image.png exists, copy it to the build directory
    if (shell.test("-f", `${examplePath}/image.png`)) {
      shell.cp("-n", `${examplePath}/image.png`, buildExamplePath);
    }

    // If assets directory exists, copy it to the build directory
    if (shell.test("-d", `${examplePath}/assets`)) {
      shell.cp("-r", `${examplePath}/assets`, buildExamplePath);
    }

    // Copy required files to the example's build directory
    shell.cp("packages/playground/src/input.js", buildExamplePath);
    shell.cp("packages/playground/src/reset.css", buildExamplePath);
    shell.cp("packages/playground/src/eval-elm.js", buildExamplePath);
    shell.cp("packages/playground/src/PlayEGI.js", buildExamplePath);
    shell.cp("packages/scene-canvas2d/elm-canvas.js", buildExamplePath);

    // Store the inputs and output strings
    const inputData = `${dir.slice(2)}/${exampleName}/Main.elm`;
    const outputData = `build/${exampleName}/main.js`;

    // Add the new target to the targets object
    targets[exampleName] = {
      inputs: [inputData],
      output: outputData,
    };
  });
}

// Process each directory
exampleDirs.forEach(processDirectory);

// Remove elm-watch.json if it exists already
if (shell.test("-f", "elm-watch.json")) {
  shell.rm("-f", "elm-watch.json");
}

// Writing targets data into elm-watch.json
let data = {
  targets: targets,
  serve: buildDir,
  port: 8000,
};
fs.writeFileSync("elm-watch.json", JSON.stringify(data, null, 2));
