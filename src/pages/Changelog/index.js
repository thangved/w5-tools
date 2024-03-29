import { HistoryOutlined } from '@ant-design/icons';
import { Avatar, Divider, List, Typography, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Changelog = () => {
	const [logList, setLogList] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					'https://api.github.com/repos/thangved/w5-tools/commits'
				);

				setLogList(res.data);
			} catch (error) {
				notification.error({
					message: 'Lỗi',
					description: error.message,
				});
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<Content style={{ padding: 10 }}>
			<Helmet>
				<title>Nhật ký thay đổi</title>
			</Helmet>

			<Typography.Title level={2}>
				<HistoryOutlined /> Nhật ký thay đổi
			</Typography.Title>

			<Divider />

			<List
				loading={loading}
				bordered
				header="Nhật ký thay đổi"
				dataSource={logList}
				itemLayout="horizontal"
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={item.committer.avatar_url} />}
							title={
								<a
									size="small"
									target="_blank"
									rel="noreferrer"
									href={item.html_url}
									style={{ marginRight: 2 }}
								>
									{item.commit.message} - {item.sha}
								</a>
							}
							description={item.committer.login}
						/>
					</List.Item>
				)}
			/>
		</Content>
	);
};

export default Changelog;
