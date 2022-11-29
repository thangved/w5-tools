import { PrinterFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useCallback, useContext, useRef } from "react";
import ReactToPrint from "react-to-print";

import { TimeTable } from "../../../providers/TimeTableProvider";
import ExportJson from "./ExportJson";
import styles from "./GroupTable.module.scss";
import TableCell from "./TableCell";

const GroupTable = () => {
	const { matrix } = useContext(TimeTable);

	const reactPrintTrigger = useCallback(
		() => <Button icon={<PrinterFilled />}>In</Button>,
		[]
	);

	const tableRef = useRef();

	const reactPrintContent = () => tableRef.current;

	return (
		<div
			style={{
				overflowX: "auto",
			}}
			id="timetable-main"
		>
			<div style={{ padding: "10px 0" }}>
				<ReactToPrint
					trigger={reactPrintTrigger}
					content={reactPrintContent}
				/>
				<ExportJson />
			</div>
			<table className={styles.table} ref={tableRef}>
				<thead>
					<tr>
						<th className={styles.leftCol}>Tiết</th>
						<th>Thứ 2</th>
						<th>Thứ 3</th>
						<th>Thứ 4</th>
						<th>Thứ 5</th>
						<th>Thứ 6</th>
						<th>Thứ 7</th>
					</tr>
				</thead>
				<tbody>
					{matrix.map((row, rIndex) => (
						<React.Fragment key={rIndex}>
							<tr>
								<td className={styles.leftCol}>{rIndex + 1}</td>
								<TableCell cell={row[1]} rIndex={rIndex} />
								<TableCell cell={row[2]} rIndex={rIndex} />
								<TableCell cell={row[3]} rIndex={rIndex} />
								<TableCell cell={row[4]} rIndex={rIndex} />
								<TableCell cell={row[5]} rIndex={rIndex} />
								<TableCell cell={row[6]} rIndex={rIndex} />
							</tr>
							{rIndex === 4 && (
								<tr className={styles.divider}>
									<td colSpan={7}>Chiều</td>
								</tr>
							)}

							{rIndex === 8 && (
								<tr className={styles.divider}>
									<td colSpan={7}>Tối</td>
								</tr>
							)}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GroupTable;
