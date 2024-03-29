import { Button, Form, Input, List, message, Select, Tour } from 'antd';
import { useContext, useEffect, useState } from 'react';
import RequestAddCourseModal from '~/components/RequestAddCourseModal';

import useDelay from '~/hooks/useDelay';
import { TimeTable } from '~/providers/TimeTableProvider';
import request from '~/utils/request';

import tourSteps from './tourSteps';

const Search = () => {
	const { yearList, year, semester, setYear, setSemester, addCourse } =
		useContext(TimeTable);

	const [courses, setCourses] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [searched, setSearched] = useState(false);

	const [openTour, setOpenTour] = useState(false);

	const delayKeyword = useDelay(keyword);

	useEffect(() => {
		if (!delayKeyword) return;
		const search = async () => {
			const hideMessage = message.loading('Đang tìm kiếm học phần', 0);
			try {
				const res = await request.get(`courses/search/${delayKeyword}`);

				setCourses(res.data);
			} catch (error) {
			} finally {
				setSearched(true);
				hideMessage();
			}
		};

		search();
	}, [delayKeyword]);

	const SelectYear = (
		<>
			<Select
				placeholder="Năm học"
				value={year}
				loading={!yearList.length}
				id="select-year"
				onChange={setYear}
			>
				{yearList.map((y) => (
					<Select.Option value={y.value} key={y.value}>
						{y.year}
					</Select.Option>
				))}
			</Select>
			<Select
				placeholder="Học kỳ"
				value={semester}
				loading={!yearList.length}
				id="select-semester"
				onChange={setSemester}
			>
				{yearList
					.filter((y) => y.value === year)[0]
					?.semester.map((s) => (
						<Select.Option value={s} key={s}>
							{s}
						</Select.Option>
					))}
			</Select>
		</>
	);

	return (
		<Form
			style={{
				width: '100%',
				padding: 10,
			}}
		>
			<Button
				style={{ marginBottom: 5 }}
				size="small"
				type="primary"
				onClick={() => setOpenTour(!openTour)}
			>
				Hướng dẫn
			</Button>
			<Form.Item
				style={{
					width: '100%',
				}}
			>
				<Input.Group>
					<Input
						id="search-container"
						autoFocus
						addonBefore={SelectYear}
						value={keyword}
						placeholder="Nhập tên hoặc mã học phần"
						style={{
							width: '100%',
						}}
						onChange={(event) => setKeyword(event.target.value)}
					/>
				</Input.Group>
			</Form.Item>
			<Form.Item>
				<List
					id="course-list"
					pagination={{ pageSize: 9, hideOnSinglePage: true }}
					dataSource={courses}
					renderItem={(course) => (
						<List.Item
							actions={[
								<Button
									type="link"
									onClick={() => addCourse(course)}
								>
									Thêm
								</Button>,
							]}
						>
							<List.Item.Meta
								title={course.name}
								description={course.key}
							/>
						</List.Item>
					)}
				/>
			</Form.Item>
			{searched && <RequestAddCourseModal />}

			<Tour
				open={openTour}
				steps={tourSteps}
				onClose={() => setOpenTour(false)}
			/>
		</Form>
	);
};

export default Search;
