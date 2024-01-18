import { ContractInterface } from 'ethers';

interface constant {
    senderContractAddress: string,
    logicContractChainSelector: string,
    receiverContractAddress: string
}

interface KeyValueStructure {
    [chainID: string]: constant;
}

export const abi: ContractInterface = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "router",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "link",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "acceptOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "crossChainCall",
        "inputs": [
            {
                "name": "destinationChainSelector",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "receiver",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "functionPayload",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "payFeesIn",
                "type": "uint8",
                "internalType": "enum CrossHubSender.PayFeesIn"
            }
        ],
        "outputs": [
            {
                "name": "messageId",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdraw",
        "inputs": [
            {
                "name": "beneficiary",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdrawToken",
        "inputs": [
            {
                "name": "beneficiary",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "token",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "MessageSent",
        "inputs": [
            {
                "name": "messageId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferRequested",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "FailedToWithdrawEth",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    }
]

export const contractAddr: KeyValueStructure = {
    "11155111": {
        senderContractAddress: "0x90F221148797B9344550C68f13F2A6dCA377133e",
        logicContractChainSelector: "16015286601757825753",
        receiverContractAddress: "0xdBe8618D149CfAF4569024968BF721550748A292"
    }, // ethereumSepolia
    "80001": {
        senderContractAddress: "0x923aac3feA9e32F7823d09b138120B2eDcd92BAF",
        logicContractChainSelector: "12532609583862916517",
        receiverContractAddress: "0xD4EF9304F8F1bFfaFD4d60fBd90c525b96BcFFA5"
    }, // polygonMumbai
    "421614": {
        senderContractAddress: "",
        logicContractChainSelector: "3478487238524512106",
        receiverContractAddress: "0x1F09D7d259073414a81E5663C74a76182B05852D"
    }, // polygonMumbai
    "43113": {
        senderContractAddress: "0x1F09D7d259073414a81E5663C74a76182B05852D",
        logicContractChainSelector: "14767482510784806043",
        receiverContractAddress: "0xCef41ba8d3a9257DBa6F46E6cD8b712622165416"
    }, // avax
}