# dOrg Client & Server

This is the app for the dOrg client and server. A next.js app that uses a postgres database and is able to connect to Arweave and Ethereum.

dOrg is a platform for trustless voting on submitted proposals - by the community for the community.

Proposals are saved forever on Arweave (a blockweave), their version history is also retained, so that everyone knows what to expect without a doubt if they cast their vote.

Voting is done via quadratic voting. A user has a pool of possible vote points and is able to vote on all proposals of a cycle. Giving more votes to a single proposal squares the amount of votes to determine the vote cost, eg 2 votes on two proposals each cost 8 vote points in sum, whereas 3 votes on one proposal also cost 8 points, 4 votes on one proposal would already cost 16 points. Voting is facilitated via a smart contract on an Ethereum based chain, so that the whole process is transparent for the user.

Currently the platform pays all fees, there are no fees for the user. Users sign up and use our platform with MetaMask, we provide an easy to understand explanation for the signup process.

The vote results are then displayed and acted on by the platform provider. There is a way to display results of previous cycles.

## Getting Started

### File Structure

    .
    ├── ...
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


### Starting the development environment

First, start docker in the repository root, then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



## Learn More

To learn more about **Next.js**, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

To learn more about **NextAuth.js**, take a look at the following resources:

- [NextAuth.js Documentation](https://next-auth.js.org/) - learn about NextAuth.js features and API.

To learn more about **React-Query**, take a look at the following resources:

- [React-Query Documentation](https://react-query.tanstack.com/) - learn about React-Query features and API.

To learn more about **Typescript**, take a look at the following resources:

- [Typescript Documentation](https://www.typescriptlang.org/docs/) - learn about Typescript features and API.
- [React with Typescript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - learn about React with Typescript.

To learn more about **TailwindCSS**, take a look at the following resources:

- [TailwindCSS Documentation](https://tailwindcss.com/docs) - learn about TailwindCSS features and API.
- [TailwindCSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) - learn about TailwindCSS.


To learn more about **Arweave**, take a look at the following resources:

- [Arweave Documentation](https://docs.arweave.org/developers) - learn about Arweave features and API.
- [Arweave-JS GitHub repository](https://github.com/ArweaveTeam/arweave-js) - learn about Arweave-JS.

To learn more about **Ethereum**, take a look at the following resources:

- [Ethereum Documentation](https://ethereum.org/en/developers/docs/) - learn about Ethereum features and API.
