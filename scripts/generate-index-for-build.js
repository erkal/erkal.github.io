const shell = require('shelljs');

// Ensure shelljs is available
if (!shell.which('cp') || !shell.which('rm') || !shell.which('sed')) {
  shell.echo('Sorry, this script requires Unix-like utilities such as cp, rm, and sed.');
  shell.exit(1);
}

// Step 1: Remove ./build/index.html
shell.rm('-f', './build/index.html');

// Step 2: Copy the content of ./build/HomePage into ./build
shell.cp('-Rf', './build/HomePage/*', './build/');

// Step 3: Replace all occurrences of certain strings in ./build/index.html
try {
  let indexHtml = shell.cat('./build/index.html').toString();

  // Replace paths in indexHtml content
  indexHtml = indexHtml.replace(/\.\.\/output\.css/g, './output.css');
  indexHtml = indexHtml.replace(/\.\.\/input\.js/g, './input.js');
  indexHtml = indexHtml.replace(/\.\.\/PlayEGI\.js/g, './PlayEGI.js');

  // Write the modified content back to the file
  shell.ShellString(indexHtml).to('./build/index.html');
} catch (error) {
  shell.echo(`Error while modifying ./build/index.html: ${error}`);
}
