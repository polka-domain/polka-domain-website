import { MAINNET_STAKE_ADDRESS, TESTED_STAKE_ADDRESS } from "../const/const";
import Contract, { Contract as ContractType } from "web3-eth-contract";
import StakingPool from "./tokens/StakingPool.json";
import { AbiItem } from "web3-utils";
import { useMemo } from "react";

export const getStakeAddress = (chainId: number) => {
	switch (chainId) {
		case 1:
			return MAINNET_STAKE_ADDRESS;
		case 4:
			return TESTED_STAKE_ADDRESS;
		default:
			return MAINNET_STAKE_ADDRESS;
	}
};

export const factoryContract = (provider: string, chainId: number): ContractType => {
	// @ts-ignore
	const poolContract = new Contract(StakingPool.abi as AbiItem[], getStakeAddress(chainId));
	if (provider) {
		poolContract.setProvider(provider);
	}
	return poolContract;
};

export const useContract = (provider?: string, chainId?: number) => {
	return useMemo(() => factoryContract(provider, chainId), [provider]);
};

export const getAPYInfo = (contract: ContractType): Promise<any> => {
	return contract.methods.APY().call();
};

export const getRewardInfo = (contract: ContractType, address: string): Promise<any> => {
	return contract.methods.rewards(address).call();
};

export const getBalanceInfo = (contract: ContractType, address: string): Promise<any> => {
	return contract.methods.balanceOf(address).call();
};

export const claimRewards = async (contract: ContractType, address: string) => {
	return contract.methods.getReward().send({ from: address });
};

export const stake = async (contract: ContractType, amount: number, address: string) => {
	return contract.methods.stake(amount).send({ from: address });
};

export const withdraw = async (contract: ContractType, amount: number, address: string) => {
	return contract.methods.withdraw(amount).send({ from: address });
};
