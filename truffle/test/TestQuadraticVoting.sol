pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "../contracts/ethereum/QuadraticVoting.sol";

contract TestQuadraticVoting {

    QuadraticVoting public qv;
    string votingRoundHash = "0x34k343f4";
    string [] proposalHashes = ["0x5467k54j", "0x2l5k4kl5","0x2l54k56j", "0x486t976r"];
    uint256 expirationTime = 100;
    uint256 votingCredits = 100;
    string [] userIDs = ["001", "002","003", "004"];

    // Run before every test function
    function beforeEach() public {
        qv = new QuadraticVoting();
        qv.createVotingRound(votingRoundHash);
        qv.createProposal(votingRoundHash, proposalHashes[0]);
        qv.createProposal(votingRoundHash,proposalHashes[1]);
        qv.createProposal(votingRoundHash,proposalHashes[2]);
    }


    function setActiveVotingForTests () public {
        qv.setRoundToActiveVoting(votingRoundHash, expirationTime, votingCredits);
    }

    function usersVote() public {
        qv.castVote(userIDs[0], votingRoundHash, proposalHashes[1], 64, false); //vote on proposal 1        -8
        qv.castVote(userIDs[1], votingRoundHash, proposalHashes[1], 16, false); //vote on proposal 1        -4
        qv.castVote(userIDs[2], votingRoundHash, proposalHashes[1], 100, true); //vote on proposal 1       +10
        //                                                                                               = +10 -12
    }

    // TODO: Error: Too many function calls; works fine with fewer; see above. Why? - "before all" hook: prepare suite for "testCreateProposals"
    // TODO: cont.: Same when activating revert tests together with normal tests. Too much? Why?
    /*function usersVote () public {
        qv.castVote(userIDs[0], votingRoundHash, proposalHashes[0], 25, true);  //vote on proposal 0        +5
        qv.castVote(userIDs[1], votingRoundHash, proposalHashes[0], 16, true);  //vote on proposal 0        +4
        qv.castVote(userIDs[2], votingRoundHash, proposalHashes[0],  0, true);  //vote on proposal 0        +0
        //                                                                                               =  +9  -0
        qv.castVote(userIDs[0], votingRoundHash, proposalHashes[1], 64, false); //vote on proposal 1        -8
        qv.castVote(userIDs[1], votingRoundHash, proposalHashes[1], 16, false); //vote on proposal 1        -4
        qv.castVote(userIDs[2], votingRoundHash, proposalHashes[1], 100, true); //vote on proposal 1       +10
        //                                                                                               = +10 -12
        qv.castVote(userIDs[0], votingRoundHash, proposalHashes[2], 1, true);   //vote on proposal 2        +1
        qv.castVote(userIDs[1], votingRoundHash, proposalHashes[2], 1, false);   //vote on proposal 2       -1
        qv.castVote(userIDs[2], votingRoundHash, proposalHashes[2], 0, false);   //vote on proposal 2       -0
        //                                                                                               =  +1  -1
    }*/


    /* //Revert Tests - should cause revert.
    function testCreateProposalBeforeVotingRound () public {
        uint256 result = qv.createProposal(votingRoundHash,proposalHashes[1]);
        Assert.equal(result, 1, "Same hash should only create one proposal");
    }

    function testCreateDoubleProposal () public {
        qv.createProposal(votingRoundHash, proposalHashes[0]);
        qv.createProposal(votingRoundHash,proposalHashes[0]);

    }

    function testCastVoteBeforeActiveVotingRound () public {
        qv.castVote(userIDs[2], votingRoundHash, proposalHashes[2], 0, false);
    }

    function testCastVoteMoreCreditsThanBalance() public {
        qv.castVote(userIDs[1], votingRoundHash, proposalHashes[0], 100, true);
        qv.castVote(userIDs[1], votingRoundHash, proposalHashes[1], 1, false);
    }

    function testCastVoteTwiceOnSameProposal() public {
        qv.castVote(userIDs[2], votingRoundHash, proposalHashes[0], 25, true);
        qv.castVote(userIDs[2], votingRoundHash, proposalHashes[0], 1, true);
    }
    // */

    function testCreateProposals () public {
        uint256 result = qv.createProposal(votingRoundHash,proposalHashes[3]);
        Assert.equal(result, 4, "Number of proposal count not correct");
    }

    function testSetRoundToActiveVoting () public {
        qv.setRoundToActiveVoting(votingRoundHash, expirationTime, votingCredits);
        uint256 time = qv.getVotingRoundExpirationTime(votingRoundHash);
        Assert.equal(time - block.timestamp, expirationTime*60, "Expiration time not correct");    //comparing seconds
    }

    function testCountVotesForProposalBeforeVoting() public {
        uint256 a; uint256 b;
        (a,b) = qv.countVotesForProposal(votingRoundHash, proposalHashes[0]);
        Assert.equal(a, 0, "positive vote count not correct");
        Assert.equal(b, 0, "negative vote count not correct");
        (a,b) = qv.countVotesForProposal(votingRoundHash, proposalHashes[1]);
        Assert.equal(a, 0, "positive vote count not correct");
        Assert.equal(b, 0, "negative vote count not correct");
    }

    function testCastVoteAndCheckCreditBalance() public {
        setActiveVotingForTests();
        uint256 creditScore = qv.getUserCredits(userIDs[0]);
        Assert.equal(creditScore, 0, "User shouldn't have credits");
        qv.castVote(userIDs[0], votingRoundHash, proposalHashes[0], 25, true);  //vote on proposal 0
        creditScore = qv.getUserCredits(userIDs[0]);
        Assert.equal(creditScore, 75, "Credit count not correct");
        qv.castVote(userIDs[0], votingRoundHash, proposalHashes[1], 64, false); //vote on proposal 1
        creditScore = qv.getUserCredits(userIDs[0]);
        Assert.equal(creditScore, 11, "Credit count not correct");
        qv.castVote(userIDs[0], votingRoundHash, proposalHashes[2], 1, true);   //vote on proposal 2
        creditScore = qv.getUserCredits(userIDs[0]);
        Assert.equal(creditScore, 10, "Credit count not correct");
    }

    function testCountVotesForProposalAfterVoting() public {
        setActiveVotingForTests();
        usersVote();
        uint256 a; uint256 b;
        (a,b) = qv.countVotesForProposal(votingRoundHash, proposalHashes[1]);
        Assert.equal(a, 10, "positive vote count not correct");
        Assert.equal(b, 12, "negative vote count not correct");
    }

    function testExtendVotingRound() public {
        setActiveVotingForTests();
        usersVote();
        uint256 additionalTime = 100;
        qv.extendVotingRound(votingRoundHash, additionalTime);
        uint256 time = qv.getVotingRoundExpirationTime(votingRoundHash);
        Assert.equal(time - block.timestamp, (expirationTime+additionalTime)*60, "Expiration time not correct");    //comparing seconds
    }

}