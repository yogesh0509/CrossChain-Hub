
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

export const contractAddressToCall: string = "0x7AD8970f27D3B9C204Cd555696a30cA3C69249AD"
export const functionToCall: functionABI = {
  "type": "function",
  "name": "vote",
  "inputs": [
    {
      "name": "_candidateId",
      "type": "uint256",
      "internalType": "uint256"
    },
    {
      "name": "_voter",
      "type": "address",
      "internalType": "address"
    }
  ],
  "outputs": [],
  "stateMutability": "nonpayable"
}

export const LogicchainID: number = 43113
export const LogicchainName: string = "Avalanche Fuji"