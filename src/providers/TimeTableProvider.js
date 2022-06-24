import { Alert, Button, message, Popconfirm } from 'antd';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { AppConfigs } from '../configs/AppConfigs';
import { initMatrix } from './initMatrix';

export const TimeTable = createContext({
	groups: [
		{
			key: '',
			id: '',
			teacher: '',
			class: '',
			member: '',
			name: '',
			weight: '',
			week: '',
			time: [
				{
					day: 0,
					start: 0,
					count: [],
					room: '',
					matrix: [
						{
							x: 0,
							y: 0,
						},
					],
				},
			],
		},
	],
	yearList: [
		{
			year: '',
			value: '',
			semester: [],
		},
	],
	year: '',
	semester: '',
	matrix: [{}],
	setYear: Function,
	setSemester: Function,
	addGroup: Function,
});

const TimeTableProvider = ({ children }) => {
	const [groups, setGroups] = useState(() => {
		return JSON.parse(localStorage.getItem('groups') || '[]') || [];
	});

	const [yearList, setYearList] = useState([]);
	const [year, setYear] = useState(null);
	const [semester, setSemester] = useState(null);
	const [matrix, setMatrix] = useState(initMatrix());

	const addGroup = (group) => {
		setGroups((prev) => [
			...prev.filter(
				(e) => e.key !== group.key && e.class !== group.class,
			),
			convert(group),
		]);

		function convert(group) {
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
	};

	const deleteGroup = (classKey) => {
		setGroups((prevGroups) => [
			...prevGroups.filter((group) => group.class !== classKey),
		]);
	};

	useEffect(() => {
		axios.get(`${AppConfigs.APIURL}/courses/yearlist`).then(({ data }) => {
			if (!data) return;
			setYearList(data);

			setYear(
				localStorage.getItem('year') ||
					data.find((year) =>
						year.value.startsWith(
							new Date().getFullYear() ||
								localStorage.getItem('year'),
						),
					).value,
			);

			setSemester(localStorage.getItem('semester') || 1);
		});
	}, []);

	useEffect(() => {
		localStorage.setItem('groups', JSON.stringify(groups));

		setMatrix((prevMatrix) => {
			prevMatrix = initMatrix();
			groups.forEach((group) => {
				group.time.forEach((time) => {
					time.matrix.forEach((position) => {
						if (prevMatrix[position.x][position.y]) {
							deleteGroup(group.class);
							return message.error(
								`Không thể thêm học phần ${group.name} do trùng lịch!`,
							);
						}
						prevMatrix[position.x][position.y] = (
							<Alert
								action={[
									<Popconfirm
										title='Bạn muốn xóa'
										okText='Xóa'
										okType='danger'
										cancelText='Hủy'
										onConfirm={() =>
											deleteGroup(group.class)
										}
									>
										<Button type='link' danger size='small'>
											Xóa
										</Button>
									</Popconfirm>,
								]}
								message={
									<div>
										<strong>{group.name}</strong>
										<div>{group.class}</div>
										<div>
											Nhóm <strong>{group.id}</strong>
										</div>
										<div>
											Phòng <strong>{time.room}</strong>
										</div>
									</div>
								}
							/>
						);
					});
				});
			});

			return [...prevMatrix];
		});
	}, [groups]);

	return (
		<TimeTable.Provider
			value={{
				yearList,
				year,
				semester,
				groups,
				matrix,
				setYear: (year) => {
					setYear(year);
					localStorage.setItem('year', year);
				},
				setSemester: (semester) => {
					setSemester(semester);
					localStorage.setItem('semester', semester);
				},
				addGroup,
			}}
		>
			{children}
		</TimeTable.Provider>
	);
};

export default TimeTableProvider;

