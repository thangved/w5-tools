import { PrinterFilled } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useCallback, useRef } from "react";
import { useContext } from "react";
import ReactToPrint from "react-to-print";

import { initMatrix } from "~/providers/initMatrix";
import { TimeTable } from "~/providers/TimeTableProvider";
import convertGroup from "~/utils/convertGroup";

import ExportJson from "./ExportJson";
import styles from "./GroupTable.module.scss";
import TableCell from "./TableCell";

const GroupTable = ({ timeTable = [] }) => {
	const { courses } = useContext(TimeTable);

	const reactPrintTrigger = useCallback(
		() => <Button icon={<PrinterFilled />}>In</Button>,
		[]
	);

	timeTable = timeTable
		.map((e, i) => (e === -1 ? null : courses[i].groups[e]))
		.filter((e) => e);

	const tableRef = useRef();

	const reactPrintContent = () => tableRef.current;

	const matrix = initMatrix();

	timeTable.forEach((group) => {
		group = convertGroup(group);
		group.time.forEach((time) => {
			time.matrix.forEach((position) => {
				matrix[position.x][position.y] = {
					...group,
					time,
				};
			});
		});
	});

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
					documentTitle="Thời khóa biểu - tools.w5team.com"
				/>
				<ExportJson groups={timeTable} />
			</div>
			<div className={styles.tableWrap} ref={tableRef}>
				<div className={styles.copy}>
					&copy; {new Date().getFullYear()}{" "}
					<a
						target="_blank"
						rel="noreferrer"
						href="//tools.w5team.com"
					>
						tools.w5team.com
					</a>{" "}
					All rights reserved <br />
					Dev by{" "}
					<a
						target="_blank"
						rel="noreferrer"
						href="//thangved.w5team.com"
					>
						Minh Thắng
					</a>
				</div>

				<div className={styles.title}>
					<Typography.Title level={1} style={{ textAlign: "center" }}>
						Thời khóa biểu
					</Typography.Title>
				</div>
				<table className={styles.table}>
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
									<td className={styles.leftCol}>
										{rIndex + 1}
									</td>
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
		</div>
	);
};

export default GroupTable;
