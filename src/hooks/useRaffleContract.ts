import React, { useEffect } from 'react';
import Web3 from 'web3';
import dotenv from 'dotenv';
import { RAFFLE_CONTRACT_ABI, RAFFLE_CONTRACT_ADDRESS } from '@const/raffleContract';

export function useRaffleContract() {
  const nodeUrl = process.env.REACT_APP_SEPOLIA_NODE_URL || '';
  const pbk = process.env.REACT_APP_PRIVATE_KEY || '';
  const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
  const account = web3.eth.accounts.privateKeyToAccount(pbk);
  web3.eth.accounts.wallet.add(account);

  const contractAbi = RAFFLE_CONTRACT_ABI;
  const contractAddress = RAFFLE_CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const setSurvey = async (_timestamp: number, _surveyId: string): Promise<any> => {
    const functionName = 'setSurvey';
    const transaction = contract.methods[functionName](_timestamp, 23);
    const gasEstimate = await transaction.estimateGas({ from: account.address });

    const result = await transaction.send({
      from: account.address,
      gas: String(Number(gasEstimate) + 10000), // Add some extra gas for safety margin
    });

    return result;
  };

  const getSurvey = async (_surveyId: any) => {
    const functionName = 'getSurvey';
    const functionParams = [_surveyId];
    const transaction = await contract.methods.getSurvey(_surveyId).call();
    //       const gasEstimate = await transaction.estimateGas({ from: account.address });

    console.log(transaction);
    // const contract = new web3.eth.Contract(contractAbi, contractAddress);
    // console.log(contract);
  };
  // const functionName = 'your_function_name';
  // const functionParams = [param1, param2, ...]; // Replace with your function parameters

  // useEffect(() => {
  //   const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  //   const nodeUrl = 'your_node_url'; // Replace with your node URL

  //   const interactWithContract = async () => {
  //     try {
  //       const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
  //       const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  //       web3.eth.accounts.wallet.add(account);

  //       const contract = new web3.eth.Contract(contractAbi, contractAddress);

  //       const transaction = contract.methods[functionName](...functionParams);
  //       const gasEstimate = await transaction.estimateGas({ from: account.address });

  //       const result = await transaction.send({
  //         from: account.address,
  //         gas: gasEstimate + 10000, // Add some extra gas for safety margin
  //       });

  //       console.log('Transaction Result:', result);
  //     } catch (error) {
  //       console.error('Transaction Error:', error);
  //     }
  //   };

  //   interactWithContract();
  // }, []);

  // You can return additional data or functions if needed
  return {
    getSurvey,
    setSurvey,
  };
}
