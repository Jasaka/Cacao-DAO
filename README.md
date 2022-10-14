# Cacao-DAO
## Setup
> If you are using Windows, it is strongly recommended to use WSL 2 to follow this guide.
### Initial Steps
1. Clone the Repo
2. Make sure you have installed [node.js](https://nodejs.org/en/) (and [npm, optionally using nvm](https://www.npmjs.com/package/npm))

#### For Smart contract development:

Install hardhat: 

- Via npm: `npm install --save-dev hardhat`
- Via yarn: `yarn add --dev hardhat`

For further information see the official [installation guide](https://hardhat.org/hardhat-runner/docs/getting-started#installation).

#### For API development
Move into `api/` and run `npm install` to install needed packages.

You will need to run the following command to enable the `.env` file:
`cp .env.dist .env`

For database (sql) development and viewing of the dataset you could use [TablePlus](https://tableplus.com/). A `PostgreSQL` database dump can be found under `api/cacao-dao-api-db.dump`.

For request-testing against the API you could use [Insomnia](https://insomnia.rest/). An Insomnia request collection can be found under `api/insomnia-api-request-collection.json`.

[Further Information on API development can be found here.](https://github.com/Jasaka/Cacao-DAO/blob/main/api/README.md)

#### For Client development
Move into `client/` and run `npm install` to install needed packages.

The client is written in [TypeScript](https://www.typescriptlang.org/) and uses the [React](https://reactjs.org/) framework.
We leverage [Tailwind CSS](https://tailwindcss.com/docs/) for styling.

[Further Information on Client development can be found here.](https://github.com/Jasaka/Cacao-DAO/blob/main/client/README.md)

---

### Repo Structure
Smart Contract Development:
-   `hardhat.config.ts`: Hardhat configuration file
-   `contracts/`: Contains the [Solidity](https://solidity.readthedocs.io/) source files for our smart contracts.
-   `scripts/`: Contains scripts for deployment of smart contracts.
-   `test/`: Contains both JavaScript and Solidity tests for our smart contracts.

Client Development
-   `client/public/`: The built frontend client
-   `client/src/`: Client source files

API Development
- `api/`: All api-related files
- `api/server.js`: All code related to basic server functions - routing, hashing, validation
- `api/dbQueries.mjs`: All `SQL` code for off-chain-persistance
- `api/arweaveQueries.mjs`: All `GraphQL` queries for Arweave interaction

---

## Smart Contracts
### Basic Usage
Smart contracts are deployed to the network using hardhat.
They are written in [Solidity](https://docs.soliditylang.org/en/v0.8.15/).

#### Initial Steps
1. Install open zeppelin security audited smart contracts:
  `$ npm install @openzeppelin/contracts`
2. Import contracts in Solidity via: `import "@openzeppelin/contracts/token/ERC721/ERC721.sol";`

To compile the entire project, build all artifacts run:
`npx hardhat compile` (in the hardhat directory)

To run typescript tests, run:
`npx hardhat test` (in the root directory)



## API
Currently supported routes are:
| Route                                         | Type | Body                                                           | Response         |
| --------------------------------------------- | ---- | -------------------------------------------------------------- | ---------------- |
| /users                                        | GET  |                                                                |                  |
| /users/{id}                                   | GET  |                                                                |                  |
| /login                                        | POST | {userName: string, password: string}                         | {token, expirationDate} |
| /proposals                                     | GET  |                                                                |                  |
| /proposals/{id}                               | GET  |                                                                |                  |
| /proposals                                    | POST | {title: string, description: string, predictedCost?: number}  |                  |
| /proposals/{id}/flags                     | GET  |                                                                |                  |
| /proposals/{id}/flags                     | POST | {proposalHash: string, flagMessage: string, flagAuthorId?: uuid} |                  |
| /proposalFlags                                        | GET  |                                                                |                  |

The API can be reached via https://cacao-dao-api.herokuapp.com/

To run the API locally run `npm run start:local`.

___

## Contributing

### General

* Ensure that you update issues and merge requests, which are assigned to you, as often as possible. Those updates are vital for everyone to see what is going on.
* Communicate early if you can't finish work on an issue which others are depending on
* Always work in branches, never commit to `main` directly (except merge commits or hotfixes).
* Commit as often as possible, even if it is work-in-progress code. This allows you to go back easily and ensures that you have an emergency backup if something goes wrong.
* Clean up a merge request (via rebase or squash) before notifying the reviewers for the final review.

### Commits

We use [semantic commit messages](https://sparkbox.com/foundry/semantic_commit_messages) to ensure a consistent style. We do this because this forces us to think about our process and because it leads to an easyly readible commit log.

#### Predefined types

* `chore`: Commits related to project setup, build or continuous integration configuration
* `docs`: Commits related to documentation updates. Also applies if you update the documentation in code (jsdoc, `@doc` etc.)
* `feat`: Commits which add new features
* `fix`: Commits which fix a bug. Please add the issue id in the description if necessary
* `refact`: Commits which improve existing code without changing its functionality
* `style`: Commits which improve code style
* `test`: Commits which add/remove/improve tests

#### Examples

``` console
chore: add Oyster build script
docs: explain hat wobble
feat: add beta sequence
fix: remove broken confirmation message
refact: share logic between 4d3d3d3 and flarhgunnstow
style: convert tabs to spaces
test: ensure Tayne retains clothing
```

### **Show / Ship / Ask**, Feature Branches and Merge Requests

`Main` should always be a working version of the app, so that we could later use it to continuously deploy from it.
Development should usually happen on feature branches. These are named after their respective project, issue and kind of work done on it.
Eg. for issue #17: `feat/17-creating-new-users`.

This enables a better readable git structure. If what you are working on is not directly correlating to an issue, leave out the issue number `fix/correct-behaviour-of-hover`. Always try to be descriptive in your branch names, based on what you are trying to do.

**[Show / Ship / Ask](https://martinfowler.com/articles/ship-show-ask.html)** is a branching strategy which enables fast shipping of changes.
Since we are a small team with very different time committments, this should enable a faster work pace.

#### Ask
This will probably be the default most of the time.

Ask is the normal Merge Request workflow. Complete work on your feature branch, rebase it to the current state of the repo, test it, then push it to gitlab and let it pass (future) pipelines and tests. Set up a merge request, assign the team as reviewers and wait for it to be approved before merging.

#### Show
If you are sure that your merge request will pass muster but still either want feedback or want to show off what you've done, create a new merge request and then instantly merge that request into `main` after it passed CI/CD.

#### Ship
For very small localized changes like typos, fast hotfixes or small styling changes, that are ***definitely*** not breaking anything you can directly merge-commit your changes into `main`.
