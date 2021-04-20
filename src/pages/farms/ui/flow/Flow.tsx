import classNames from "classnames";
import styles from "./Flow.module.scss";
import { FC, useState } from "react";
import { Default } from "../default";
import { Claim } from "../claim";
import { Stake } from "../stake";
import { UnStake } from "../un-stake";
import { MaybeWithClassName } from "../../../../helper/react/types";

enum ACTION {
	default = "",
	claim = "claim",
	unStake = "un-stake",
	stake = "stake",
}

export const Flow: FC<MaybeWithClassName> = ({ className }) => {
	const [action, setAction] = useState<ACTION>(ACTION.default);

	const backAction = () => {
		setAction(ACTION.default);
	};

	const content = () => {
		switch (action) {
			case ACTION.default:
				return (
					<Default
						onClaim={() => setAction(ACTION.claim)}
						onStake={() => setAction(ACTION.stake)}
						onUnStake={() => setAction(ACTION.unStake)}
					/>
				);

			case ACTION.claim:
				return <Claim onBack={backAction} />;

			case ACTION.unStake:
				return <UnStake onBack={backAction} />;

			case ACTION.stake:
				return <Stake onBack={backAction} />;
		}
	};

	return (
		<>
			<div className={classNames(className, styles.component)}>{content()}</div>
		</>
	);
};
