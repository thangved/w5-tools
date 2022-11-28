import { Avatar, Card, Col, Row } from "antd";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import CoverCalc from "../../assets/images/cover_calc.png";
import CoverTimeTable from "../../assets/images/cover_timetable.png";

const Home = () => {
	const navigate = useNavigate();
	return (
		<Row>
			<Helmet>
				<title>Trang chủ | w5 tools</title>
			</Helmet>
			<Col lg={4} xs={24} style={{ margin: 5 }}>
				<Card
					hoverable
					cover={<img src={CoverCalc} alt="cover" />}
					onClick={() => navigate("/grade")}
				>
					<Card.Meta
						avatar={
							<Avatar src="https://github.com/thangved.png" />
						}
						title="Tính điểm"
						description="Công cụ tính điểm trung bình học kỳ"
					></Card.Meta>
				</Card>
			</Col>

			<Col lg={4} xs={24} style={{ margin: 5 }}>
				<Card
					hoverable
					cover={<img src={CoverTimeTable} alt="cover" />}
					onClick={() => navigate("/timetable")}
				>
					<Card.Meta
						avatar={
							<Avatar src="https://github.com/thangved.png" />
						}
						title="Sắp thời khóa biểu"
						description="Công cụ sắp thời khóa biểu dành cho sinh viên CTU"
					></Card.Meta>
				</Card>
			</Col>

			<Col lg={4} xs={24} style={{ margin: 5 }}>
				<Card hoverable onClick={() => navigate("/changelog")}>
					<Card.Meta
						avatar={
							<Avatar src="https://github.com/thangved.png" />
						}
						title="Cập nhật"
						description="Nhật ký cập nhật của ứng dụng"
					></Card.Meta>
				</Card>
			</Col>
		</Row>
	);
};

export default Home;
