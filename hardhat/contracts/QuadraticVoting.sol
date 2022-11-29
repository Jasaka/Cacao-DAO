pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract QuadraticVoting is Ownable {
    using SafeMath for uint256;     //TODO: add safe math

    mapping(address => uint256) private voteCredits;
    mapping(string => Cycle) public cycles;

    event VoteCast(address voter, string proposalHash, bool voteDirection, uint256 castVotes);
    event ProposalCreated(string cycleHash, string proposalHash, uint256 proposalNumber); //TODO: proposalNumber necessary?!
    event CycleCreated(string cycleHash);

    //Iteration2: nicht setzbar, nur abrufbar, siehe Governor
    enum CycleStatus {UNINITIATED, COLLECTING_PROPOSALS, ACTIVE_VOTING, TALLY, ENDED}


    struct Cycle {
        string cycleHash;
        uint256 proposingDeadline;
        uint256 votingCredits;      // TODO: calculate automatically based on proposalCount?

        mapping(string => Proposal) proposals;
        uint256 proposalCount;
        mapping(uint256 => string) proposalHashes;  //TODO: don't need  //for iteration purposes. Array?
        mapping(address => bool) creditSuppliedUsers;
    }

    struct Proposal {
        string proposalHash;
        uint256 proposalNumber;
        uint256 yesVotes;
        uint256 noVotes;
        address[] voters;
        mapping(address => Voter) voterInfo;
    }

    struct Voter {
        bool hasVoted;
        bool voteDirection;
        uint256 castVotes;
    }

    //uint256 proposingDeadline;
    uint256 votingDeadline; // TODO: Global or within struct

    string currentCycleHash;
    string previousCycleHash;

    //Iteration2: internal. automatisch, wenn erstes proposal erstellt wird
    //Iteration2: zeit automatisch draufrechnen, nicht setzen (andere funktion)
    function createCycle(string memory _proposalHash) internal {
        bytes32 cycleHash = keccak256(bytes(_proposalHash));
        Cycle storage round = cycles["cycleHash"];      //TODO: string to bytes32
        round.cycleHash = "cycleHash";                  //TODO: same
        round.proposingDeadline = block.number.add(50400 * 2);    // 2 weeks (with 12 sec/block)
        round.proposalCount = 0;    // TODO: auf 1 oder 0 setzen? im createProposal dann eine if else?

        emit CycleCreated("cycleHash");
    }

    function getCycleStatus(string calldata _cycleHash) public view returns (CycleStatus) {
        //if (cycles[_cycleHash].proposingDeadline <= 0)       //TODO: implement
            return CycleStatus.ACTIVE_VOTING;
    }

    /*
    function state(uint256 proposalId) public view virtual override returns (ProposalState) {
        ProposalCore storage proposal = _proposals[proposalId];

        if (proposal.executed) { return ProposalState.Executed; }
        if (proposal.canceled) { return ProposalState.Canceled; }
        uint256 snapshot = proposalSnapshot(proposalId);
        if (snapshot == 0) { revert("Governor: unknown proposal id"); }
        if (snapshot >= block.number) { return ProposalState.Pending; }
        uint256 deadline = proposalDeadline(proposalId);
        if (deadline >= block.number) { return ProposalState.Active; }
        if (_quorumReached(proposalId) && _voteSucceeded(proposalId)) { return ProposalState.Succeeded; }
        else { return ProposalState.Defeated; }
    }
    */


    //Iteration2: automatisch der aktuellen Voting round zufügen, wenn noch collecting. sonst neue starten.
    function createProposal(string calldata _cycleHash, string calldata _proposalHash) external onlyOwner returns (uint256) {
        require(getCycleStatus(_cycleHash) == CycleStatus.COLLECTING_PROPOSALS, "Proposal collection phase has been closed or was not yet initiated"); //TODO: check gas fees of require?
        require(keccak256(bytes(cycles[_cycleHash].proposals[_proposalHash].proposalHash)) != keccak256(bytes(_proposalHash)), "Proposal already in existence");

        cycles[_cycleHash].proposalHashes[cycles[_cycleHash].proposalCount] = _proposalHash;
        cycles[_cycleHash].proposalCount++;

        Proposal storage proposal = cycles[_cycleHash].proposals[_proposalHash];     //TODO: storage/memory - necessary here? research.
        proposal.proposalNumber = cycles[_cycleHash].proposalCount;
        proposal.proposalHash = _proposalHash;

        emit ProposalCreated(_cycleHash, _proposalHash, proposal.proposalNumber);
        return proposal.proposalNumber;
    }


    //Iteration2: automatisiert, wenn nicht genügend proposals für voting da sind. check automatisiert vom Frontend?
    // additionalTime in minutes
    function extendCycle(string calldata _cycleHash, uint256 _additionalTime) external onlyOwner {
        require(getCycleStatus(_cycleHash) == CycleStatus.ACTIVE_VOTING, "proposal has not yet started or expired");
        require(getCycleProposingDeadline(_cycleHash) > block.timestamp, "voting time already expired");

        cycles[_cycleHash].proposingDeadline += 60 * _additionalTime * 1 seconds;
    }

    /*
    //Iteration2: delete
    function setRoundToTally(string calldata _cycleHash) external onlyOwner {
        require(getCycleStatus(_cycleHash) == CycleStatus.ACTIVE_VOTING, "Vote is not in progress");
        require(block.timestamp >= getCycleExpirationTime(_cycleHash), "voting period has not expired");

        cycles[_cycleHash].status = CycleStatus.TALLY;
    }

    //Iteration2: delete
    function setRoundToEnded(string calldata _cycleHash) external onlyOwner {
        require(getCycleStatus(_cycleHash) == CycleStatus.TALLY, "Proposal should be in tally");

        cycles[_cycleHash].status = CycleStatus.ENDED;
    }
    */

    function getCycleProposingDeadline(string calldata _cycleHash) public view returns (uint256) {
        return cycles[_cycleHash].proposingDeadline;
    }
    function getCycleVotingDeadline(string calldata _cycleHash) public view returns (uint256) {
        return cycles[_cycleHash].proposingDeadline;
    }

    //reason f. no requirements -> call anytime, e.g. statistical analysis
    function countVotesForProposal(string calldata _cycleHash, string calldata _proposalHash) public view returns (uint256, uint256) {
        uint256 yesVotes = 0;
        uint256 noVotes = 0;

        address[] memory voters = cycles[_cycleHash].proposals[_proposalHash].voters;
        for (uint256 i = 0; i < voters.length; i++) {
            address voter = voters[i];
            bool voteDirection = cycles[_cycleHash].proposals[_proposalHash].voterInfo[voter].voteDirection;
            uint256 castVotes = cycles[_cycleHash].proposals[_proposalHash].voterInfo[voter].castVotes;
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
    function castVote(string calldata _cycleHash, string calldata _proposalHash, uint256 _numTokens, bool _voteDirection) external {
        require(getCycleStatus(_cycleHash) == CycleStatus.ACTIVE_VOTING, "proposal not yet started or expired");
        require(getCycleProposingDeadline(_cycleHash) > block.timestamp, "voting time expired for this proposal");
        require(!userHasVotedOnProposal(_cycleHash, _proposalHash), "user already voted on this proposal"); //TODO: necessary?

        if (cycles[_cycleHash].creditSuppliedUsers[msg.sender] == false) {
            mint(_cycleHash);
        }

        bool a;
        uint256 b;
        (a,b) = voteCredits[msg.sender].trySub(_numTokens);
        require(a == true, "not enough credits available");
        voteCredits[msg.sender] = b;

        uint256 castVotes = sqrt(_numTokens);

        Proposal storage proposal = cycles[_cycleHash].proposals[_proposalHash];
        proposal.voterInfo[msg.sender] = Voter({
            hasVoted: true,
            voteDirection: _voteDirection,
            castVotes: castVotes
        });

        proposal.voters.push(msg.sender);

        emit VoteCast(msg.sender, _cycleHash, _voteDirection, castVotes);
    }

    //TODO: necessary?
    function userHasVotedOnProposal(string calldata _cycleHash, string calldata _proposalHash) internal view returns (bool) {
        return (cycles[_cycleHash].proposals[_proposalHash].voterInfo[msg.sender].hasVoted);
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function mint(string calldata _cycleHash) internal {
        //voteCredits = global variable. potential remainders get overridden as soon as user votes in different round.
        voteCredits[msg.sender] = cycles[_cycleHash].votingCredits;
        cycles[_cycleHash].creditSuppliedUsers[msg.sender] = true;
    }

    //only relevant if already voted in current round. if voting only possible once, not really useful.
    function getUserCredits () external view returns (uint256) {
        return voteCredits[msg.sender];
    }
}

