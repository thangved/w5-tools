import { Button, Form, Input, List, message, Spin } from 'antd';
import { useState } from 'react';
import axios from 'axios';

import { AppConfigs } from '../../../configs/AppConfigs';
import InsertModal from '../InsertModal/index';
import { SearchOutlined } from '@ant-design/icons/lib/icons';

const Search = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [insert, setInsert] = useState({
		visible: false,
		course: {},
	});

	const onSearch = () => {
		if (keyword.length < 3)
			return message.warn('Vui lòng nhập ít nhất 3 ký tự');
		if (loading) return;
		message.loading('Đang tìm kiếm', 1);
		setLoading(true);
		axios
			.get(`${AppConfigs.APIURL}/courses/search/${keyword}`)
			.then(({ data }) => {
				setLoading(false);
				if (!data) return;
				setCourses(data);
				message.success(`Đã tìm thấy ${data.length} kết quả`);
			})
			.catch((err) => setLoading(false));
	};

	return (
		<Form style={{ width: '100%' }}>
			<Form.Item style={{ width: '100%' }}>
				<Input.Group style={{ width: '100%' }} compact>
					<Input
						style={{
							width: `calc(100% - 120px)`,
						}}
						placeholder="Tìm kiếm học phần"
						onChange={(event) => setKeyword(event.target.value)}
						onKeyPress={(event) => {
							if (event.key === 'Enter') onSearch();
						}}
					/>
					<Button
						icon={<SearchOutlined />}
						type="primary"
						loading={loading}
						onClick={onSearch}>
						Tìm kiếm
					</Button>
				</Input.Group>
			</Form.Item>
			<Form.Item>
				{loading && (
					<div
						style={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							background: '#ffffff90',
							zIndex: 100,
						}}
					>
						<Spin />
					</div>
				)}
				<List
					pagination={{ pageSize: 9 }}
					dataSource={courses}
					renderItem={(course) => (
						<List.Item
							actions={[
								<Button
									type="link"
									onClick={() => {
										setInsert({
											course,
											visible: true,
										});
									}}
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
			<InsertModal
				visible={insert.visible}
				course={insert.course}
				onClose={() =>
					setInsert((prev) => ({ ...prev, visible: false }))
				}
			/>
		</Form>
	);
};

export default Search;
