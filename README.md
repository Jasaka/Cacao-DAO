# Cacao-DAO
## Setup
> If you are using Windows, it is strongly recommended to use WSL 2 to follow this guide.
### Initial Steps
1. Clone the Repo
2. Make sure you have installed [node.js](https://nodejs.org/en/) (and [npm, optionally using nvm](https://www.npmjs.com/package/npm))
3. Make sure you have installed [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) `npm install --global yarn`
4. Make sure you have installed [docker](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/). Also install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for more convenience if you want.
5. You are ready to go! You can now run docker-compose up to start the dev environment (Postgres & Hardhat).
---

### Repo Structure
This repository is a monorepo for every part of Cacao DAO. It is structured as follows:

    .
    ├── ...
    ├── .github                 # Action for Demo-Cronjobs and MarketingPages
    ├── hardhat                 # Solidity Contracts and Hardhat Config for testing and deployment
    ├── next                    # Front- and Backend for the plattform
    ├── resources               # Resources for Wiki and Readme
    ├── docker-compose.yml      # Docker-Compose for local development
    ├── README.md               # This file
    ├── LICENSE                 # MIT License
    └── ...

We will probably switch to a [TurboRepo](https://turbo.build/) managed structure in the near future.

The structure of the most important projects is listed here:

    .
    ├── ...
    ├── hardhat                 # Solidity Contracts and Hardhat Config for testing and deployment
    │   ├── contracts           # Solidity Contracts
    │   ├── scripts             # Scripts for deployment
    │   ├── test                # Tests for Contracts
    │   ├── hardhat.config.js   # Hardhat Config
    │   └── ...
    ├── next                    # Front- and Backend for the plattform
    │   ├── public              # Public static files
    │   ├── seeds               # Database seeds
    │   ├── styles              # Stylesheets
    │   ├── src                 # All source code
    │   │   ├── components      # React Components, split into subfolders by function
    │   │   ├── data            # All static data, later will include language files, currently only AppSettings
    │   │   ├── hooks           # Custom React Hooks
    │   │   ├── lib             # Server-side helper code
    │   │   ├── pages           # Next.js Pages
    │   │   │   ├── api         # All API Routes
    │   │   │   └── ...         # All frontend views
    │   │   ├── models          # Models for API/Database use
    │   │   ├── util            # Utility functions
    │   │   ├── middleware.ts   # Next.js Middleware for authentification
    │   │   └── ...
    │   ├── tailwind.config.js  # Tailwind Config
    │   ├── next-auth.d.ts      # Types for Next-Auth
    │   ├── dist.env.local      # Environment distribution file for local development
    │   ├── package.json        # Package.json
    │   └── ...


### GitHub Pages
We also have a marketing-page branch for Cacao DAO. It is hosted on GitHub Pages and can be found [here](https://jasaka.github.io/Cacao-DAO/).
The structure of the marketing page is as follows, using [Next.js](https://nextjs.org/):

    ├── marketing               # Static Marketing Page
    │   ├── components          # React Components
    │   ├── pages               # Next.js Pages
    │   ├── public              # Static Files
    │   ├── package.json        # Package.json
    │   └── ...
    └── ...


---
## Development

### For Smart contract development:

For using hardhat to compile, test, deploy & run a local blockchain node check our respective [hardhat README](hardhat/README.md).

For further information on Hardhat see the official [documentation](https://hardhat.org/hardhat-runner/docs/getting-started).

### For Next.js development:
Move into `next/` and run `yarn install` to install needed packages.

You will need to run the following command to enable the `.env.local` file:
`cp dist.env.local .env.local`

After starting the docker-compose environment, you can run `yarn dev` to start the development server.

The server will be available at `localhost:3000`.

This project is written in [TypeScript](https://www.typescriptlang.org/) and uses [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [Next-Auth](https://next-auth.js.org/) and [React](https://reactjs.org/).
For connecting to Arweave, we use [arweave-js](https://github.com/ArweaveTeam/arweave-js). For Ethereum, we use [web3.js](https://web3js.readthedocs.io/en/v1.5.2/).

For database (PostgreSQL) development and viewing of the dataset you could use [TablePlus](https://tableplus.com/). A seed file can be found under `next/seeds/seed.sql` you will find a DB diagram in the `resources` folder.

We will add a swagger file for the API soon.

[Further Information on Next.js development can be found here.](https://github.com/Jasaka/Cacao-DAO/blob/main/next/README.md)

### Architecture

Due to many moving parts in our dApp we follow a hybrid infrastructure approach.

On one side we have constant data storage on arweave, where we store submitted proposals as json, including their sha256 hash, to facilitate trustless voting. Then we have the smart contract on an ethereum derivate, which is able to hold our voting cycle and manages votes and voters including their respective ids.

On the other side, we have a more traditional client-server architecture, which is responsible for displaying information which is easily understandable by a user, handling user input and providing a powerful API to facilitate our user interactions.

![Architecture](/resources/CacaoDAO_Architecture.png)

The Database mirrors our business logic and is the single source of truth for the whole application. It is used to store all data which is not stored on arweave, such as user data, proposals, votes and flags. It is also used to store the state of the platform, such as the current voting cycle, the current voting period and the corresponding proposals.

![Database](/resources/db_diagram.png)

---
## Deployment

Currently, our smart contract only supports a single project so you will need to deploy it yourself. We recommend using [Hardhat](https://hardhat.org/) for this. And have added a way to deploy using the hardhat config.


You will also need an Arweave Wallet. A great tutorial can be found [here](https://docs.arweave.org/info/wallets/arweave-wallet#getting-started).

We recommend using [Railway](https://railway.app/) for deployment. It is a simple and easy to use platform.

For your convenience we have created a template project for you to use:


[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/ZiHqSQ?referralCode=x2OFXr)

This will take care of setting up the database and Next.js server for you.

You will need to set the following environment variables:

- `DATABASE_URL`: The URL to your database. You can find this in the database settings.
- `ARW_USE`: 0 or 1. If you want to use Arweave or not.
- `ARW_WALLET_KEY`: Your Arweave Wallet Key. You can find this in the wallet settings.
- `ETH_KEY`: Your Ethereum Wallet Key. You can find this in the wallet settings.
- `CONTRACT_ADDRESS`: The address of your smart contract. You can find this in the smart contract settings.
- `ALCHEMY_URL`: The URL to your Alchemy API. You can find this in the Alchemy project settings.
- `ALCHEMY_KEY`: The key to your Alchemy API. You can find this in the Alchemy project settings.
- `NEXTAUTH_SECRET`: A secret for Next-Auth.
- `NEXTAUTH_URL`: The URL of your Next.js server. You can find this in the server settings.
- `NEXT_PUBLIC_API_HOST`: The URL of your Next.js server plus '/api/'
- `CRON_KEY`: A secret for the cronjobs.

---

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
