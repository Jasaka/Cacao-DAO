pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./CycleSettings.sol";


contract QuadraticVoting is CycleSettings {
    using SafeMath for uint256;

    bytes32 currentCycleHash;

    mapping(address => uint256) private voteCredits;
    mapping(bytes32 => Cycle) public cycles;

    event VoteCast(address voter, string proposalHash, bool voteDirection, uint256 castVotes);
    event ProposalCreated(bytes32 cycleHash, string proposalHash);
    event CycleCreated(bytes32 cycleHash);
    event ExtendedProposalPeriod(uint256 additionalDays);

    enum CycleStatus {COLLECTING_PROPOSALS, ACTIVE_VOTING, ENDED, EXTENSION_NEEDED}

    struct Cycle {
        bytes32 cycleHash;
        uint256 proposingDeadline;
        uint256 proposalCount;
        mapping(string => Proposal) proposals;
        mapping(address => bool) creditSuppliedUsers;
        uint256 votingCredits;
    }

    struct Proposal {
        string proposalHash;
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

    constructor(uint256 initialProposingPeriod, uint256 initialVotingPeriod, uint256 initialProposalThreshold)
        CycleSettings(initialProposingPeriod, initialVotingPeriod, initialProposalThreshold)
    {}

    function createCycle(bytes32 _cycleHash) external onlyOwner {
        require(getCycleStatus(currentCycleHash) == CycleStatus.ENDED, "Current cycle needs to end before new cycle can be created");
        require(cycles[_cycleHash].cycleHash == "", "Given cycle hash has already been used");
        currentCycleHash = _cycleHash;
        Cycle storage cycle = cycles[currentCycleHash];
        cycle.cycleHash = _cycleHash;
        cycle.proposingDeadline = block.timestamp + proposingPeriod();
        cycle.votingCredits = 100;

        emit CycleCreated("cycleHash");
    }

    function getCycleStatus(bytes32 _cycleHash) public view returns (CycleStatus) {
        if (block.timestamp < cycles[_cycleHash].proposingDeadline)
            return CycleStatus.COLLECTING_PROPOSALS;
        if (cycles[_cycleHash].proposalCount != 0 && cycles[_cycleHash].proposalCount < proposalThreshold()) {
            return CycleStatus.EXTENSION_NEEDED;
        }
        if (block.timestamp < cycles[_cycleHash].proposingDeadline + votingPeriod()){
            return CycleStatus.ACTIVE_VOTING;
        }
        return CycleStatus.ENDED;
    }

    function getCycleProposingDeadline(bytes32 _cycleHash) public view returns (uint256) {
        return cycles[_cycleHash].proposingDeadline;
    }

    function getCycleVotingDeadline(bytes32 _cycleHash) public view returns (uint256) {
        return cycles[_cycleHash].proposingDeadline + votingPeriod();
    }

    function extendCycle(uint256 _additionalDays) external onlyOwner {
        require(getCycleStatus(currentCycleHash) == CycleStatus.EXTENSION_NEEDED, "No extension needed");
        cycles[currentCycleHash].proposingDeadline += _additionalDays * 1 days;

        emit ExtendedProposalPeriod(_additionalDays);
    }


    function createProposal(string calldata _proposalHash) external onlyOwner {
        require(getCycleStatus(currentCycleHash) == CycleStatus.COLLECTING_PROPOSALS || getCycleStatus(currentCycleHash) == CycleStatus.EXTENSION_NEEDED, "Proposal collection phase not active");
        require(keccak256(bytes(cycles[currentCycleHash].proposals[_proposalHash].proposalHash)) != keccak256(bytes(_proposalHash)), "Proposal already in existence");

        Proposal storage proposal = cycles[currentCycleHash].proposals[_proposalHash];
        proposal.proposalHash = _proposalHash;

        cycles[currentCycleHash].proposalCount++;

        emit ProposalCreated(currentCycleHash, _proposalHash);
    }


    /**
     * Voting on a particular proposal only possible once.
     * _voteDirection bool: true for positive votes, false for negative votes
     */
    function castVote(address _voterAddress, string calldata _proposalHash, uint256 _numTokens, bool _voteDirection) external {
        require(getCycleStatus(currentCycleHash) == CycleStatus.ACTIVE_VOTING, "voting period not yet started or expired");
        require(!userHasVotedOnProposal(_voterAddress, _proposalHash), "user already voted on this proposal");

        if (cycles[currentCycleHash].creditSuppliedUsers[_voterAddress] == false) {
            supplyCredits(_voterAddress);
        }

        bool overflowFlag;
        uint256 b;
        (overflowFlag,b) = voteCredits[_voterAddress].trySub(_numTokens);
        require(overflowFlag == true, "not enough credits available");
        voteCredits[_voterAddress] = b;
        uint256 castVotes = sqrt(_numTokens);

        Proposal storage proposal = cycles[currentCycleHash].proposals[_proposalHash];
        proposal.voterInfo[_voterAddress] = Voter({
            hasVoted: true,
            voteDirection: _voteDirection,
            castVotes: castVotes
        });
        proposal.voters.push(_voterAddress);

        emit VoteCast(_voterAddress, _proposalHash, _voteDirection, castVotes);
    }

    function userHasVotedOnProposal(address _voterAddress, string calldata _proposalHash) internal view returns (bool) {
        return (cycles[currentCycleHash].proposals[_proposalHash].voterInfo[_voterAddress].hasVoted);
    }


    /**
     * status ENDED not necessarily needed -> call anytime possible, e.g. for statistical analysis
     */
    function countVotesForProposal(bytes32 _cycleHash, string calldata _proposalHash) public view returns (uint256, uint256) {
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


    /**
     * voteCredits = global variable. potential remainders get overridden as soon as user votes in different round.
     */
    function supplyCredits(address _voterAddress) internal {
        cycles[currentCycleHash].creditSuppliedUsers[_voterAddress] = true;
        voteCredits[_voterAddress] = cycles[currentCycleHash].votingCredits;
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function getCurrentCycleHash() external view returns (bytes32) {
        return currentCycleHash;
    }

    function endProposingCycleManuallyONLYForDemoPurposesDeleteAfterwards() external onlyOwner {
        cycles[currentCycleHash].proposingDeadline = block.timestamp;
    }

    function endVotingCycleManuallyONLYForDemoPurposesDeleteAfterwards() external onlyOwner {
        cycles[currentCycleHash].proposingDeadline = block.timestamp - votingPeriod();
    }
}
