import { Button, Popconfirm, Select, Table, Typography } from "antd";
import { useContext } from "react";
import { TimeTable } from "~/providers/TimeTableProvider";

const CourseList = () => {
	const { courses, deleteCourse, activeGroups } = useContext(TimeTable);

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
			dataIndex: ["detail", "groups", "active"],
			key: "select",
			render: (groups) => {
				console.log(groups);
				return (
					<Select
						size="small"
						mode="multiple"
						style={{ minWidth: 150 }}
						onChange={(value) => {
							activeGroups(groups[0]?.key, value);
						}}
					>
						{groups?.map((group) => (
							<Select.Option
								value={group.class}
								key={group.class}
							>
								{group.class} - Thứ:{" "}
								{group.time.map((e) => e.day).join(", ")}
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

			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={{ hideOnSinglePage: true }}
				locale={{ emptyText: "Bạn chưa thêm học phần nào" }}
			/>
		</div>
	);
};

export default CourseList;
