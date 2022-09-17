import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import GradeProvider from "../../providers/GradeProvider";
import CoursesTable from "./CoursesTable";
import Search from "./Search/index";

const Grade = () => {
	return (
		<GradeProvider>
			<Helmet>
				<title>Công cụ tính điểm trung bình | w5 tools</title>
			</Helmet>
			<Row
				style={{
					padding: 10,
				}}
			>
				<Col lg={8} md={8} xs={24}>
					<Search />
				</Col>
				<Col lg={16} md={16} xs={24}>
					<CoursesTable />
				</Col>
			</Row>
		</GradeProvider>
	);
};

export default Grade;
