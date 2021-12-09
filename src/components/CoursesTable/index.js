import { Affix, Button, Statistic, Table } from 'antd';
import { useContext, useState } from 'react';

import { Grade } from './../../providers/GradeProvider';

const columns = [
	{
		title: 'Mã học phần',
		dataIndex: 'key',
		key: 'key',
	},
	{
		title: 'Tên học phần',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Số tín chỉ',
		dataIndex: 'weight',
		key: 'weight',
	},
	{
		title: 'Điểm thang 10',
		dataIndex: 'digit',
		key: 'digit',
	},
	{
		title: 'Điểm thang 4',
		dataIndex: 'four',
		key: 'four',
	},
	{
		title: 'Điểm chữ',
		dataIndex: 'txt',
		key: 'txt',
	},
];

const CoursesTable = () => {
	const { courses, avg, removeCourses } = useContext(Grade);
	const [selected, setSelected] = useState([]);

	return (
		<>
			<Button
				disabled={selected.length === 0}
				type="primary"
				onClick={() => removeCourses(selected)}
			>
				Xóa
			</Button>
			<Affix>
				<div
					style={{
						width: '100%',
						overflow: 'auto',
					}}
				>
					<Table
						rowSelection={{
							selectedRowKeys: selected,
							onChange: (keys) => setSelected(keys),
						}}
						pagination={{ pageSize: 10 }}
						dataSource={courses}
						columns={columns}
					/>
				</div>
				<Statistic title="Điểm trung bình" value={avg || 0} />
			</Affix>
		</>
	);
};

export default CoursesTable;
