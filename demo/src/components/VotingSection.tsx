import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useChainId, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ContractInterface } from 'ethers';
import toast from "react-hot-toast";
import { contractAddressToCall, functionToCall, LogicchainID } from "../constants/network"

interface Candidate {
  id: string;
  name: string;
  votes: number;
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

const VotingSection: React.FC = () => {
  const chainId = useChainId();
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);
  const [contractAddress, setContractAddress] = useState('');
  const [abi, setAbi] = useState<ContractInterface>([]);
  const [args, setArgs] = useState<string[]>([]);
  const [contract, setContract] = useState<any>(null);

  const { contract: fetchedContract } = useContract(contractAddress, abi);
  const { mutateAsync, isLoading, error } = useContractWrite(contract, "crossChainCall");

  useEffect(() => {
    setContract(fetchedContract)
  }, [fetchedContract, contractAddress, abi])

  useEffect(() => {
    if (contract) {
      console.log("-------------")
      handleTx()
    }
  }, [contract]);

  const handleTx = async () => {
    toast.dismiss("connecting");
    toast.loading("Connecting with contract", {
      id: "connect",
    });

    try {
      const tx = await mutateAsync({ args: args })
      toast.dismiss("connect");
      toast.success("Successfull");
      toast.custom("You'll be notified once approved", {
        icon: "ℹ️",
      });
      console.log(tx)
      setContractAddress("")

    } catch (error) {
      toast.dismiss("connect");
      toast.error("Error connecting with contract");
          setContractAddress(" ")
    }
  }

  const handleVote = async (id: string) => {
    const postData = {
      JSONInterface: functionToCall,
      args: [id, "0x0f5342B55ABCC0cC78bdB4868375bCA62B6c16eA"],
      address: contractAddressToCall
    }
    try {
      const response = await axios.post(`http://localhost:3001/cross_chain/${chainId}/${LogicchainID}`, postData);
      const res: API = response.data
      console.log('Post request successful:', response.data);
      setContractAddress(res.senderContractAddress)
      setAbi(res.senderABI);
      setArgs([res.logicContractChainSelector, res.receiverContractAddress, res.payload, "0"])

    } catch (error: any) {
      console.error('Error making POST request:', error.response.data);
      toast.error(error.response.data.error)
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
