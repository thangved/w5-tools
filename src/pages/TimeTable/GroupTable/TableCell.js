import { Spin } from "antd";
import { useRef, useState } from "react";

import styles from "./GroupTable.module.scss";

const TableCell = ({ cell, rIndex }) => {
	const [available] = useState(null);

	const heightRef = useRef();
	return !cell ? (
		<td></td>
	) : cell.time.start !== rIndex + 1 ? (
		<></>
	) : (
		<td
			rowSpan={cell.time.count.length}
			className={styles.cell}
			ref={heightRef}
		>
			<div style={{ minHeight: heightRef.current?.offsetHeight }}>
				<div>
					<p>
						<strong>{cell.name}</strong>
					</p>

					<p>
						<strong>{cell.key}</strong>
					</p>

					<p>
						Nhóm: <strong>{cell.id}</strong>
					</p>

					<p>
						Lớp học phần: <strong>{cell.class}</strong>
					</p>

					<p>
						Phòng: <strong>{cell.time.room}</strong>
					</p>

					<p>
						Sỉ số: <strong>{cell.member}</strong>
					</p>

					<p>
						Còn lại:{" "}
						{available === null ? (
							<Spin />
						) : (
							<strong>{available}</strong>
						)}
					</p>
				</div>
			</div>
		</td>
	);
};

export default TableCell;
