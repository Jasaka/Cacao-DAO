import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {BigNumber} from "ethers";
import {QuadraticVoting} from "../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

describe("QuadraticVoting", function () {
    let quadraticVoting :QuadraticVoting;
    let owner: SignerWithAddress;
    let account1: SignerWithAddress;
    let account2: SignerWithAddress;
    let account3: SignerWithAddress;
    let cycleHash1 = ethers.utils.formatBytes32String("1");
    let cycleHash2 = ethers.utils.formatBytes32String("2");

    async function deployQuadraticVotingFixture() {
        // Contracts are deployed using the first signer/account by default
        const [_owner, _account1, _account2, _account3, ] = await ethers.getSigners();

        const QuadraticVoting = await ethers.getContractFactory("QuadraticVoting");
        quadraticVoting = await QuadraticVoting.deploy(1,1,4);
        owner = _owner;
        account1 = _account1;
        account2 = _account2;
        account3 = _account3;
    }

    describe("Cycle tests", function () {
        describe("Cycle status", function () {

            it("[initialize fixture]", async function () {
                await loadFixture(deployQuadraticVotingFixture);
            });

            it("should start with ENDED (2) before first proposals", async function () {
                const statusOne = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
                expect(statusOne).to.equal(2);
            });

            it("should switch to COLLECTING_PROPOSALS (0) after cycle initiation", async function () {
                await quadraticVoting.createCycle(cycleHash1);
                const cycleStatus = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
                expect(cycleStatus).to.equal(0);
            });

            it("should switch to COLLECTING_PROPOSALS (0) after first proposal", async function () {
                await quadraticVoting.createProposal("1");
                const statusTwo = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
                expect(statusTwo).to.equal(0);
            });

            it("should switch to EXTENSION_NEEDED (3) when time is up, yet proposal threshold not reached", async function () {
                await time.increaseTo(await quadraticVoting.getCycleProposingDeadline(quadraticVoting.getCurrentCycleHash()));
                const statusThree = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
                expect(statusThree).to.equal(3);
            });

            it("should still allow proposing while in EXTENSION_NEEDED", async function () {
                await expect(quadraticVoting.createProposal("2")).to.not.be.reverted;
                await expect(quadraticVoting.createProposal("3")).to.not.be.reverted;
            });

            it("should be updated to COLLECTING_PROPOSALS (0) after extending cycle", async function () {
                await quadraticVoting.extendCycle(1);
                const statusFour = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
                expect(statusFour).to.equal(0);
            });

            it("should switch to ACTIVE_VOTING (1) after time has passed & critical amount of proposals has been reached", async function () {
                await quadraticVoting.createProposal("4");
                await time.increaseTo(await quadraticVoting.getCycleProposingDeadline(quadraticVoting.getCurrentCycleHash()));
                const statusFive = await quadraticVoting.getCycleStatus(quadraticVoting.getCurrentCycleHash());
                expect(statusFive).to.equal(1);
            });

            it("should allow voting when in ACTIVE_VOTING", async function () {
                await expect(quadraticVoting.castVote(owner.address, "2", 9, true)).to.not.be.reverted;
            });

            it("should not be allowed to initiate cycle while currentCycleStatus not ENDED (2)", async function () {
                await expect(quadraticVoting.createCycle(cycleHash2)).to.be.reverted;
            });

            it("should not be allowed to initiate cycle with hash that's already been used", async function () {
                await time.increaseTo(await quadraticVoting.getCycleVotingDeadline(quadraticVoting.getCurrentCycleHash()));
                await expect(quadraticVoting.createCycle(cycleHash1)).to.be.reverted;
            });

            it("should be possible to initiate next cycle (with new hash) after first iteration", async function () {
                await expect(quadraticVoting.createCycle(cycleHash2)).to.not.be.reverted;
            });
        });

        describe("Proposing", function () {

            it("[initialize fixture]", async function () {
                await loadFixture(deployQuadraticVotingFixture);
                await quadraticVoting.createCycle(cycleHash1);
                await quadraticVoting.createProposal("1");
                await quadraticVoting.createProposal("2");
                await quadraticVoting.createProposal("3");
                await quadraticVoting.createProposal("lsij294rth");
            });

            it("should revert when trying to create the same proposals again", async function () {
                await expect(quadraticVoting.createProposal("3")).to.be.reverted;
                await expect(quadraticVoting.createProposal("lsij294rth")).to.be.reverted;
            });

            it("should revert when trying to propose in ACTIVE_VOTING status", async function () {
                await time.increaseTo(await quadraticVoting.getCycleProposingDeadline(quadraticVoting.getCurrentCycleHash()));
                await expect(quadraticVoting.createProposal("5")).to.be.reverted;
            });
        });

        describe("Voting", function () {

            it("[initialize fixture]", async function () {
                await loadFixture(deployQuadraticVotingFixture);
                await quadraticVoting.createCycle(cycleHash1);
                await quadraticVoting.createProposal("1");
                await quadraticVoting.createProposal("2");
                await quadraticVoting.createProposal("3");
                await quadraticVoting.createProposal("4");
            });

            it("should revert when trying to vote while still in COLLECTING_PROPOSALS", async function () {
                await expect(quadraticVoting.castVote(account1.address,"2", 9, true)).to.be.reverted;
            });

            it("should be possible to vote after ACTIVE_VOTING period began", async function () {
                await time.increaseTo(await quadraticVoting.getCycleProposingDeadline(quadraticVoting.getCurrentCycleHash()));
                // Voting on proposal with hash "1"
                await quadraticVoting.castVote(account1.address, "1", 64, false);    // negative 8
                await quadraticVoting.castVote(account2.address, "1", 25, true);     // positive 5
                await quadraticVoting.castVote(owner.address, "1", 81, true);        // positive 9
                // Voting on proposal with hash "2"
                await quadraticVoting.castVote(account1.address, "2", 36, true);     // positive 6
                await quadraticVoting.castVote(account3.address, "2", 64, false);    // negative 8
                await quadraticVoting.castVote(owner.address, "2", 9, false);        // negative 3
            });

            it("should revert when trying to spend above total 100 credits", async function () {
                await expect(quadraticVoting.castVote(account2.address,"2", 81, true)).to.be.reverted;
            });

            it("should revert when trying to vote more than once on the same proposal", async function () {
                await expect(quadraticVoting.castVote(account3.address,"2", 9, true)).to.be.reverted;
            });

            it("should revert when trying to vote after voting deadline expired", async function () {
                await time.increaseTo(await quadraticVoting.getCycleVotingDeadline(quadraticVoting.getCurrentCycleHash()));
                await expect(quadraticVoting.castVote(account3.address,"3", 9, true)).to.be.reverted;
            });

            it("should return correct values (sum of square roots) when counting votes", async function () {
                let yesVotes :BigNumber;
                let noVotes :BigNumber;
                // Counting votes of proposal with hash "1"
                [ yesVotes, noVotes ] = await quadraticVoting.countVotesForProposal(quadraticVoting.getCurrentCycleHash(), "1");
                expect(yesVotes).to.equal(14);
                expect(noVotes).to.equal(8);
                // Counting votes of proposal with hash "2"
                [ yesVotes, noVotes ] = await quadraticVoting.countVotesForProposal(quadraticVoting.getCurrentCycleHash(), "2");
                expect(yesVotes).to.equal(6);
                expect(noVotes).to.equal(11);
            });
        });

        describe("CycleSettings contract",async function () {
            it("[initialize fixture]", async function () {
                await loadFixture(deployQuadraticVotingFixture);
            });

            it("should set new proposing period correctly", async function () {
                let newPeriodInDays = 25;
                let newPeriodInSeconds = newPeriodInDays * 60 * 60 * 24;
                await (quadraticVoting.setProposingPeriod(newPeriodInDays));
                expect(await quadraticVoting.proposingPeriod()).to.equal(newPeriodInSeconds);
            });

            it("should set new voting period correctly", async function () {
                let newPeriodInDays = 30;
                let newPeriodInSeconds = newPeriodInDays * 60 * 60 * 24;
                await (quadraticVoting.setVotingPeriod(newPeriodInDays));
                expect(await quadraticVoting.votingPeriod()).to.equal(newPeriodInSeconds);
            });

            it("should set new proposal threshold correctly", async function () {
                let newThreshold = 10;
                await (quadraticVoting.setProposalThreshold(newThreshold));
                expect(await quadraticVoting.proposalThreshold()).to.equal(newThreshold);
            });
        });
    });
});
