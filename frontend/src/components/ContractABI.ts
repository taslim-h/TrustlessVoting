const ContractABI =  [
    {
        "type": "function",
        "name": "addCandidate",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createElection",
        "inputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "electionCount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "elections",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "candidateCount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCandidateVotes",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "candidateId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isElectionActive",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "vote",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "candidateId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "CandidateAdded",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "candidateId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ElectionCreated",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VoteCast",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "candidateId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "voter",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    }
];

export default ContractABI;