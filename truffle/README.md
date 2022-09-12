#Smart Contract Quadratic Voting

>The underlying structure for the quadratic voting smart contract consists of several elements of which parts will be written on the blockchain to make the voting process transparent and immutable.

###Voting round:
A voting round symbolises a collection of competing proposals on which users will vote quadratically with a fixed amount of voting credits. The struct can assume several statuses in the given order with different functionalities:

**collecting proposals:**

Default status after creation. Proposals can be created and assigned to a voting round.

**active voting:**

When setting the status to active voting, the amount of credits (depending on the number of competing proposals) and the duration of the active voting period (which can be increased before it has ended) need to be decided. When this status is active, users can cast their votes.

**tally:**

When the voting period has ended, the status changes to tally. Votes can be counted and winning proposals be implemented.  

**ended:**

Last state to implicate a completed voting cycle.

###Proposal:
A proposal always needs to belong to a voting round. Proposals are created and stored by their hashed value to reduce the size of data written on the blockchain and keep gas fees as low as possible. Since proposals are stored in their complete form on Arweave (including their hash) they can easily be validated by any user.

###Voter:
Every signed up user is eligible for casting votes on proposals of a voting round. Each voter will be given the same amount of voting credits as soon as they cast their vote. When a user has voted, the information will be tracked, to exclude multiple vote casts.

###Balances:
Since users are currently stored within a database (instead of connecting with a separate wallet), there are no other accounts than the one owner account. This fact leads to balances being mapped from strings (user IDs) instead of accounts.