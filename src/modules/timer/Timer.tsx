import React, { FC, useEffect, useState } from "react";

import { toDeltaTimer } from "../../utils/page/time";

export const Timer: FC<{ timer: number }> = ({ timer }) => {
	const [time, setTime] = useState(toDeltaTimer(timer));

	useEffect(() => {
		const tm = setInterval(() => setTime(toDeltaTimer(timer)), 1000);
		return () => clearInterval(tm);
	});

	return <>{time}</>;
};
