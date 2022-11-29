const exChange = (digit) => {
	let four = 4;
	let txt = "A";

	if (digit < 9) {
		four = 3.5;
		txt = "B+";
	}
	if (digit < 8) {
		four = 3;
		txt = "B";
	}
	if (digit < 7) {
		four = 2.5;
		txt = "C+";
	}
	if (digit < 6.5) {
		four = 2;
		txt = "C";
	}
	if (digit < 5.5) {
		four = 1.5;
		txt = "D+";
	}
	if (digit < 5) {
		four = 1;
		txt = "D";
	}
	if (digit < 4) {
		four = 0;
		txt = "F";
	}

	return {
		four,
		txt,
	};
};

export default exChange;
