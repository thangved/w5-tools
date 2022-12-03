import { Pagination, Typography } from "antd";
import { useState } from "react";
import { useContext } from "react";

import { TimeTable } from "~/providers/TimeTableProvider";
import autoGenTimeTables from "~/utils/autoGenTimeTables";
import GroupTable from "../GroupTable";

const GroupTableList = () => {
	const { courses } = useContext(TimeTable);

	const [tableIndex, setTableIndex] = useState(1);

	const timeTables = autoGenTimeTables(courses);

	return (
		<div>
			<Typography.Title level={4}>
				Bạn có {timeTables.length} thời khóa biểu phù hợp
			</Typography.Title>

			<Pagination
				total={timeTables.length}
				hideOnSinglePage
				pageSize={1}
				onChange={(page) => setTableIndex(page)}
			/>

			{timeTables[tableIndex - 1] && (
				<GroupTable timeTable={timeTables[tableIndex - 1]} />
			)}
		</div>
	);
};

export default GroupTableList;
