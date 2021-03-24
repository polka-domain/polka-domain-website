import { FC, RefObject, useCallback, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/use-intersection-observer";

import { Video } from "../video";
import type { VideoType } from "../video";

const closeEqual = (a: number[], b: number[]): boolean => {
	for (let i = 0; i < 3; ++i) {
		if (Math.abs(a[i] - b[i]) > 3) return false;
	}
	return true;
};

const getVideoSize = (video: HTMLVideoElement): [number, number] => [
	video.videoWidth || 100,
	video.videoHeight || 100,
];

function generateFrame(
	sync: boolean,
	video: HTMLVideoElement,
	tmp: HTMLCanvasElement,
	target: HTMLCanvasElement,
	tmpCanvas: CanvasRenderingContext2D,
	canvas: CanvasRenderingContext2D
) {
	const [width, height] = getVideoSize(video);
	// split processing into two frames to separate async rendering
	if (sync) {
		if (tmp.width !== width) {
			tmp.width = width;
			tmp.height = height;
			target.width = width;
			target.height = height;
		}

		tmpCanvas.drawImage(video, 0, 0, width, height);
	} else {
		const frame = tmpCanvas.getImageData(0, 0, width, height);
		const len = frame.data.length / 4;
		const transparentColor = [frame.data[0], frame.data[1], frame.data[2]];

		for (let i = 0; i < len; i++) {
			const offset = i * 4;
			const px = [frame.data[offset + 0], frame.data[offset + 1], frame.data[offset + 2]];
			if (closeEqual(px, transparentColor)) {
				frame.data[offset + 3] = 0;
			}
		}
		canvas.putImageData(frame, 0, 0);
	}
	return;
}

function videoTick(
	seq: boolean,
	video: HTMLVideoElement,
	tmp: HTMLCanvasElement,
	target: HTMLCanvasElement,
	tmpCanvas: CanvasRenderingContext2D,
	canvas: CanvasRenderingContext2D,
	pauseRef: RefObject<boolean>,
	cancelRef: RefObject<boolean>
) {
	if (video.paused || video.ended || cancelRef.current) {
		return;
	}
	if (!pauseRef.current) {
		generateFrame(seq, video, tmp, target, tmpCanvas, canvas);
	}
	requestAnimationFrame(() =>
		videoTick(!seq, video, tmp, target, tmpCanvas, canvas, pauseRef, cancelRef)
	);
}

const hidden = { display: "none" };

export const TransparentVideo: FC<VideoType> = ({ className, onPlay, ...props }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pauseRef = useRef<boolean>(true);

	// useEffect(() => {}, []);

	const onVideoPlay = useCallback(() => {
		if (onPlay) {
			onPlay();
		}
		pauseRef.current = false;
		const tmpCanvas = sourceCanvasRef.current!;
		const targetCanvas = canvasRef.current!;
		const video = videoRef.current!;

		const cancelRef = {
			current: false,
		};

		videoTick(
			false,
			video,
			tmpCanvas,
			targetCanvas,
			tmpCanvas.getContext("2d"),
			targetCanvas.getContext("2d"),
			pauseRef,
			cancelRef
		);
		return () => {
			cancelRef.current = true;
		};
	}, [onPlay]);

	useIntersectionObserver((visible) => {
		pauseRef.current = !visible;
	}, canvasRef);

	return (
		<>
			<Video {...props} ref={videoRef} style={hidden} onPlay={onVideoPlay} />
			<canvas ref={sourceCanvasRef} style={hidden} />
			<canvas className={className} ref={canvasRef} />
		</>
	);
};
