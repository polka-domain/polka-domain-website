import { MAINNET_LP_ADDRESS, TESTED_LP_ADDRESS } from "../const/const";
import Contract, { Contract as ContractType } from "web3-eth-contract";
import IERC from "./tokens/IERC20.json";
import { AbiItem, toWei } from "web3-utils";
import { useMemo } from "react";

export const getLPAddress = (chainId: number) => {
	switch (chainId) {
		case 1:
			return MAINNET_LP_ADDRESS;
		case 4:
			return TESTED_LP_ADDRESS;
		default:
			return MAINNET_LP_ADDRESS;
	}
};

export const factoryContract = (provider: string, chainId: number): ContractType => {
	// @ts-ignore
	const lpContract = new Contract(IERC.abi as AbiItem[], getLPAddress(chainId));
	if (provider) {
		lpContract.setProvider(provider);
	}
	return lpContract;
};

export const useContract = (provider?: string, chainId?: number) => {
	return useMemo(() => factoryContract(provider, chainId), [provider]);
};

export const getApprovedAmount = (contract: ContractType, account: string, chainId: number) => {
	return contract.methods.allowance(account, getLPAddress(chainId)).call();
};

export const approve = async (
	contract: ContractType,
	amount: string,
	account: string,
	chainId: number
) => {
	return contract.methods.approve(getLPAddress(chainId), toWei(amount)).send({ from: account });
};
