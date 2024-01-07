interface params {
    name: string;
    type: string;
    internalType: string;
}

interface functionABI {
    type: string;
    name: string;
    constant?: boolean;
    payable?: boolean;
    stateMutability?: string;
    inputs?: params[];
    outputs?: params[];
}

interface constant {
    senderContractAddress: string,
    logicContractChainSelector: string,
    receiverContractAddress: string
}

interface KeyValueStructure {
    [key: string]: constant;
}

export const abi: functionABI = {
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
}

export const contractAddr: KeyValueStructure = {
    "ethereumSepolia": {
        senderContractAddress: "",
        logicContractChainSelector: "16015286601757825753",
        receiverContractAddress: "0xdBe8618D149CfAF4569024968BF721550748A292"
    },
    "polygonMumbai": {
        senderContractAddress: "0x923aac3feA9e32F7823d09b138120B2eDcd92BAF",
        logicContractChainSelector: "12532609583862916517",
        receiverContractAddress: ""
    }
}