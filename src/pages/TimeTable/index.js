import { Col, Row } from "antd";
import { Helmet } from "react-helmet";

import TimeTableProvider from "~/providers/TimeTableProvider";
import CourseList from "./CourseList";
import GroupTableList from "./GroupTableList";
import Search from "./Search";

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
					<CourseList />
					<GroupTableList />
				</Col>
			</Row>
		</TimeTableProvider>
	);
};

export default TimeTable;
