import TokenFixedSwap from "./tokens/TokenFixedSwap.json";
import Contract from "web3-eth-contract";
import type { Contract as ContractType } from "web3-eth-contract";
import { AbiItem, toWei } from "web3-utils";
import { useMemo } from "react";
import Web3 from "web3";
import { DEFAULT_AUCTION_INDEX, FIXED_SWAP_ADDRESS } from "../const/const";

const AUCTION_INDEX =
	(typeof window !== "undefined" && window.localStorage.getItem("AUCTION_INDEX")) ||
	DEFAULT_AUCTION_INDEX;

export const factoryContract = (provider: string): ContractType => {
	// @ts-ignore
	const fixedSwapContract = new Contract(TokenFixedSwap.abi as AbiItem[], FIXED_SWAP_ADDRESS);
	if (provider) {
		fixedSwapContract.setProvider(provider);
	}
	return fixedSwapContract;
};

export const swapContracts = async (
	contract: ContractType,
	ethAmount: string,
	account: string,
	index = AUCTION_INDEX
) => {
	const amount = toWei(ethAmount);
	return contract.methods.swap(index, amount).send({ from: account, value: amount });
};

export const getMyClaim = async (
	contract: ContractType,
	address: string,
	index = AUCTION_INDEX
) => {
	return contract.methods.myClaimed(address, index).call();
};

export const claimTokens = async (
	contract: ContractType,
	address: string,
	index = AUCTION_INDEX
) => {
	return contract.methods.userClaim(index).send({ from: address });
};

export const useContract = (provider?: string) => {
	return useMemo(() => factoryContract(provider), [provider]);
};

export type TimeInfo = {
	openAt: number;
	closeAt: number;
	claimAt: number;
};

export const getTimeInfo = (contract: ContractType, index = AUCTION_INDEX): Promise<TimeInfo> => {
	return contract.methods.timeInfos(index).call();
};

export type TokenInfo = {
	maxAllocToken1: string;
	amountTotal0: string;
	amountTotal1: string;
	amountSwap1: string;
	creator: string;
};

export const getTokenInfo = (contract: ContractType, index = AUCTION_INDEX): Promise<TokenInfo> => {
	return contract.methods.tokenInfos(index).call();
};

export const getMyAmount = (
	contract: ContractType,
	address: string,
	index = AUCTION_INDEX
): Promise<string> => {
	return contract.methods.myAmountSwapped1(address, index).call();
};

export const getMyBalance = (web3: Web3, address: string): Promise<string> => {
	return web3.eth.getBalance(address);
};
