pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title QVVoting
 * @dev the manager for proposals / votes
 */
contract QuadraticVoting is Ownable, AccessControl {   //TODO: Ownable/AccessControl (-> onlyOwner)
    using SafeMath for uint256;

    string public symbol;                       //TODO: name & symbol necessary?
    string public name;

    mapping(string => uint256) private balances;

    event VoteCasted(string userID, string proposalHash, bool voteDirection, uint256 castVotes);

    event ProposalCreated(
        uint256 proposalNumber,
        string proposalHash,
        uint256 votingTimeInHours
    );

    enum ProposalStatus {IN_PROGRESS, TALLY, ENDED}

    struct Proposal {
        ProposalStatus status;
        uint256 proposalNumber;
        uint256 yesVotes;
        uint256 noVotes;
        string proposalHash;
        string[] voters;
        uint256 expirationTime;
        mapping(string => Voter) voterInfo;
    }

    struct Voter {
        bool hasVoted;
        bool voteDirection;
        uint256 castVotes;
    }

    uint256 public proposalCount;
    mapping(uint256 => string) public proposalHashes; //TODO: users auch so zugreifbar machen?
    mapping(string => Proposal) public proposals;

    //userIDs:          Identifiers of all users entitled to vote
    //votingCredits:    Number of credits each user receives
    constructor(string [] memory _userIDs, uint256 _votingCredits)  {
        mint(_userIDs, _votingCredits);
        symbol = "QVV";     //TODO: necessary?
        name = "QV Voting";
    }

    // voteExpirationTime in minutes
    function createProposal(string calldata _proposalHash, uint256 _voteExpirationTime) external onlyOwner returns (uint256) {    //TODO: why return ProposalCount?
        require(_voteExpirationTime > 0, "The voting period cannot be 0");
        proposalCount++;

        proposalHashes[proposalCount - 1] = _proposalHash;
        Proposal storage curProposal = proposals[_proposalHash];
        curProposal.proposalNumber = proposalCount;
        curProposal.status = ProposalStatus.IN_PROGRESS;
        curProposal.expirationTime = block.timestamp + 60 * _voteExpirationTime * 1 seconds;
        curProposal.proposalHash = _proposalHash;

        emit ProposalCreated(
            proposalCount,
            _proposalHash,
            _voteExpirationTime
        );
        return proposalCount;
    }


    function setProposalToTally(string calldata _proposalHash) external validProposal(_proposalHash) onlyOwner {
        require(proposals[_proposalHash].status == ProposalStatus.IN_PROGRESS, "Vote is not in progress");
        require(block.timestamp >= getProposalExpirationTime(_proposalHash), "voting period has not expired");

        proposals[_proposalHash].status = ProposalStatus.TALLY;
    }

    function setProposalToEnded(string calldata _proposalHash) external validProposal(_proposalHash) onlyOwner {
        require(proposals[_proposalHash].status == ProposalStatus.TALLY, "Proposal should be in tally");
        require(block.timestamp >= getProposalExpirationTime(_proposalHash), "voting period has not expired");
        
        proposals[_proposalHash].status = ProposalStatus.ENDED;
    }


    function getProposalStatus(string calldata _proposalHash) public view validProposal(_proposalHash) returns (ProposalStatus) {
        return proposals[_proposalHash].status;
    }

    function getProposalExpirationTime(string calldata _proposalHash) public view validProposal(_proposalHash) returns (uint256) {
        return proposals[_proposalHash].expirationTime;
    }


    function countVotes(string calldata _proposalHash) public view returns (uint256, uint256) {
        uint256 yesVotes = 0;
        uint256 noVotes = 0;

        string[] memory voters = proposals[_proposalHash].voters;
        for (uint256 i = 0; i < voters.length; i++) {
            string memory voter = voters[i];
            bool voteDirection = proposals[_proposalHash].voterInfo[voter].voteDirection;
            uint256 castVotes = proposals[_proposalHash].voterInfo[voter].castVotes;
            if (voteDirection == true) {
                yesVotes += castVotes;
            } else {
                noVotes += castVotes;
            }
        }

        return (yesVotes, noVotes);

    }

    //TODO: function iterate through all proposals? warte. notiz war für obere, ab hier dachte ich untere: --> check here if entitled to vote! --> also check if total votes <= than balance


    //_voteDirection: true for positive votes, false for negative votes
    function castVote(string calldata _userID, string calldata _proposalHash, uint256 numTokens, bool _voteDirection) external validProposal(_proposalHash) {
        require(entitledToVote(_userID), "user has no voting credits.");
        require(getProposalStatus(_proposalHash) == ProposalStatus.IN_PROGRESS, "proposal has expired.");
        require(getProposalStatus(_proposalHash) == ProposalStatus.IN_PROGRESS, "proposal has expired.");
        require(!userHasVoted(_proposalHash, _userID), "user already voted on this proposal.");
        require(getProposalExpirationTime(_proposalHash) > block.timestamp, "for this proposal, the voting time expired.");

        bool a;
        uint256 b;
        (a,b) = balances[_userID].trySub(numTokens);
        require(a == true, "not enough credits available.");
        balances[_userID] = b;
        //balances[_userID] = balances[_userID].sub(numTokens); //original

        uint256 castVotes = sqrt(numTokens);

        Proposal storage curProposal = proposals[_proposalHash];

        curProposal.voterInfo[_userID] = Voter({
        hasVoted: true,
        voteDirection: _voteDirection,
        castVotes: castVotes
        });

        curProposal.voters.push(_userID);

        emit VoteCasted(_userID, _proposalHash, _voteDirection, castVotes);
    }

    function entitledToVote (string calldata _userID) public view returns (bool){
        return(balances[_userID] > 0);
    }

    function userHasVoted(string calldata _proposalHash, string calldata _userID) internal view validProposal(_proposalHash) returns (bool) {
        return (proposals[_proposalHash].voterInfo[_userID].hasVoted);
    }

    modifier validProposal(string calldata _proposalHash) {
        uint256 proposalNumber = proposals[_proposalHash].proposalNumber;
        require(proposalNumber > 0 && proposalNumber <= proposalCount, "Not a valid Proposal Id");
        _;
    }


    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function mint(string [] memory userIDs, uint256 votingCredits) public onlyOwner {
        for (uint256 i = 0; i < userIDs.length; i++) {
            string memory userID = userIDs[i];
            balances[userID] = votingCredits;
        }
    }

}

