// src/components/VotingSection.tsx
import React, { useState } from 'react';

interface Candidate {
  id: number;
  name: string;
  votes: number;
}

const candidatesData: Candidate[] = [
  { id: 1, name: 'Candidate 1', votes: 0 },
  { id: 2, name: 'Candidate 2', votes: 0 },
  { id: 3, name: 'Candidate 3', votes: 0 },
  { id: 4, name: 'Candidate 4', votes: 0 },
  { id: 5, name: 'Candidate 5', votes: 0 },
  { id: 6, name: 'Candidate 6', votes: 0 },
  // Add more candidates as needed
];

const VotingSection: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);

  const handleVote = (id: number) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
      )
    );
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
