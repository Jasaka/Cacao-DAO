pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract QuadraticVoting is Ownable, AccessControl {
    using SafeMath for uint256;

    mapping(address => uint256) private voteCredits;
    mapping(string => VotingRound) public votingRounds;

    event VoteCast(address voter, string proposalHash, bool voteDirection, uint256 castVotes);
    event ProposalCreated(string votingRoundHash, string proposalHash, uint256 proposalNumber); //proposalNumber?!
    event VotingRoundCreated(string votingRoundHash);

    //Iteration2: nicht setzbar, nur abrufbar, siehe Governor
    enum VotingRoundStatus {UNINITIATED, COLLECTING_PROPOSALS, ACTIVE_VOTING, TALLY, ENDED}

    struct Proposal {
        uint256 proposalNumber;
        uint256 yesVotes;
        uint256 noVotes;
        string proposalHash;
        address[] voters;
        mapping(address => Voter) voterInfo;
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
        // TODO: later calculate votingCredits automatically based on proposalCount?
        mapping(string => Proposal) proposals;

        uint256 proposalCount;
        mapping(uint256 => string) proposalHashes;
        mapping(address => bool) creditSuppliedUsers;
    }

    //Iteration2: internal. automatisch, wenn erstes proposal erstellt wird
    //Iteration2: zeit automatisch draufrechnen, nicht setzen (andere funktion)
    function createVotingRound(string calldata _votingRoundHash) external onlyOwner {
        VotingRound storage round = votingRounds[_votingRoundHash];
        round.status = VotingRoundStatus.COLLECTING_PROPOSALS;
        round.votingRoundHash = _votingRoundHash;
        round.proposalCount = 0;

        emit VotingRoundCreated(_votingRoundHash);
    }

    //Iteration2: automatisch der aktuellen Voting round zufügen, wenn noch collecting. sonst neue starten.
    function createProposal(string calldata _votingRoundHash, string calldata _proposalHash) external onlyOwner returns (uint256) {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.COLLECTING_PROPOSALS, "Proposal collection phase has been closed or was not yet initiated"); //TODO: check gas fees of require?
        require(keccak256(bytes(votingRounds[_votingRoundHash].proposals[_proposalHash].proposalHash)) != keccak256(bytes(_proposalHash)), "Proposal already in existence");

        votingRounds[_votingRoundHash].proposalHashes[votingRounds[_votingRoundHash].proposalCount] = _proposalHash;
        votingRounds[_votingRoundHash].proposalCount++;

        Proposal storage proposal = votingRounds[_votingRoundHash].proposals[_proposalHash];     //TODO: storage/memory - necessary here? research.
        proposal.proposalNumber = votingRounds[_votingRoundHash].proposalCount;
        proposal.proposalHash = _proposalHash;

        emit ProposalCreated(_votingRoundHash, _proposalHash, proposal.proposalNumber);
        return proposal.proposalNumber;
    }

    //Iteration2: delete
    // expirationTime in minutes
    function setRoundToActiveVoting (string calldata _votingRoundHash, uint256 _expirationTime, uint256 _votingCredits) external onlyOwner {
        require(_expirationTime > 0, "Voting period cannot be 0");
        require(_votingCredits > 0, "Voting credits cannot be 0");
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.COLLECTING_PROPOSALS);

        votingRounds[_votingRoundHash].votingCredits = _votingCredits;
        votingRounds[_votingRoundHash].expirationTime = block.timestamp + 60 * _expirationTime * 1 seconds;
        votingRounds[_votingRoundHash].status = VotingRoundStatus.ACTIVE_VOTING;
    }

    //Iteration2: automatisiert, wenn nicht genügend proposals für voting da sind. check automatisiert vom Frontend?
    // additionalTime in minutes
    function extendVotingRound (string calldata _votingRoundHash, uint256 _additionalTime) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "proposal has not yet started or expired");
        require(getVotingRoundExpirationTime(_votingRoundHash) > block.timestamp, "voting time already expired");

        votingRounds[_votingRoundHash].expirationTime += 60 * _additionalTime * 1 seconds;
    }
    //Iteration2: delete
    function setRoundToTally(string calldata _votingRoundHash) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "Vote is not in progress");
        require(block.timestamp >= getVotingRoundExpirationTime(_votingRoundHash), "voting period has not expired");

        votingRounds[_votingRoundHash].status = VotingRoundStatus.TALLY;
    }
    //Iteration2: delete
    function setRoundToEnded(string calldata _votingRoundHash) external onlyOwner {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.TALLY, "Proposal should be in tally");

        votingRounds[_votingRoundHash].status = VotingRoundStatus.ENDED;
    }

    //Iteration2: logik für automatische zuweisung, je nach expirationsdauer
    function getVotingRoundStatus(string calldata _votingRoundHash) public view returns (VotingRoundStatus) {
        return votingRounds[_votingRoundHash].status;
    }

    function getVotingRoundExpirationTime(string calldata _votingRoundHash) public view returns (uint256) {
        return votingRounds[_votingRoundHash].expirationTime;
    }

    //reason f. no requirements -> call anytime, e.g. statistical analysis
    function countVotesForProposal(string calldata _votingRoundHash, string calldata _proposalHash) public view returns (uint256, uint256) {
        uint256 yesVotes = 0;
        uint256 noVotes = 0;

        address[] memory voters = votingRounds[_votingRoundHash].proposals[_proposalHash].voters;
        for (uint256 i = 0; i < voters.length; i++) {
            address voter = voters[i];
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

    //Iteration2: adopt
    //TODO: Achtung: nur einmal voten möglich --> UI Hinweis. Warum nur einmal möglich? 3. Require. Umstellen nicht möglich. Könnte irgendwie..?
    //_voteDirection: true for positive votes, false for negative votes
    function castVote(string calldata _votingRoundHash, string calldata _proposalHash, uint256 _numTokens, bool _voteDirection) external {
        require(getVotingRoundStatus(_votingRoundHash) == VotingRoundStatus.ACTIVE_VOTING, "proposal not yet started or expired");
        require(getVotingRoundExpirationTime(_votingRoundHash) > block.timestamp, "voting time expired for this proposal");
        require(!userHasVotedOnProposal(_votingRoundHash, _proposalHash), "user already voted on this proposal"); //TODO: necessary?

        if (votingRounds[_votingRoundHash].creditSuppliedUsers[msg.sender] == false) {
            mint(_votingRoundHash);
        }

        bool a;
        uint256 b;
        (a,b) = voteCredits[msg.sender].trySub(_numTokens);
        require(a == true, "not enough credits available");
        voteCredits[msg.sender] = b;

        uint256 castVotes = sqrt(_numTokens);

        Proposal storage proposal = votingRounds[_votingRoundHash].proposals[_proposalHash];
        proposal.voterInfo[msg.sender] = Voter({
            hasVoted: true,
            voteDirection: _voteDirection,
            castVotes: castVotes
        });

        proposal.voters.push(msg.sender);

        emit VoteCast(msg.sender, _votingRoundHash, _voteDirection, castVotes);
    }

    //TODO: necessary?
    function userHasVotedOnProposal(string calldata _votingRoundHash, string calldata _proposalHash) internal view returns (bool) {
        return (votingRounds[_votingRoundHash].proposals[_proposalHash].voterInfo[msg.sender].hasVoted);
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function mint(string calldata _votingRoundHash) internal {
        voteCredits[msg.sender] = votingRounds[_votingRoundHash].votingCredits;   //balances = global variable. potential remainders get overridden as soon as user votes in different round.
        votingRounds[_votingRoundHash].creditSuppliedUsers[msg.sender] = true;
    }

    //only relevant if already voted in current round. if voting only possible once, not really useful.
    function getUserCredits () external view returns (uint256) {
        return voteCredits[msg.sender];
    }
}

