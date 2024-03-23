// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voter {

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event VoteCasted(address indexed voter, uint256 candidateId);

    modifier hasNotVoted(address _voter) {
        require(!hasVoted[_voter], "You have already voted");
        _;
    }

    function addCandidate(uint256 _candidateId, string memory _name) external {
        candidates[_candidateId] = Candidate(_name, 0);
    }

    function vote(uint256 _candidateId, address _voter) external hasNotVoted(_voter) {
        require(candidates[_candidateId].voteCount >= 0, "Invalid candidate");
        
        candidates[_candidateId].voteCount++;
        hasVoted[_voter] = true;
        emit VoteCasted(_voter, _candidateId);
    }

    function getVotes(uint256 _candidateId) external view returns (uint256) {
        return candidates[_candidateId].voteCount;
    }
}
