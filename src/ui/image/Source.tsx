import type { FC } from "react";

import type { ImageDefinition } from "./types";
import { toArray, toDPISrcSet } from "./utils";

type SourceType = {
	images: ImageDefinition;
	media: string;
};

export const Source: FC<SourceType> = ({ images, media }) => {
	const imagesBase = toArray(images.img);
	const imagesWebp = toArray(images.webp);
	return (
		<>
			{imagesWebp.length ? (
				<source media={media} type="image/webp" srcSet={toDPISrcSet(imagesWebp)} />
			) : null}
			<source media={media} srcSet={toDPISrcSet(imagesBase)} />
		</>
	);
};
