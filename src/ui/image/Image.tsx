import type { FC } from "react";
import { MaybeWithClassName } from "../../helper/react/types";

import { Source } from "./Source";
import type { ImageDefinition } from "./types";
import { toArray, toDPISrcSet } from "./utils";

type ImageType = {
	alt: string;
	priorityImage?: boolean;
	width: number;
	height: number;
} & ImageDefinition & {
		xs?: ImageDefinition;
		sm?: ImageDefinition;
	};

type ComponentType = ImageType & MaybeWithClassName;

export const Image: FC<ComponentType> = ({
	className,
	webp = [],
	img,
	width,
	height,
	alt,
	priorityImage,
	xs,
	sm,
}) => {
	const imagesBase = toArray(img);
	const imagesWebp = toArray(webp);
	return (
		<picture className={className}>
			{/* FIXME: use global media constants */}
			{xs && <Source images={xs} media="(max-width: 767px)" />}
			{sm && <Source images={sm} media="(max-width: 1023px)" />}
			{imagesWebp.length ? <source type="image/webp" srcSet={toDPISrcSet(imagesWebp)} /> : null}
			<img
				src={imagesBase[0]}
				srcSet={toDPISrcSet(imagesBase)}
				width={width}
				height={height}
				loading={priorityImage ? "eager" : "lazy"}
				alt={alt}
			/>
		</picture>
	);
};
