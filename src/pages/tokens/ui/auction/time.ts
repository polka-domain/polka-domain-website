const formatTime = (d: number, h: number, m: number, s: number) => `${d}d : ${h}h : ${m}m : ${s}s`;

export const toDeltaTimer = (time: number, to = Date.now()) => {
	const correctedTime = time * 1000;
	const delta = /*14*24*60*60*1000 -*/ (correctedTime - to) / 1000;

	if (delta < 0) {
		return formatTime(0, 0, 0, 0);
	}

	let d = Math.floor(delta / (60 * 60 * 24));
	let h = Math.floor((delta / (60 * 60)) % 24);
	let m = Math.floor((delta / 60) % 60);
	let s = Math.floor(delta % 60);
	return formatTime(d, h, m, s);
};
