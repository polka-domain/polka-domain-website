import { CSSProperties, forwardRef, useEffect, useRef, useState } from "react";
import { useMergeRefs } from "use-callback-ref";
import { VideoType } from "./types";

export const Video = forwardRef<HTMLVideoElement, VideoType>(
	(
		{ className, style, source, sourceHevc, source264, autoPlay, loop, onPlay, imageSource },
		ref
	) => {
		const videoRef = useRef<HTMLVideoElement>(null);
		const [imageFallback, setImageFallback] = useState(true);

		useEffect(() => {
			if (videoRef.current && onPlay) {
				if (!videoRef.current.paused) {
					onPlay();
				} else {
					videoRef.current.addEventListener("play", onPlay);
				}
			}
		}, [onPlay]);

		useEffect(() => {
			if (autoPlay && videoRef.current) {
				videoRef.current.play().then(
					() => {
						console.log("video is playing");
						setImageFallback(false);
					},
					(error) => {
						console.error("Error attempting to play", error);
					}
				);
			}
		}, [autoPlay]);

		const imageStyles = {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,

			width: "100%",
			height: "100%",

			objectFit: "contain",
		};

		return (
			<div className={className}>
				<video
					muted
					autoPlay={autoPlay}
					loop={loop}
					playsInline
					ref={useMergeRefs([videoRef, ref])}
					style={style}
				>
					<source src={source} type="video/mp4" />
					{sourceHevc && <source src={sourceHevc} type="video/mp4; codecs=hevc,mp4a.40.2" />}
					{source264 && <source src={source264} type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />}
				</video>
				{imageFallback && (
					<img
						src={imageSource}
						width="100%"
						height="100%"
						alt="Placeholder"
						style={imageStyles as CSSProperties}
					/>
				)}
			</div>
		);
	}
);
