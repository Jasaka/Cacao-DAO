# Getting Started with the Cacao DAO Client

This is the frontend client for Cacao DAO.

The client is written in [TypeScript](https://www.typescriptlang.org/) and uses the [React](https://reactjs.org/) framework.
We leverage [Tailwind CSS](https://tailwindcss.com/docs/) for styling.

## Installation

To get started with the client, you need to install the needed packages:
`npm install`

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`, `lint:fix`, `format` and `preflight`

- `npm run lint`: will search for problems using eslint, but will not fix
- `npm run lint:fix`: will search and try to fix the problems using eslint.
- `npm run format`: will call prettier to fix the code style.
- `npm run preflight`: will run the lint and format commands.

# Interacting with deployed Smart Contracts
This is still work in progress. 

We're planning to refactor the API and move user authentication to the client with support for self-custodial wallet authentication.
This minimizes trust in the system and maximizes sovereignty for users.


# Developing Resources

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about TypeScript, check out the [TypeScript documentation](https://www.typescriptlang.org/docs/home.html).

To learn more about Typescript together with React, check out the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/).
