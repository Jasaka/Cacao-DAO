import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("QuadraticVoting", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployQuadraticVotingFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, account1, account2, account3, ] = await ethers.getSigners();

        const QuadraticVoting = await ethers.getContractFactory("QuadraticVoting");
        const quadraticVoting = await QuadraticVoting.deploy(1,1,4);

        return { quadraticVoting, owner, account1, account2, account3 };
    }

    describe("Cycle tests", function () {
        it("Cycle status", async function () {
            const { quadraticVoting, owner } = await loadFixture(deployQuadraticVotingFixture);

            // Starts with ENDED (2) before first proposals
            const statusOne = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
            expect(statusOne).to.equal(2);

            // After first proposal, should switch to COLLECTING_PROPOSALS (0)
            await quadraticVoting.createProposal("1");
            const statusTwo = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
            expect(statusTwo).to.equal(0);

            // Time over, yet not enough proposals, should switch to EXTENSION_NEEDED (3)
            await time.increaseTo(await quadraticVoting.getCycleProposingDeadline(quadraticVoting.getCurrentCycleHash()));
            const statusThree = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
            expect(statusThree).to.equal(3);

            // Proposing should still be possible while EXTENSION_NEEDED
            await expect(quadraticVoting.createProposal("2")).to.not.be.reverted;
            await expect(quadraticVoting.createProposal("3")).to.not.be.reverted;

            // Extending cycle, status should be updated to COLLECTING_PROPOSALS (0)
            await quadraticVoting.extendCycle(1);
            const statusFour = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
            expect(statusFour).to.equal(0);

            // When critical amount of proposals is reached, should switch to ACTIVE_VOTING (1) after time has passed
            await quadraticVoting.createProposal("4");
            await time.increaseTo(await quadraticVoting.getCycleProposingDeadline(quadraticVoting.getCurrentCycleHash()));
            const statusFive = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
            expect(statusFive).to.equal(1);

            // Voting should be possible
            await expect(quadraticVoting.castVote(owner.address, "2", 9, true)).to.not.be.reverted;
        });

       it("Proposing", async function () {
           const { quadraticVoting } = await loadFixture(deployQuadraticVotingFixture);
           await quadraticVoting.createProposal("1");
           await quadraticVoting.createProposal("2");
           await quadraticVoting.createProposal("3");
           await quadraticVoting.createProposal("lsiej294rth");

           // Revert: Trying to create same proposals again
           await expect(quadraticVoting.createProposal("3")).to.be.reverted;
           await expect(quadraticVoting.createProposal("lsiej294rth")).to.be.reverted;

           // Increase time for ACTIVE_VOTING (1) to start
           await time.increaseTo(await quadraticVoting.getCycleProposingDeadline(quadraticVoting.getCurrentCycleHash()));
           const status = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
           expect(status).to.equal(1);

           // Revert: Trying to create a proposal in ACTIVE_VOTING
           await expect(quadraticVoting.createProposal("5")).to.be.reverted;
       });

        it("Voting", async function () {
            const { quadraticVoting, owner, account1, account2, account3 } = await loadFixture(deployQuadraticVotingFixture);
            await quadraticVoting.createProposal("1");
            await quadraticVoting.createProposal("2");
            await quadraticVoting.createProposal("3");

            // Revert: Trying to vote while COLLECTING_PROPOSALS
            await expect(quadraticVoting.castVote(account1.address,"2", 9, true)).to.be.reverted;
            //await quadraticVoting.castVote(account2.address,"2", 9, true);
        });

        //const { quadraticVoting, owner, account1, account2, account3 } = await loadFixture(deployQuadraticVotingFixture);

/*

        it("Should fail if the unlockTime is not in the future", async function () {
            // We don't use the fixture here because we want a different deployment
            const latestTime = await time.latest();
            const Lock = await ethers.getContractFactory("Lock");
            await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
                "Unlock time should be in the future"
            );
        });*/
    });
/*
    describe("Withdrawals", function () {
        describe("Validations", function () {
            it("Should revert with the right error if called too soon", async function () {
                const { lock } = await loadFixture(deployOneYearLockFixture);

                await expect(lock.withdraw()).to.be.revertedWith(
                    "You can't withdraw yet"
                );
            });

            it("Should revert with the right error if called from another account", async function () {
                const { lock, unlockTime, otherAccount } = await loadFixture(
                    deployOneYearLockFixture
                );

                // We can increase the time in Hardhat Network
                await time.increaseTo(unlockTime);

                // We use lock.connect() to send a transaction from another account
                await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
                    "You aren't the owner"
                );
            });

            it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
                const { lock, unlockTime } = await loadFixture(
                    deployOneYearLockFixture
                );

                // Transactions are sent using the first signer by default
                await time.increaseTo(unlockTime);

                await expect(lock.withdraw()).not.to.be.reverted;
            });
        });

        describe("Events", function () {
            it("Should emit an event on withdrawals", async function () {
                const { lock, unlockTime, lockedAmount } = await loadFixture(
                    deployOneYearLockFixture
                );

                await time.increaseTo(unlockTime);

                await expect(lock.withdraw())
                    .to.emit(lock, "Withdrawal")
                    .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
            });
        });
    });*/
});
