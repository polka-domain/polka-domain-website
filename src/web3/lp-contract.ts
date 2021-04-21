import { MAINNET_LP_ADDRESS, TESTED_LP_ADDRESS } from "../const/const";
import Contract, { Contract as ContractType } from "web3-eth-contract";
import IERC from "./tokens/IERC20.json";
import { AbiItem } from "web3-utils";
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

export const getApproval = (contract: ContractType, address: string, chainId: number) => {
	return contract.methods.allowance(address, getLPAddress(chainId)).call();
};

export const approve = async (
	contract: ContractType,
	amount: number,
	address: string,
	chainId: number
) => {
	return contract.methods.approve(getLPAddress(chainId), amount).send({ from: address });
};
