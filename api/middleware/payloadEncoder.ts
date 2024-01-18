import Web3 from 'web3';

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

export function encodeMyMethodCall(JSONInterface: functionABI, args: string[], address: string): string {
    const web3 = new Web3();

    const encodedFunctionCall: string = web3.eth.abi.encodeFunctionCall(JSONInterface, args);
    const encodedData: string = web3.eth.abi.encodeParameters(['address', 'bytes'], [address, encodedFunctionCall]);
    
    return encodedData;
}