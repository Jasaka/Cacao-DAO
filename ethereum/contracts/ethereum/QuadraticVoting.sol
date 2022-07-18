pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract QuadraticVoting is Ownable, AccessControl {
    using SafeMath for uint256;

    string public symbol;   //TODO: name & symbol - necessary?
    string public name;

    mapping(string => uint256) private balances;
    mapping(string => VotingRound) public votingRounds;

    event VoteCasted(string userID, string proposalHash, bool voteDirection, uint256 castVotes);
    event ProposalCreated(string votingRoundHash, string proposalHash, uint256 proposalNumber);
    event VotingRoundCreated(string votingRoundHash);

    enum VotingRoundStatus {UNINITIATED, COLLECTING_PROPOSALS, ACTIVE_VOTING, TALLY, ENDED}

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
        string votingRoundHash;
        VotingRoundStatus status;
        uint256 expirationTime;
        uint256 votingCredits;
        mapping(string => Proposal) proposals;

        uint256 proposalCount;                      //TODO: later calculate votingCredits automatically?
        mapping(uint256 => string) proposalHashes;
        mapping(string => bool) creditSuppliedUsers;
    }

    constructor()  {
        symbol = "CQV";
        name = "CacaoDAO Quadratic Voting";
    }


    function createVotingRound(string calldata _votingRoundHash) external onlyOwner {
        VotingRound storage round = votingRounds[_votingRoundHash];
        round.status = VotingRoundStatus.COLLECTING_PROPOSALS;
        round.votingRoundHash = _votingRoundHash;
        round.proposalCount = 0;

        emit VotingRoundCreated(_votingRoundHash);
    }

    function createProposal(string calldata _votingRoundHash, string calldata _proposalHash) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.COLLECTING_PROPOSALS, "Proposal collection phase has been closed or was not yet initiated"); //TODO: check gas fees of require?
        require(keccak256(bytes(votingRounds[_votingRoundHash].proposals[_proposalHash].proposalHash)) != keccak256(bytes(_proposalHash)), "Proposal already in existance");

        votingRounds[_votingRoundHash].proposalHashes[votingRounds[_votingRoundHash].proposalCount] = _proposalHash;
        votingRounds[_votingRoundHash].proposalCount++;

        Proposal storage proposal = votingRounds[_votingRoundHash].proposals[_proposalHash];     //TODO: storage/memory - necessary here? research.
        proposal.proposalNumber = votingRounds[_votingRoundHash].proposalCount;
        proposal.proposalHash = _proposalHash;

        emit ProposalCreated(_votingRoundHash, _proposalHash, proposal.proposalNumber);
    }

    // expirationTime in minutes
    function setRoundToActiveVoting (string calldata _votingRoundHash, uint256 _expirationTime, uint256 _votingCredits) external onlyOwner {
        require(_expirationTime > 0, "Voting period cannot be 0");
        require(_votingCredits > 0, "Voting credits cannot be 0");
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.COLLECTING_PROPOSALS);

        votingRounds[_votingRoundHash].votingCredits = _votingCredits;
        votingRounds[_votingRoundHash].expirationTime = block.timestamp + 60 * _expirationTime * 1 seconds;
        votingRounds[_votingRoundHash].status = VotingRoundStatus.ACTIVE_VOTING;
    }

    // additionalTime in minutes
    function extendVotingRound (string calldata _votingRoundHash, uint256 _additionalTime) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "proposal has not yet started or expired");
        require(getVotingRoundExpirationTime(_votingRoundHash) > block.timestamp, "voting time already expired");

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

    //TODO: new function for getting all proposals and calling count votes for each. Output? Tuple array?
    //no requirements -> view function. function call anytime, e.g. statistical analysis.
    function countVotesForProposal(string calldata _votingRoundHash, string calldata _proposalHash) public view returns (uint256, uint256) {
        uint256 yesVotes = 0;
        uint256 noVotes = 0;

        string[] memory voters = votingRounds[_votingRoundHash].proposals[_proposalHash].voters;    //TODO: why memory? -> research
        for (uint256 i = 0; i < voters.length; i++) {
            string memory voter = voters[i];                                                        //TODO: why memory? -> research
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
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "proposal has not yet started or expired");
        require(!userHasVotedOnProposal(_votingRoundHash, _proposalHash, _userID), "user already voted on this proposal");
        require(getVotingRoundExpirationTime(_votingRoundHash) > block.timestamp, "for this proposal, the voting time expired");

        bool a;
        uint256 b;
        (a,b) = balances[_userID].trySub(_numTokens);
        require(a == true, "not enough credits available");
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

    function getUserCredits (string calldata _userID) external view returns (uint256) {
        return balances[_userID];
    }

}

