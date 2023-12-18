import Web3 from 'web3';

interface params {
    name: string;
    type: string;
  }

interface functionABI {
    type: string,
    name: string,
    constant?: boolean,
    payable?: boolean,
    stateMutability?: string,
    inputs?: params[]
    output?: params[]
}

export function encodeMyMethodCall(JSONInterface: functionABI, args: any[], address: string): string {
    const web3 = new Web3();

    const encodedFunctionCall: string = web3.eth.abi.encodeFunctionCall(JSONInterface, args);
    const encodedData: string = web3.eth.abi.encodeParameters(['address', 'bytes'], [address, encodedFunctionCall]);
    
    console.log(encodedData)
    return encodedData;
}