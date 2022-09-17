import { Alert, Descriptions, message, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useContext, useEffect, useState } from "react";
import { TimeTable } from "../../../providers/TimeTableProvider";
import request from "../../../utils/request";

const InsertModal = ({ open, courseKey, data, onClose = () => {} }) => {
	const { year, semester, addGroup } = useContext(TimeTable);

	const [groups, setGroups] = useState([]);
	const [selected, setSelected] = useState();

	useEffect(() => {
		if (courseKey)
			request
				.get(`courses/key/${courseKey}?y=${year}&n=${semester}`)
				.then(({ data }) => {
					if (data) setGroups(data);
				});
	}, [courseKey, semester, year]);

	useEffect(() => {
		setSelected(null);
	}, [courseKey]);

	return (
		<Modal
			centered
			open={open}
			onCancel={onClose}
			onOk={() => {
				if (!selected)
					return message.error("Vui lòng chọn nhóm học phần!");
				addGroup(selected);
				onClose();
			}}
		>
			<h2>{data.name}</h2>
			<Descriptions>
				<Descriptions.Item span={4} label="Tên học phần">
					{data.name}
				</Descriptions.Item>

				<Descriptions.Item span={4} label="Mã học phần">
					{data.key}
				</Descriptions.Item>

				<Descriptions.Item label="Nhóm học phần">
					<Select
						value={selected}
						placeholder="Nhóm học phần"
						style={{
							width: "100%",
						}}
						onChange={(value) => setSelected(JSON.parse(value))}
					>
						{groups.map((group) => (
							<Select.Option
								value={JSON.stringify(group)}
								key={group.class}
							>
								{group.class} - Nhóm {group.id}:{" "}
								{group.time
									.map(({ day }) => `Thứ ${day}`)
									.join(", ")}{" "}
								Còn lại: {group.available}
							</Select.Option>
						))}
					</Select>
				</Descriptions.Item>
			</Descriptions>
			{selected && (
				<Alert
					type="warning"
					message={
						<Descriptions>
							<Descriptions.Item label="Nhóm">
								{selected.class}
							</Descriptions.Item>

							<Descriptions.Item label="Sỉ số">
								{selected.member}
							</Descriptions.Item>

							<Descriptions.Item label="Còn lại">
								{selected.available}
							</Descriptions.Item>
						</Descriptions>
					}
				/>
			)}
			{selected?.time?.map((time, index) => (
				<Alert
					style={{
						marginTop: 5,
					}}
					key={index}
					message={
						<Descriptions>
							<Descriptions.Item label="Thứ" span={4}>
								{time.day}
							</Descriptions.Item>

							<Descriptions.Item label="Phòng" span={4}>
								{time.room}
							</Descriptions.Item>

							<Descriptions.Item label="Tiết bắt đầu" span={4}>
								{time.start}
							</Descriptions.Item>

							<Descriptions.Item label="Số tiết" span={4}>
								{time.count}
							</Descriptions.Item>
						</Descriptions>
					}
				/>
			))}
		</Modal>
	);
};

export default InsertModal;
