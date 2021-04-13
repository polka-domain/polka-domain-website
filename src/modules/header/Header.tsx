import classNames from "classnames";
import { FC, useCallback, useState, useEffect, useRef } from "react";

import styles from "./Header.module.scss";
import { MaybeWithClassName } from "../../helper/react/types";
import { NavLink } from "../../ui/button";
import { ColorLogo } from "../../ui/icons/Icons";
import { Navigation } from "./ui/navigation";
import { FocusOn } from "react-focus-on";
import { useScatteredContinuousState } from "../../hooks/use-continuous-state";
import { MobileNavigation } from "./ui/mobile-navigation";
import { Toggle, Close } from "../../ui/icons/Icons";

type HeaderType = {
	fixed?: boolean;
};

export const Header: FC<HeaderType & MaybeWithClassName> = ({ className, fixed }) => {
	const [mobileNavigationShown, setMobileNavigationVisibility] = useState(false);
	const mobileNavigation = useScatteredContinuousState(mobileNavigationShown, {
		timeout: 350,
	});
	const closeMobileNavigationDisplay = useCallback(() => setMobileNavigationVisibility(false), []);
	// toggle is bound to a visible state of button
	const toggleMobileNavigationDisplay = useCallback(
		() => setMobileNavigationVisibility(!mobileNavigation.present),
		[mobileNavigation.present]
	);

	// close mobile navigation on route change
	useEffect(() => {
		closeMobileNavigationDisplay();
	}, [closeMobileNavigationDisplay]);

	const toggleRef = useRef<HTMLButtonElement>(null);

	return (
		<header className={classNames(styles.component, fixed && styles.fixed, className)}>
			<div className={styles.wrapper}>
				<NavLink className={styles.logo} href="/" icon={<ColorLogo />} variant="text">
					Home
				</NavLink>
				<Navigation className={styles.navigation} />
				<div className={styles.launch}>
					<NavLink size="medium" variant="contained" color="grey" href="" disabled>
						Launch App
					</NavLink>
				</div>
				<button className={styles.toggle} onClick={toggleMobileNavigationDisplay} ref={toggleRef}>
					{mobileNavigation.present ? <Close /> : <Toggle />}
					<span>{mobileNavigation.present ? "Close" : "Open"}</span>
				</button>
			</div>
			{mobileNavigation.defined && (
				<FocusOn
					autoFocus
					enabled={mobileNavigation.present}
					onEscapeKey={closeMobileNavigationDisplay}
					onClickOutside={closeMobileNavigationDisplay}
					shards={[toggleRef]}
				>
					<MobileNavigation
						className={classNames(
							styles.dropdown,
							mobileNavigation.defined && styles.visible,
							mobileNavigation.present && styles.animation
						)}
						sideEffect={<mobileNavigation.DefinePresent timeout={16} />}
						onClick={closeMobileNavigationDisplay}
					/>
				</FocusOn>
			)}
		</header>
	);
};
