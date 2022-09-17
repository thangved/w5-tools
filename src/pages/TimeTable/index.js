import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import TimeTableProvider from "../../providers/TimeTableProvider";
import GroupTable from "./GroupTable";
import Search from "./Search/index";

const TimeTable = () => {
	return (
		<TimeTableProvider>
			<Helmet>
				<title>Công cụ sắp thời khóa biểu | w5 tools</title>
			</Helmet>
			<Row style={{ overflow: "hidden" }}>
				<Col lg={8} md={8} xs={24}>
					<Search />
				</Col>
				<Col lg={16} md={16} xs={24} style={{ overflow: "hidden" }}>
					<GroupTable />
				</Col>
			</Row>
		</TimeTableProvider>
	);
};

export default TimeTable;
