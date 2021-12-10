import { DeleteOutlined } from '@ant-design/icons/lib/icons';
import { Button, Descriptions, Popconfirm, Progress, Space, Table } from 'antd';
import { useContext, useState } from 'react';

import { Grade } from '../../../providers/GradeProvider';

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
		<Space
			direction="vertical"
			style={{
				width: '100%'
			}}>
			<Popconfirm
				title={`Bạn chắc chắn muốn xóa ${selected.length} học phần?`}
				disabled={selected.length === 0 || courses.length === 0}
				placement="bottom"
				okText="Xóa"
				okType="danger"
				cancelText="Hủy"
				onConfirm={() => removeCourses(selected)}
			>
				<Button
					danger
					icon={<DeleteOutlined />}
					disabled={selected.length === 0 || courses.length === 0}
				>
					Xóa
				</Button>
			</Popconfirm>
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
					pagination={{ pageSize: 9 }}
					dataSource={courses}
					columns={columns}
				/>
			</div>
			<Descriptions
				layout="vertical"
				bordered>
				<Descriptions.Item
					span={100}
					key="avg"
					label="Điểm trung bình">
					<Progress
						strokeColor={{
							'0%': '#108ee9',
							'100%': '#87d068',
						}}
						type="circle"
						percent={avg * 100 / 4}
						format={percent => {
							return `${percent * 4 / 100}/4`
						}}
					/>
				</Descriptions.Item>
				{
					courses.map(course => (
						<Descriptions.Item
							span={1}
							key={course.key}
							label={course.name}>
							<Progress
								type="circle"
								percent={course.four * 100 / 4}
								format={percent => {
									return `${percent * 4 / 100}/4`
								}}
							/>
						</Descriptions.Item>
					))
				}
			</Descriptions>
		</Space>
	);
};

export default CoursesTable;
