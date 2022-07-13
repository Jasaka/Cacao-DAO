pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract QuadraticVoting is Ownable, AccessControl {
    using SafeMath for uint256;

    string public symbol;   //TODO: name & symbol necessary?
    string public name;

    mapping(string => uint256) private balances;
    mapping(string => VotingRound) votingRounds;

    event VoteCasted(string userID, string proposalHash, bool voteDirection, uint256 castVotes);
    event ProposalCreated(string votingRoundHash, string proposalHash, uint256 proposalNumber);
    event VotingRoundCreated(string votingRoundHash);

    enum VotingRoundStatus {COLLECTING_PROPOSALS, ACTIVE_VOTING, TALLY, ENDED}

    struct Proposal {
        uint256 proposalNumber;
        uint256 yesVotes;
        uint256 noVotes;
        string proposalHash;
        string[] voters;
        mapping(string => Voter) voterInfo;
    }

    struct Voter {
        bool hasVoted;
        bool voteDirection;
        uint256 castVotes;
    }

    struct VotingRound {
        VotingRoundStatus status;
        uint256 expirationTime;
        uint256 votingCredits;
        mapping(string => Proposal) proposals;
        mapping(uint256 => string) proposalHashes;
        uint256 proposalCount;                      //TODO: calculate votingCredits?
        string votingRoundHash;
        mapping(string => bool) creditSuppliedUsers;
    }


    constructor()  {
        symbol = "CQV";
        name = "CacaoDAO Quadratic Voting";
    }


    function createVotingRound(string _votingRoundHash) external onlyOwner {
        require(_expirationTime > 0, "The voting period cannot be 0");

        VotingRound storage round = votingRounds[_votingRoundHash];
        round.status = VotingRoundStatus.COLLECTING_PROPOSALS;
        round.votingRoundHash = _votingRoundHash;
        round.proposalCount = 0;

        emit VotingRoundCreated(_votingRoundHash);
    }

    function createProposal(string calldata _votingRoundHash, string calldata _proposalHash) external onlyOwner returns (uint256) {    //TODO: why return ProposalCount?
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.COLLECTING_PROPOSALS);   //TODO: check gas fees of require?
        VotingRound storage round = votingRounds[_votingRoundHash];     //TODO: storage/memory. why needed here? research.

        round.proposalHashes[round.proposalCount] = _proposalHash;
        round.proposalCount++;
        //Proposal storage curProposal = proposals[_proposalHash];      //TODO: storage/memory necessary here? research.
        Proposal proposal = round.proposals[_proposalHash];
        proposal.proposalNumber = proposalCount;
        proposal.proposalHash = _proposalHash;

        emit ProposalCreated(_votingRoundHash, _proposalHash, proposalCount);
        return proposalCount;
    }

    // expirationTime in minutes
    function setRoundToActiveVoting (string calldata _votingRoundHash, uint256 calldata _expirationTime, uint256 calldata _votingCredits) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.COLLECTING_PROPOSALS);

        votingRounds[_votingRoundHash].votingCredits = _votingCredits;
        votingRounds[_votingRoundHash].expirationTime = block.timestamp + 60 * _expirationTime * 1 seconds;
        votingRounds[_votingRoundHash].status = VotingRoundStatus.ACTIVE_VOTING;
    }

    // additionalTime in minutes
    function extendVotingRound (string calldata _votingRoundHash, uint256 calldata _additionalTime) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "proposal has expired.");
        require(getVotingRoundExpirationTime(_votingRoundHash) > block.timestamp, "for this proposal, the voting time expired.");

        votingRounds[_votingRoundHash].expirationTime += 60 * _additionalTime * 1 seconds;
    }

    function setRoundToTally(string calldata _votingRoundHash) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "Vote is not in progress");
        require(block.timestamp >= getVotingRoundExpirationTime(_votingRoundHash), "voting period has not expired");

        votingRounds[_votingRoundHash].status = VotingRoundStatus.TALLY;
    }

    function setRoundToEnded(string calldata _votingRoundHash) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.TALLY, "Proposal should be in tally");

        votingRounds[_votingRoundHash].status = VotingRoundStatus.ENDED;
    }


    function getVotingRoundStatus(string calldata _votingRoundHash) public view returns (VotingRoundStatus) {
        return votingRounds[_votingRoundHash].status;
    }

    function getVotingRoundExpirationTime(string calldata _votingRoundHash) public view returns (uint256) {
        return votingRounds[_votingRoundHash].expirationTime;
    }

    //TODO: new function for getting all proposals and calling count votes for each. Output..?
    function countVotes(string calldata _votingRoundHash, string [] calldata _proposalHash) public view returns (uint256, uint256) {
        //no requirements: view function. call anytime, no changes.
        uint256 yesVotes = 0;
        uint256 noVotes = 0;

        string[] memory voters = votingRounds[_votingRoundHash].proposals[_proposalHash].voters;    //TODO: memory why?
        for (uint256 i = 0; i < voters.length; i++) {
            string memory voter = voters[i];                                                        //TODO: memory why?
            bool voteDirection = votingRounds[_votingRoundHash].proposals[_proposalHash].voterInfo[voter].voteDirection;
            uint256 castVotes = votingRounds[_votingRoundHash].proposals[_proposalHash].voterInfo[voter].castVotes;
            if (voteDirection == true) {
                yesVotes += castVotes;
            } else {
                noVotes += castVotes;
            }
        }

        return (yesVotes, noVotes);

    }

    //_voteDirection: true for positive votes, false for negative votes
    function castVote(string calldata _userID, string calldata _votingRoundHash, string calldata _proposalHash, uint256 _numTokens, bool _voteDirection) external {
        if (votingRounds[_votingRoundHash].creditSuppliedUsers[_userID] == false) {
            mint(_votingRoundHash, _userID);
        }
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "proposal has expired.");
        require(!userHasVotedOnProposal(_votingRoundHash, _proposalHash, _userID), "user already voted on this proposal.");
        require(getVotingRoundExpirationTime(_votingRoundHash) > block.timestamp, "for this proposal, the voting time expired.");

        bool a;
        uint256 b;
        (a,b) = balances[_userID].trySub(_numTokens);
        require(a == true, "not enough credits available.");
        balances[_userID] = b;

        uint256 castVotes = sqrt(_numTokens);

        Proposal storage proposal = votingRounds[_votingRoundHash].proposals[_proposalHash];
        proposal.voterInfo[_userID] = Voter({
            hasVoted: true,
            voteDirection: _voteDirection,
            castVotes: castVotes
        });

        proposal.voters.push(_userID);

        emit VoteCasted(_userID, _votingRoundHash, _voteDirection, castVotes);
    }


    function userHasVotedOnProposal(string calldata _votingRoundHash, string calldata _proposalHash, string calldata _userID) internal view returns (bool) {
        return (votingRounds[_votingRoundHash].proposals[_proposalHash].voterInfo[_userID].hasVoted);
    }


    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }


    function mint(string calldata _votingRoundHash, string calldata _userID) internal {
        balances[_userID] = votingRounds[_votingRoundHash].votingCredits;   //balances = global variable. potential remainders get overridden as soon as user votes in different round.
        votingRounds[_votingRoundHash].creditSuppliedUsers[_userID] = true;
    }

}

