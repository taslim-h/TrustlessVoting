// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Election {
    using Counters for Counters.Counter;

    struct PoliticalParty {
        uint256 partyId;
        uint256 electionId;
        string name;
    }

    struct Candidate {
        uint256 candidateId;
        string name;
        uint256 partyId; // ID of the political party (0 for independent candidates)
        uint256 pollId;
        uint256 electionId;
        uint256 voteCount; // Using Counters for vote tally
    }

    struct Voter {
        bool isRegistered;
        mapping(uint256 => bool) hasVotedInPoll; // pollId => hasVoted
    }

    struct Poll {
        uint256 id;
        string regionName;
        uint256 electionId;
        uint256[] candidateIds;
        bool isActive;
    }

    struct ElectionInfo {
        uint256 electionId;
        string name;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    address public admin;
    Counters.Counter private candidatesCounter;
    Counters.Counter private pollsCounter;

    // Counters.Counter private partyCounter;

    mapping(uint256 => ElectionInfo) public elections;
    mapping(uint256 => mapping(uint256 => Poll)) public polls; // electionId => pollId => Poll
    mapping(uint256 => mapping(uint256 => Candidate[])) public candidates; // electionId => pollId => Candidate[]
    mapping(uint256 => mapping(uint256 => PoliticalParty))
        public politicalParties; // electionId => partyId => PoliticalParty    mapping(address => Voter) public voters;

    // Counters
    uint256 private electionCounter;
    mapping(uint256 => uint256) public pollCounter; // electionId => number of polls
    mapping(uint256 => uint256) public partyCounter; // electionId => number of parties

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    event ElectionCreated(uint256 indexed electionId, string name);

    // Create Election
    function createElection(
        string memory _name,
        uint256 _startTime,
        uint256 _endTime
    ) public onlyAdmin {
        require(_startTime > block.timestamp, "Start time must be in future");
        require(_endTime > _startTime, "End time must be after start time");

        electionCounter++;
        elections[electionCounter] = ElectionInfo({
            electionId: electionCounter,
            name: _name,
            startTime: _startTime,
            endTime: _endTime,
            isActive: false
        });

        emit ElectionCreated(electionCounter, _name);
    }

    event PollCreated(
        uint256 indexed id,
        uint256 indexed electionId,
        string regionName
    );

    // Poll Management
    function createPoll(
        uint256 _electionId,
        string memory _regionName
    ) public onlyAdmin {
        pollCounter[_electionId]++;
        uint256 newPollId = pollCounter[_electionId];

        polls[_electionId][newPollId] = Poll({
            electionId: _electionId,
            id: newPollId,
            regionName: _regionName,
            candidateIds: new uint256[](0),
            isActive: false
        });

        emit PollCreated(newPollId, _electionId, _regionName);
    }

    event PartyRegistered(
        uint256 indexed electionId,
        uint256 partyId,
        string name
    );

    // Political Party Management
    function registerPoliticalParty(
        uint256 _electionId,
        string memory _name
    ) public onlyAdmin {
        partyCounter[_electionId]++;
        uint256 newPartyId = partyCounter[_electionId];

        politicalParties[_electionId][newPartyId] = PoliticalParty({
            electionId: _electionId,
            partyId: newPartyId,
            name: _name
        });

        emit PartyRegistered(_electionId, newPartyId, _name);
    }

    event CandidateRegistered(
        uint256 indexed electionId,
        uint256 indexed pollId,
        uint256 candidateId,
        string name
    );

    // Candidate Management
    function registerCandidate(
        uint256 _electionId,
        uint256 _pollId,
        string memory _name,
        uint256 _partyId // 0 for independent
    ) public onlyAdmin {
        require(_pollId <= pollCounter[_electionId], "Invalid poll ID");
        if (_partyId > 0) {
            require(_partyId <= partyCounter[_electionId], "Invalid party ID");
        }

        uint256 candidateId = candidates[_electionId][_pollId].length;

        candidates[_electionId][_pollId].push(
            Candidate({
                name: _name,
                electionId: _electionId,
                pollId: _pollId,
                partyId: _partyId,
                candidateId: candidateId,
                voteCount: 0
            })
        );

        emit CandidateRegistered(_electionId, _pollId, candidateId, _name);
    }

    // Cast Vote
    function castVote(uint256 candidateId) public {
        require(candidates[candidateId].id != 0, "Candidate does not exist");
        candidates[candidateId].voteCount.increment(); // Increment vote count
    }

    // Get Total Votes for a Candidate
    function getTotalVotes(uint256 candidateId) public view returns (uint256) {
        require(candidates[candidateId].id != 0, "Candidate does not exist");
        return candidates[candidateId].voteCount.current(); // Retrieve vote count
    }

    // Get Political Party Name for a Candidate
    function getPoliticalParty(
        uint256 candidateId
    ) public view returns (string memory) {
        require(candidates[candidateId].id != 0, "Candidate does not exist");
        uint256 partyId = candidates[candidateId].partyId;
        if (partyId == 0) {
            return "Independent";
        }
        return politicalParties[partyId].name;
    }
}
