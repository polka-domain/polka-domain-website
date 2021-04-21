import { Close, Logo } from "../icons/Icons";
import { Button } from "../button";
import { MaybeWithClassName, WithChildren } from "../../helper/react/types";
import classNames from "classnames";
import type { CSSProperties, FC } from "react";
import { useCallback, useState } from "react";
import { Shadow } from "../shadow";

import styles from "./PopUpContainer.module.scss";
import { FocusOn } from "react-focus-on";
import {
	ScatteredContinuousState,
	useScatteredContinuousState,
} from "../../hooks/use-continuous-state";
import { suppressEvent } from "../utils/suppress-event";
import { useWindowSize } from "../../hooks/use-window-size";

type PopUpContainerType = {
	animated: boolean;
	visible: boolean;
	size: "sm" | "lg";
	withoutClose?: boolean;
	focusLock?: boolean;
	maxWidth?: number;
	onClose(): void;
};

type ComponentType = PopUpContainerType & MaybeWithClassName & WithChildren;

export const useControlPopUp = (): {
	popUp: ScatteredContinuousState<boolean>;
	open(): void;
	close(): void;
	toggle(): void;
} => {
	const [popUpVisible, setPopUpVisible] = useState(false);
	const popUp = useScatteredContinuousState(popUpVisible, {
		timeout: 350,
	});
	const open = useCallback(() => setPopUpVisible(true), []);
	const close = useCallback(() => setPopUpVisible(false), []);
	const toggle = useCallback(() => setPopUpVisible((visible) => !visible), []);

	return {
		popUp,
		open,
		close,
		toggle,
	};
};

export const PopUpContainer: FC<ComponentType & MaybeWithClassName> = ({
	className,
	visible,
	onClose,
	animated,
	children,
	size,
	withoutClose,
	focusLock,
	maxWidth,
}) => {
	const windowHeight = useWindowSize()[1];

	return (
		<>
			<Shadow className={className} visible={visible} animated={animated} focusLock={focusLock} />
			<FocusOn
				autoFocus
				enabled={visible}
				onEscapeKey={!withoutClose && onClose}
				onClickOutside={!withoutClose && onClose}
				focusLock={focusLock}
			>
				<div data-autofocus-inside>
					{/* eslint-disable-next-line max-len */}
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
					<div
						className={classNames(
							className,
							styles.component,
							visible && styles.visible,
							animated && styles.animation
						)}
						tabIndex={-1}
						role="dialog"
						onClick={onClose}
						style={{ "--window-height": `${windowHeight}px` } as CSSProperties}
					>
						<div
							className={classNames(styles.container, styles[size])}
							style={{ maxWidth: maxWidth ? `${maxWidth / 16}rem` : "none" }}
						>
							<div className={styles.header}>
								<Logo className={styles.logo} />
								{!withoutClose && (
									<Button
										className={styles.close}
										icon={<Close />}
										color="grey"
										variant="text"
										onClick={onClose}
									>
										Close
									</Button>
								)}
							</div>
							{/* eslint-disable-next-line max-len */}
							{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
							<div onClick={suppressEvent} className={styles.content}>
								{children}
							</div>
						</div>
					</div>
				</div>
			</FocusOn>
		</>
	);
};
