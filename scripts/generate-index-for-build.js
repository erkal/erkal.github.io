const shell = require("shelljs");

// Ensure shelljs is available
if (!shell.which("cp") || !shell.which("rm") || !shell.which("sed")) {
  shell.echo(
    "Sorry, this script requires Unix-like utilities such as cp, rm, and sed."
  );
  shell.exit(1);
}

// Copy the content of ./build/HomePage into ./build
shell.cp("-Rf", "./build/HomePage/*", "./build/");
