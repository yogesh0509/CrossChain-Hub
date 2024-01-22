
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

export const contractAddressToCall: string = "0xc8C23F4DcC2f3053C53862335970728D91154Df7"
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