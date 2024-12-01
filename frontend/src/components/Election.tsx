import React, { useEffect, useState } from 'react';
import useContract from './useContract';
import { ethers } from 'ethers';

interface Candidate {
    name: string;
    votes: ethers.BigNumberish;
}

const Election = () => {
    const contract = useContract();
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            if (contract) {
                try {

                    const candidateCount = await contract.getCandidateCount();
                    const candidateList = [];

                    for (let i = 0; i < candidateCount; i++) {
                        const candidate = await contract.candidates(i);
                        candidateList.push(candidate);
                    }

                    setCandidates(candidateList);
                } catch (error) {
                    console.error("Error fetching candidates:", error);
                }
            }
        };

        fetchCandidates();
    }, [contract]);

    return (
        <div>
            <h2>Candidates</h2>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>
                        {candidate.name} - Votes: {candidate.votes.toString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Election;
