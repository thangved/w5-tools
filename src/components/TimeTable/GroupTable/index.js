import { Alert, Table, Typography } from 'antd';
import { useContext } from 'react';
import { TimeTable } from '../../../providers/TimeTableProvider';
import Print from './Print';

const columns = [
	{
		title: 'Tiết',
		dataIndex: '0',
		key: '0',
		width: 50,
		fixed: 'left',
	},
	{
		title: 'Thứ 2',
		dataIndex: '1',
		key: '1',
		with: 100,
	},
	{
		title: 'Thứ 3',
		dataIndex: '2',
		key: '2',
		with: 100,
	},
	{
		title: 'Thứ 4',
		dataIndex: '3',
		key: '3',
		with: 100,
	},
	{
		title: 'Thứ 5',
		dataIndex: '4',
		key: '4',
		with: 100,
	},
	{
		title: 'Thứ 6',
		dataIndex: '5',
		key: '5',
		with: 100,
	},
	{
		title: 'Thứ 7',
		dataIndex: '6',
		key: '6',
		with: 100,
	},
];

const GroupTable = () => {
	const { matrix } = useContext(TimeTable);

	return (
		<>
			<Alert
				message='Thời khóa biểu'
				key='-1'
				action={[<Print matrix={matrix} />]}
			/>

			<div
				style={{
					maxWidth: 'calc(100vw - 100px)',
					overflow: 'auto',
				}}
			>
				<Alert
					key='0'
					message={
						<Typography.Title level={4}>Buổi sáng</Typography.Title>
					}
				/>
				<Table
					bordered
					size='small'
					scroll={{ x: 1050, y: '100vh' }}
					dataSource={matrix.slice(0, 5)}
					columns={columns}
					pagination={false}
				/>
				<Alert
					key='2'
					message={
						<Typography.Title level={4}>
							Buổi chiều
						</Typography.Title>
					}
				/>
				<Table
					bordered
					size='small'
					scroll={{ x: 1050, y: '100vh' }}
					dataSource={matrix.slice(5, 9)}
					columns={columns}
					pagination={false}
				/>
				<Alert
					key='4'
					message={
						<Typography.Title level={4}>Buổi tối</Typography.Title>
					}
				/>
				<Table
					bordered
					size='small'
					scroll={{ x: 1050, y: '100vh' }}
					dataSource={matrix.slice(9)}
					columns={columns}
					pagination={false}
				/>
			</div>
		</>
	);
};

export default GroupTable;

