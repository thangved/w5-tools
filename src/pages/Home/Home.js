import { Avatar, Card, List, Row } from "antd";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import CoverCalc from "../../assets/images/cover_calc.png";
import CoverTimeTable from "../../assets/images/cover_timetable.png";

const data = [
	{
		title: "Tính điểm",
		description: "Công cụ tính điểm trung bình học kỳ",
		path: "/grade",
		cover: CoverCalc,
	},
	{
		title: "Sắp thời khóa biểu",
		description: "Công cụ sắp thời khóa biểu dành cho sinh viên CTU",
		path: "/timetable",
		cover: CoverTimeTable,
	},
	{
		title: "Cập nhật",
		description: "Nhật ký thay đổi của ứng dụng",
		path: "/changelog",
		cover: null,
	},
];

const Home = () => {
	const navigate = useNavigate();
	return (
		<Row style={{ padding: "20px 0" }}>
			<Helmet>
				<title>Trang chủ | w5 tools</title>
			</Helmet>
			<List
				grid={{
					xs: 1,
					sm: 2,
					md: 4,
					lg: 4,
					xl: 6,
					xxl: 6,
				}}
				dataSource={data}
				renderItem={(item) => (
					<List.Item>
						<Card
							hoverable
							cover={
								item.cover && (
									<img src={item.cover} alt="cover" />
								)
							}
							onClick={() => navigate(item.path)}
						>
							<Card.Meta
								avatar={
									<Avatar src="https://github.com/thangved.png" />
								}
								title={item.title}
								description={item.description}
							></Card.Meta>
						</Card>
					</List.Item>
				)}
			/>
		</Row>
	);
};

export default Home;
