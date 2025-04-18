# What?

This repository creates [erkal.github.io](https://erkal.github.io/index.html) and all of its subpages.

# Development Setup

You have to have Node.js installed on your machine.
If you don't have it, I strongly recommend you to install it using a version manager like [nvm](https://github.com/nvm-sh/nvm).

To begin with the development setup, follow the steps listed below:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/erkal/erkal.github.io.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd erkal.github.io
   ```

3. **Install all dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   This starts serving of all pages. To access them, launch your browser and navigate to [http://localhost:8000/](http://localhost:8000/).

   With this setup, when you alter your code, the modifications will take effect immediately, without any loss of the current state. This efficient, seamless functionality is made possible by the exceptional [lydell/elm-watch](https://github.com/lydell/elm-watch), which flawlessly manages hot reloading.

5. **Adding a new example:**

   Copy one of the existing pages and change the module names of the Elm files in it accordingly. And you are ready to go.
