import { Pagination, Typography } from "antd";
import { useContext } from "react";

import { TimeTable } from "~/providers/TimeTableProvider";
import autoGenTimeTables from "~/utils/autoGenTimeTables";
import GroupTable from "../GroupTable";

const GroupTableList = () => {
	const { courses, changePage, selectedPage } = useContext(TimeTable);

	const timeTables = autoGenTimeTables(courses);

	return (
		<div>
			<Typography.Title level={4}>
				Bạn có {timeTables.length} thời khóa biểu phù hợp
			</Typography.Title>

			<Pagination
				total={timeTables.length}
				pageSize={1}
				current={selectedPage}
				onChange={(page) => changePage(page)}
			/>

			{timeTables[selectedPage - 1] && (
				<GroupTable timeTable={timeTables[selectedPage - 1]} />
			)}
		</div>
	);
};

export default GroupTableList;
