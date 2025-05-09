const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

// Create the build directory if it doesn't exist
const buildDir = "./build";
shell.mkdir("-p", buildDir);

// Path to the pages directory
const pagesDir = "./pages";

// Fetch all folders in pages directory
const folders = shell
  .ls("-d", `${pagesDir}/*/`)
  .map((folder) => path.basename(folder));

// Generate HTML content for index.html
let linksHtml = folders
  .map((folder) => {
    return `<li><a href="./${folder}/index.html">${folder}</a></li>`;
  })
  .join("\n");

// Basic dark theme CSS
const cssStyle = `
  <style>
    body {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      background-color: #3B3A36;
      color: #D79921;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-bottom: 10px;
    }
    a {
      color: lightblue;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
        body {
            padding-left: 10px;
            padding-right: 10px;
        }
        .container { width:auto;}
     }
</style>
`;

// Assemble full HTML page content
let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Index of Pages:</title>
${cssStyle}
<!-- fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
  rel="stylesheet"
/>
</head>
<body>
<div class="container">
<h1>Index of Pages</h1>
<ul>${linksHtml}</ul>
</div>
</body>
</html>`;

// Write the index.html file to the build directory
fs.writeFileSync(path.join(buildDir, "index.html"), htmlContent);

console.log("index.html has been generated successfully.");
