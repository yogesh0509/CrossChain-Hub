// src/components/VotingSection.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContractRead, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ContractInterface } from 'ethers';
// import { abi } from "../constants/abi"
// import { useChainId } from "@thirdweb-dev/react";

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

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

interface API {
  senderContractAddress: string,
  senderABI: ContractInterface,
  logicContractChainSelector: string,
  receiverContractAddress: string,
  payload: string
}

const candidatesData: Candidate[] = [
  { id: "0", name: 'Candidate 1', votes: 0 },
  { id: "1", name: 'Candidate 2', votes: 0 }
];
const contractAddressToCall: string = "0xc8C23F4DcC2f3053C53862335970728D91154Df7"
const functionToCall: functionABI = {
  "type": "function",
  "name": "vote",
  "inputs": [
    {
      "name": "_candidateId",
      "type": "uint256",
      "internalType": "uint256"
    }
  ],
  "outputs": [],
  "stateMutability": "nonpayable"
}

const VotingSection: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);
  const [contractAddress, setContractAddress] = useState('');
  const [abi, setAbi] = useState<ContractInterface>([]);
  const [args, setArgs] = useState<string[]>([]);
  const [contract, setContract] = useState<any>(null);

  const { contract: fetchedContract } = useContract(contractAddress, abi);
  const { mutateAsync, isLoading, error } = useContractWrite(contract, "crossChainCall");

  useEffect(() => {
    setContract(fetchedContract)
    console.log(contract)
    // if (!isLoading && !error) {
    //   setCandidates([{
    //     id: 0,
    //     name: data.name,
    //     votes: data.voteCount.toString()
    //   }])
    // }
    //crossChain()
  }, [fetchedContract, contractAddress, abi])

  useEffect(() => {
    if (contract) {
      mutateAsync({args: args})
      if(error){
        console.log(error)
      }
      //afterSetContractFunction();
    }
  }, [contract]);


  const handleVote = async (id: string) => {
    const postData = {
      JSONInterface: functionToCall,
      args: [id],
      address: contractAddressToCall
    }
    try {
      const response = await axios.post('http://localhost:3001/cross_chain/11155111/421614', postData);
      const res: API = response.data
      console.log('Post request successful:', response.data);
      setContractAddress(res.senderContractAddress)
      setAbi(res.senderABI);
      setArgs([res.logicContractChainSelector, res.receiverContractAddress, res.payload, "0"])

    } catch (error: any) {
      console.error('Error making POST request:', error.message);
    }
    // setCandidates((prevCandidates) =>
    //   prevCandidates.map((candidate) =>
    //     candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
    //   )
    // );
  };

  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md font-sans">
      <h2 className="text-3xl font-extrabold mt-6 text-center text-indigo-800">Vote for Your Favorite</h2>
      <div className="flex flex-wrap justify-center">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="w-64 bg-white p-6 m-4 rounded-md shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">{candidate.name}</h3>
            <p className="text-gray-600 mb-6">Votes: {candidate.votes}</p>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
              onClick={() => handleVote(candidate.id)}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingSection;
