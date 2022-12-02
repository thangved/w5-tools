import { useContext } from "react";

import { TimeTable } from "~/providers/TimeTableProvider";
import autoGenTimeTables from "~/utils/autoGenTimeTables";
import GroupTable from "../GroupTable";

const GroupTableList = () => {
	const { courses } = useContext(TimeTable);

	const timeTables = autoGenTimeTables(courses);

	return (
		<div>
			{timeTables.map((timeTable, index) => (
				<GroupTable key={index} timeTable={timeTable} />
			))}
		</div>
	);
};

export default GroupTableList;
