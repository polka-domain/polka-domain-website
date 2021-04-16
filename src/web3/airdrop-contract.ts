import TokenAirdrop from "./tokens/Airdrop.json";
import Contract from "web3-eth-contract";
import type { Contract as ContractType } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import { useMemo } from "react";
import { MAINNET_AIRDROP_ADDRESS, TESTED_AIRDROP_ADDRESS } from "../const/const";

const getAirdropAddress = (chainId: number) => {
	switch (chainId) {
		case 1:
			return MAINNET_AIRDROP_ADDRESS;
		case 4:
			return TESTED_AIRDROP_ADDRESS;
		default:
			return MAINNET_AIRDROP_ADDRESS;
	}
};

export const factoryContract = (provider: string, chainId: number): ContractType => {
	// @ts-ignore
	const airdropContract = new Contract(TokenAirdrop.abi as AbiItem[], getAirdropAddress(chainId));
	if (provider) {
		airdropContract.setProvider(provider);
	}
	return airdropContract;
};

export const useContract = (provider?: string, chainId?: number) => {
	return useMemo(() => factoryContract(provider, chainId), [provider]);
};

export const claimTokens = async (contract: ContractType, address: string, signature: string) => {
	return contract.methods.claim(signature).send({ from: address });
};

export const getMyClaim = async (contract: ContractType, address: string) => {
	return contract.methods.claimed(address).call();
};
