pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';




/**TODO:
    - Round
        - Cyclic - auto trigger (proposal threshold)
        - Bundles Proposals for QV
        - 1x Voter : 1x "Credit Airdrop"
    - Proposal
        - Votes []
    - Vote
        - Cost - scales quadratically
    - Voter
        - Credits p. Round (~ #Proposals)
    - (DEV)
**/



contract QV {
    using SafeMath for int256;
    using SafeMath for uint256;



    enum RoundStatus{UNINITIATED, COLLECTING_PROPOSALS, ACTIVE_VOTING, ENDED}

    struct Round{
        RoundStatus status;

    }








}