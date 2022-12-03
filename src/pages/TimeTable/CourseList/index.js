import { Button, Popconfirm, Select, Spin, Table, Typography } from "antd";
import { useContext } from "react";

import { TimeTable } from "~/providers/TimeTableProvider";

const CourseList = () => {
	const { courses, deleteCourse, activeGroups, synced } =
		useContext(TimeTable);

	const columns = [
		{
			title: "Mã học phần",
			dataIndex: "detail",
			key: "key",
			render: (e) => e.key,
		},

		{
			title: "Tên học phần",
			dataIndex: "detail",
			key: "name",
			render: (e) => e.name,
		},
		{
			title: "Chọn nhóm",
			dataIndex: "groups",
			key: "select",
			render: (groups, course) => {
				return (
					<Select
						loading={!synced}
						size="small"
						mode="multiple"
						style={{ width: 150 }}
						value={course.actives}
						placeholder="Chọn nhóm (tất cả)"
						onChange={(value) => {
							activeGroups(course.detail.key, value);
						}}
					>
						{groups?.map((group) => (
							<Select.Option
								value={group.class}
								key={group.class}
							>
								Nhóm {group.id} <br /> Thứ:{" "}
								{group.time.map(({ day }) => day).join(", ")}
							</Select.Option>
						))}
					</Select>
				);
			},
		},
		{
			title: "Xóa",
			dataIndex: "detail",
			key: "delete",
			render: ({ key }) => (
				<Popconfirm
					title="Bạn có muốn xóa học phần này?"
					okText="Xóa"
					okType="danger"
					cancelText="Hủy"
					onConfirm={() => {
						deleteCourse(key);
					}}
				>
					<Button size="small" danger>
						Xóa
					</Button>
				</Popconfirm>
			),
		},
	];

	const dataSource = courses || [];

	return (
		<div style={{ overflow: "auto" }}>
			<Typography.Title level={4}>Danh sách học phần</Typography.Title>

			{!synced && (
				<>
					<Spin />{" "}
					<Typography.Text>Đang đồng bộ dữ liệu</Typography.Text>
				</>
			)}

			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={{ hideOnSinglePage: true }}
			/>
		</div>
	);
};

export default CourseList;
