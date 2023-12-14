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

  const addApplication = async (_surveyId: string, _userEmail: string) => {
    const functionName = 'addApplication';
    const transaction = contract.methods[functionName](_surveyId, _userEmail);
    const gasEstimate = await transaction.estimateGas({ from: account.address });

    const result = await transaction.send({
      from: account.address,
      gas: String(Number(gasEstimate) + 10000), // Add some extra gas for safety margin
    });

    return result;
  };

  const setSurvey = async (
    _surveyId: string,
    _timestamp: number,
    _winnersCount: number,
  ): Promise<any> => {
    const functionName = 'setSurvey';
    const transaction = contract.methods[functionName](_surveyId, _timestamp / 1000, _winnersCount);
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

    return transaction;
    // const contract = new web3.eth.Contract(contractAbi, contractAddress);
    // console.log(contract);
  };

  const checkRaffle = async (_surveyId: any) => {
    const functionName = 'checkRaffle';
    const transaction = contract.methods[functionName](_surveyId);
    const gasEstimate = await transaction.estimateGas({ from: account.address });

    const result = await transaction.send({
      from: account.address,
      gas: String(Number(gasEstimate) + 10000), // Add some extra gas for safety margin
    });

    return result;
  };

  return {
    getSurvey,
    setSurvey,
    addApplication,
    checkRaffle,
  };
}
