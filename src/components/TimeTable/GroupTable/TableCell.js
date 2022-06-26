import { Button, Popconfirm, Spin } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';

import { AppConfigs } from '../../../configs/AppConfigs';
import { TimeTable } from '../../../providers/TimeTableProvider';
import styles from './GroupTable.module.scss';

const TableCell = ({ cell, rIndex }) => {
	const [available, setAvailable] = useState(null);
	const { year, semester, deleteGroup } = useContext(TimeTable);

	const heightRef = useRef();

	useEffect(() => {
		if (
			!cell ||
			cell.time.start !== rIndex + 1 ||
			!year ||
			!semester ||
			available
		)
			return;

		const fetchData = async () => {
			try {
				const res = await axios.get(
					`${AppConfigs.APIURL}/courses/key/${cell?.key}?y=${year}&n=${semester}`,
				);

				setAvailable(
					res.data?.find((cl) => cl.class === cell.class).available,
				);
			} catch (error) {}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell, rIndex, semester, year]);

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
						Còn lại:{' '}
						{available === null ? (
							<Spin />
						) : (
							<strong>{available || cell.available}</strong>
						)}
					</p>
				</div>

				<Popconfirm
					title={`Bạn có muốn xóa ${cell.name}`}
					okText='Xóa'
					cancelText='Hủy'
					okType='danger'
					onConfirm={() => deleteGroup(cell.class)}
				>
					<Button danger type='primary' style={{ width: '100%' }}>
						Xóa
					</Button>
				</Popconfirm>
			</div>
		</td>
	);
};

export default TableCell;

