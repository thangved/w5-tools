function checkConflict(group1, timeTable) {
	let conflict = false;

	for (const group2 of timeTable) {
		for (const time1 of group1.time) {
			for (const time2 of group2.time) {
				const start1 = time1.start;
				const start2 = time2.start;

				const end1 = time1.end;
				const end2 = time2.end;

				if (start1 >= start2 && start1 <= end2) conflict = true;

				if (start2 >= start1 && start2 <= end1) conflict = true;
			}
		}
	}
	return conflict;
}

export default function autoGenTimeTables(courses = []) {
	if (!courses.length) return [];

	let defaultTimeTables = courses[0].groups
		.map((_, index) => [_, index])
		.filter(
			([e]) =>
				courses[0].actives.includes(e.class) ||
				!courses[0].actives.length
		)
		.map(([_, i]) => [i]);

	let tmp = [];

	for (const course of courses.slice(1)) {
		tmp = [];

		for (const i of defaultTimeTables) {
			if (!course.groups.length) {
				tmp.push([...i, -1]);
				continue;
			}
			const timeTable = i
				.map((e, i) => courses[i].groups[e])
				.filter((e) => e);

			for (let j = 0; j < course.groups.length; j++) {
				const group1 = course.groups[j];
				if (
					course.actives.length &&
					!course.actives.includes(group1.class)
				)
					continue;
				if (!checkConflict(group1, timeTable)) {
					tmp.push([...i, j]);
				}
			}
		}
		defaultTimeTables = tmp;
	}

	return defaultTimeTables;
}
