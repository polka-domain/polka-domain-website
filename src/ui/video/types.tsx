import { CSSProperties } from "react";
import { MaybeWithClassName } from "../../helper/react/types";

export type VideoType = {
	source: string;
	sourceHevc?: string;
	source264?: string;
	autoPlay?: boolean;
	loop?: boolean;
	style?: CSSProperties;

	onPlay?(): void;
} & MaybeWithClassName;
