import classNames from "classnames";
import { FC, useRef, useState } from "react";

import styles from "./Promo.module.scss";
import { MaybeWithClassName } from "../../../../helper/react/types";
import { GutterBox } from "../../../../ui/gutter-box";
import { Body1, Heading1 } from "../../../../ui/typography";
import { TextColor } from "../../../../ui/text-color";
import { Video } from "../../../../ui/video";
import { useIntersectionObserver } from "../../../../hooks/use-intersection-observer";

import video from "./assets/video.mp4";
import image from "./assets/image.jpg";

type PromoType = {};

export const Promo: FC<PromoType & MaybeWithClassName> = ({ className }) => {
	const [unblocked, setUnblocked] = useState(false);
	const videoRef = useRef<HTMLDivElement>(null);

	useIntersectionObserver(
		(isVisible) => {
			if (isVisible) {
				setUnblocked(true);
			}
		},
		videoRef,
		{
			rootMargin: "0% 0% -5% 0%",
		}
	);

	return (
		<section className={classNames(className, styles.component)}>
			<GutterBox className={styles.wrapper}>
				<Heading1 className={styles.title}>
					Take Ownership of
					<br />
					<TextColor color="pink">Your Digital Identity</TextColor> and Assets
				</Heading1>
				<Body1 className={styles.text} lighten={90}>
					We are the decentralized, privacy preserving blockchain DNS and NFT marketplace built on
					Polkadot.
				</Body1>
				<form className={styles.form}>
					<label className={styles.input}>
						<span className={styles.label}>Connect to the domain specific to you</span>
						<input type="text" placeholder="Connect to the domain specific to you" disabled />
					</label>
					<button className={styles.submit} type="submit" disabled>
						Coming soon
					</button>
				</form>
				<div className={styles.videoWrapper} ref={videoRef}>
					<Video
						className={styles.video}
						source={video}
						autoPlay={unblocked}
						imageSource={image}
						loop
					/>
				</div>
			</GutterBox>
		</section>
	);
};
