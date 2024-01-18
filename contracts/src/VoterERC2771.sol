// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract VoterERC2771 is ERC2771Context{
    constructor(address trustedForwarder)ERC2771Context(trustedForwarder){}

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event VoteCasted(address indexed voter, uint256 candidateId);

    modifier hasNotVoted() {
        require(!hasVoted[_msgSender()], "You have already voted");
        _;
    }

    function addCandidate(uint256 _candidateId, string memory _name) external {
        candidates[_candidateId] = Candidate(_name, 0);
    }

    function vote(uint256 _candidateId) external hasNotVoted {
        require(candidates[_candidateId].voteCount >= 0, "Invalid candidate");
        
        candidates[_candidateId].voteCount++;
        hasVoted[_msgSender()] = true;

        emit VoteCasted(_msgSender(), _candidateId);
    }

    function getVotes(uint256 _candidateId) external view returns (uint256) {
        return candidates[_candidateId].voteCount;
    }
}
