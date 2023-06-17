import { useEffect, useState } from 'react';

const useDelay = (value) => {
	const [delayValue, setDelayValue] = useState();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDelayValue(value);
		}, 500);

		return () => clearTimeout(timeout);
	}, [value]);
	return delayValue;
};

export default useDelay;
