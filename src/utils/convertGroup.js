export default function convertGroup(group) {
	group = JSON.parse(JSON.stringify(group));
	group.time = group.time.map((time) => {
		time.start = parseInt(time.start);
		time.count = parseInt(time.count);
		time.day = parseInt(time.day);

		const arr = [];
		const matrix = [];

		for (let i = 0; i < time.count; i++) {
			arr.push(i + time.start);
			matrix.push({
				x: i + time.start - 1,
				y: time.day - 1,
			});
		}

		time.count = arr;
		time.matrix = matrix;

		return time;
	});
	return group;
}
