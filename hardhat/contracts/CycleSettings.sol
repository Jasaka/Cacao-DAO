pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract CycleSettings is Ownable{
    uint256 private _proposingPeriod;
    uint256 private _votingPeriod;
    uint256 private _proposalThreshold;

    event ProposingPeriodSet(uint256 oldProposingPeriod, uint256 newProposingPeriod);
    event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod);
    event ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold);

    constructor(
        uint256 initialProposingPeriod,
        uint256 initialVotingPeriod,
        uint256 initialProposalThreshold
    ) {
        setProposingPeriod(initialProposingPeriod);
        setVotingPeriod(initialVotingPeriod);
        setProposalThreshold(initialProposalThreshold);
    }

    function proposingPeriod() public view returns (uint256) {
        return _proposingPeriod * 1 days;
    }
    function votingPeriod() public view returns (uint256) {
        return _votingPeriod * 1 days;
    }
    function proposalThreshold() public view virtual returns (uint256) {
        return _proposalThreshold;
    }


    function setProposingPeriod(uint256 _newProposingPeriod) public onlyOwner {
        // proposing period must be at least one day long
        require(_newProposingPeriod > 0, "CycleSettings: proposing period too low");
        _proposingPeriod = _newProposingPeriod;

        emit ProposingPeriodSet(_proposingPeriod, _newProposingPeriod);
    }

    function setVotingPeriod(uint256 _newVotingPeriod) public onlyOwner {
        // voting period must be at least one day long
        require(_newVotingPeriod > 0, "CycleSettings: voting period too low");
        _votingPeriod = _newVotingPeriod;

        emit VotingPeriodSet(_votingPeriod, _newVotingPeriod);
    }

    function setProposalThreshold(uint256 _newProposalThreshold) public onlyOwner {
        // proposal threshold must be at least one proposal
        require(_newProposalThreshold > 0, "CycleSettings: proposal threshold too low");
        _proposalThreshold = _newProposalThreshold;

        emit ProposalThresholdSet(_proposalThreshold, _newProposalThreshold);
    }
}
