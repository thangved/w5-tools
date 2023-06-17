import { message } from 'antd';
import { createContext, useEffect, useState } from 'react';

import request from '~/utils/request';

export const TimeTable = createContext({
	yearList: [
		{
			year: '',
			value: '',
			semester: [],
		},
	],
	year: '',
	semester: '',
	setYear: Function,
	setSemester: Function,
	courses: [],
	addCourse: Function,
	deleteCourse: Function,
	activeGroups: Function,
	synced: false,
	selectedPage: 1,
	changePage: Function,
});

const TimeTableProvider = ({ children }) => {
	const [yearList, setYearList] = useState([]);
	const [year, setYear] = useState(localStorage.getItem('year'));
	const [semester, setSemester] = useState(localStorage.getItem('semester'));
	const [courses, setCourses] = useState(() => {
		return (
			JSON.parse(localStorage.getItem('timetable-courses') || '[]') || []
		);
	});
	const [synced, setSynced] = useState(false);
	const [selectedPage, setSelectedPage] = useState(
		() => JSON.parse(localStorage.getItem('timetable-selected-page')) || 1
	);

	useEffect(() => {
		request.get(`courses/yearlist`).then(({ data }) => {
			if (!data) return;
			setYearList(data);

			setYear(
				localStorage.getItem('year') ||
					data.find((year) =>
						year.value.startsWith(
							new Date().getFullYear() ||
								localStorage.getItem('year')
						)
					).value
			);

			setSemester(localStorage.getItem('semester') || 1);
		});
	}, []);

	const addCourse = async (course) => {
		if (courses.some((e) => e.detail.key === course.key))
			return message.warning('Học phần này đã được thêm từ trước');

		const hideMessage = message.loading('Đang lấy dữ liệu học phần', 0);

		try {
			const groups = (
				await request.get(`courses/key/${course.key}`, {
					params: {
						y: year,
						n: semester,
					},
				})
			).data;

			setCourses((prev) => [
				...prev,
				{ detail: course, groups, actives: [] },
			]);
		} finally {
			hideMessage();
		}
	};

	const deleteCourse = (key) => {
		setCourses((prev) =>
			prev.filter((course) => course.detail.key !== key)
		);
	};

	const activeGroups = (key, groupIds) => {
		setCourses((courses) => {
			courses = courses.map((course) => {
				if (course.detail.key === key) {
					course.actives = groupIds;
				}
				return course;
			});

			return courses;
		});
	};

	useEffect(() => {
		localStorage.setItem('timetable-courses', JSON.stringify(courses));
	}, [courses]);

	useEffect(() => {
		if (!year || !semester) return;

		const syncing = async () => {
			setSynced(false);
			try {
				for (const course of courses) {
					const res = await request.get(
						`/courses/key/${course.detail.key}`,
						{
							params: {
								y: year,
								n: semester,
							},
						}
					);

					if (res.data?.length) {
						course.groups = res.data;
					}
				}

				setCourses([...courses]);
			} catch (error) {
			} finally {
				setSynced(true);
			}
		};

		syncing();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, semester]);

	return (
		<TimeTable.Provider
			value={{
				yearList,
				year,
				semester,
				setYear: (year) => {
					setYear(year);
					localStorage.setItem('year', year);
				},
				setSemester: (semester) => {
					setSemester(semester);
					localStorage.setItem('semester', semester);
				},
				courses,
				addCourse,
				deleteCourse,
				activeGroups,
				synced,
				selectedPage,
				changePage: (page) => {
					setSelectedPage(page);
					localStorage.setItem(
						'timetable-selected-page',
						JSON.stringify(page)
					);
				},
			}}
		>
			{children}
		</TimeTable.Provider>
	);
};

export default TimeTableProvider;
