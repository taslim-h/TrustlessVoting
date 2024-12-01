import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
// import ContractABI from '../MyContractABI.json';
import ContractABI from './ContractABI';

const useContract = () => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    useEffect(() => {
        const loadContract = async () => {
            try {
                // Connect to Anvil provider
                const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_ANVIL_RPC_URL);

                // Get signer (default to the first account in Anvil)
                const signer = await provider.getSigner();

                // Connect to the contract
                const contract = new ethers.Contract(
                    process.env.REACT_APP_CONTRACT_ADDRESS!,
                    ContractABI,
                    signer
                );

                setContract(contract);
            } catch (error) {
                console.error("Failed to load contract:", error);
            }
        };

        loadContract();
    }, []);

    return contract;
};

export default useContract;
