/* eslint-disable jsx-a11y/iframe-has-title */
import {
	Alert,
	Avatar,
	Button,
	Card,
	Col,
	Image,
	Modal,
	Row,
	Typography,
} from 'antd';
import { Helmet } from 'react-helmet';
import { FacebookFilled, InfoCircleFilled } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';
import cryImage from '~/assets/images/cry.jpg';
import ctuExtensionIcon from '~/assets/images/icon-384x384.png';
import TimeTableProvider from '~/providers/TimeTableProvider';
import CourseList from './CourseList';
import GroupTableList from './GroupTableList';
import Search from './Search';

const TimeTable = () => {
	const [closed, setClosed] = useState(false);

	return (
		<>
			<TimeTableProvider>
				<Helmet>
					<title>Công cụ sắp thời khóa biểu | w5 tools</title>
				</Helmet>
				<Row style={{ overflow: 'hidden' }}>
					<Col lg={24} md={24} xs={24} style={{ padding: 5 }}>
						<Alert
							type="error"
							icon={<InfoCircleFilled />}
							showIcon
							message="Thông báo quan trọng"
							onClick={() => setClosed(false)}
							action={
								<Button type="primary" danger>
									Xem
								</Button>
							}
						/>
					</Col>
					<Col lg={8} md={8} xs={24}>
						<Search />
					</Col>
					<Col lg={16} md={16} xs={24} style={{ overflow: 'hidden' }}>
						<CourseList />
						<GroupTableList />
					</Col>
				</Row>
			</TimeTableProvider>

			<Modal
				title="Thông báo quan trọng"
				centered
				closable={false}
				open={!closed}
				footer={false}
				onCancel={() => setClosed(true)}
			>
				<Typography.Title level={3} type="danger">
					Hiện tại công cụ này không khả dụng!
				</Typography.Title>

				<Typography.Paragraph>
					Vì một số lý do nên hiện tại mình không thể tiếp tục duy trì
					công cụ này. Bạn có thể sử dụng chrome extension sau đây để
					thay thế:
				</Typography.Paragraph>

				<Typography.Paragraph>
					<Link
						href="https://chrome.google.com/webstore/detail/ctu-extension/lggkifjaacghbpebpcbaneimpogjbnmf?hl=en-US"
						target="_blank"
					>
						<Card bordered hoverable>
							<Card.Meta
								avatar={
									<Avatar src={ctuExtensionIcon} size={100} />
								}
								title="CTU Extension"
								description="Sắp thời khóa biểu dành cho sinh viên CTU và nhiều hơn thế nữa"
							>
								Hello
							</Card.Meta>
						</Card>
					</Link>
				</Typography.Paragraph>

				<Typography.Paragraph>
					<Typography.Link
						href="https://www.facebook.com/100062234641172/videos/733988775191872/"
						target="_blank"
					>
						<Alert
							message="Hướng dẫn sử dụng"
							showIcon
							icon={<FacebookFilled />}
						/>
					</Typography.Link>
				</Typography.Paragraph>

				<Typography.Paragraph>
					<Image
						src={cryImage}
						preview={false}
						style={{ borderRadius: 5 }}
					/>
				</Typography.Paragraph>
			</Modal>
		</>
	);
};

export default TimeTable;
