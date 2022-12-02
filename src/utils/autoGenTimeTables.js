export default function autoGenTimeTables(courses = []) {
	if (!courses.length) return [];

	let defaultTimeTables = courses[0].groups.map((e) => [e]);

	let tmp = [];

	for (const course of courses.slice(1)) {
		tmp = [];
		for (const timeTable of defaultTimeTables) {
			for (const group1 of course.groups) {
				let conflict = false;

				for (const group2 of timeTable) {
					for (const time1 of group1.time) {
						for (const time2 of group2.time) {
							const start1 = time1.start;
							const start2 = time2.start;

							const end1 = time1.end;
							const end2 = time2.end;

							if (start1 >= start2 && start1 <= end2)
								conflict = true;

							if (start2 >= start1 && start2 <= end1)
								conflict = true;
						}
					}
				}

				if (!conflict) {
					tmp.push([...timeTable, group1]);
				}
			}
		}
		defaultTimeTables = tmp;
	}

	return defaultTimeTables;
}
