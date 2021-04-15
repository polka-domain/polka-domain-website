import TokenAirdrop from "./tokens/Airdrop.json";
import Contract from "web3-eth-contract";
import type { Contract as ContractType } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import { useMemo } from "react";
import { getAirdropAddress } from "../api/getAPI";

export const factoryContract = (provider: string): ContractType => {
	// @ts-ignore
	const airdropContract = new Contract(TokenAirdrop.abi as AbiItem[], getAirdropAddress());
	if (provider) {
		airdropContract.setProvider(provider);
	}
	return airdropContract;
};

export const useContract = (provider?: string) => {
	return useMemo(() => factoryContract(provider), [provider]);
};

export const claimTokens = async (contract: ContractType, address: string, signature: string) => {
	return contract.methods.claim(signature).send({ from: address });
};

export const getMyClaim = async (contract: ContractType, address: string) => {
	return contract.methods.claimed(address).call();
};
