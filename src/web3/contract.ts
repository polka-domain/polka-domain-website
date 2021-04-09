import TokenFixedSwap from "./tokens/TokenFixedSwap.json";
import Contract from "web3-eth-contract";
import type { Contract as ContractType } from "web3-eth-contract";
import { AbiItem, toWei } from "web3-utils";
import { useMemo } from "react";

// Rinkeby address
const fixedSwapAddress = "0x3f1091Cc60c83C208db4A660aB4804bB684E988A";

//  = 'ws://localhost:8546'
export const factoryContract = (provider: string): ContractType => {
	// @ts-ignore
	const fixedSwapContract = new Contract(TokenFixedSwap.abi as AbiItem[], fixedSwapAddress);
	if (provider) {
		fixedSwapContract.setProvider(provider);
	}
	return fixedSwapContract;
};

export const swapContracts = (contract: ContractType, ethAmount: string, account: string) => {
	const index = 0;
	const amount = toWei(ethAmount);
	return contract.methods.swap(index, amount).send({ from: account });
};

export const claimTokens = (contract: ContractType, address: string, index = 0) => {
	return contract.methods.myClaimed(address, index).call();
};

export const useContract = (provider?: string) => {
	return useMemo(() => factoryContract(provider), [provider]);
};

export const getTimeInfo = (
	contract: ContractType,
	index = 0
): {
	closeAt: number;
	claimAt: number;
} => {
	return contract.methods.timeInfos(index).call();
};

export const getTokenInfo = (
	contract: ContractType,
	index = 0
): {
	maxAllocToken1: string;
	amountTotal0: string;
	amountTotal1: string;
	amountSwap1: string;
	creator: string;
} => {
	return contract.methods.tokenInfos(index).call();
};
