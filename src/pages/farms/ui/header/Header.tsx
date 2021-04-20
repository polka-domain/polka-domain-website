import classNames from "classnames";
import styles from "./Header.module.scss";
import { FC, SVGAttributes } from "react";
import { Button } from "../../../../ui/button";

const Back = (props: SVGAttributes<SVGElement>) => {
	return (
		<svg
			width={20}
			height={14}
			viewBox="0 0 20 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g fill="currentColor">
				<path d="M7.976 13.333c.208.007.414-.05.588-.16a.961.961 0 00.38-.457.91.91 0 00.029-.582.95.95 0 00-.332-.49L3.699 7.61h15.28a1.042 1.042 0 00.72-.272.95.95 0 00.223-.311.914.914 0 00-.222-1.05 1.042 1.042 0 00-.72-.271L.992 5.704a1.033 1.033 0 00-.567.173.96.96 0 00-.363.45.91.91 0 00-.03.566c.05.188.16.356.313.483l6.99 5.716c.177.15.403.235.64.24z" />
				<path d="M.992 7.616a1.033 1.033 0 01-.567-.172.96.96 0 01-.363-.45.91.91 0 01-.03-.567.947.947 0 01.313-.483L7.343.228A1.045 1.045 0 018.445.104c.117.057.221.135.306.23a.91.91 0 01.13 1.051.96.96 0 01-.24.292L3.7 5.712h15.277a1.042 1.042 0 01.721.27c.095.09.171.195.223.312a.913.913 0 01-.223 1.051 1.043 1.043 0 01-.721.271H.992z" />
			</g>
		</svg>
	);
};

export const Header: FC<{ title: string; onBack(): void }> = ({ title, onBack }) => {
	return (
		<div className={styles.component}>
			<div className={styles.back}>
				<Button className={styles.action} variant="text" onClick={onBack} icon={<Back />}>
					Back
				</Button>
			</div>
			<h2 className={styles.title}>{title}</h2>
		</div>
	);
};
