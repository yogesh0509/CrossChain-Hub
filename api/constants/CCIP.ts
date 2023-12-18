interface constant{
    senderContractAddress: string,
    logicContractChainSelector: string,
    receiverContractAddress: string
}

interface KeyValueStructure {
    [key: string]: constant;
  }

export const CCIP: KeyValueStructure = {
    "ethereumSepolia": {senderContractAddress: "16015286601757825753", logicContractChainSelector: "", receiverContractAddress: ""},
    "polygonMumbai": {senderContractAddress: "12532609583862916517", logicContractChainSelector: "", receiverContractAddress: ""}
}