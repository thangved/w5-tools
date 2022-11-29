import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { Button, Form, Input, List, message, Spin, Tour } from "antd";
import { useState } from "react";

import RequestAddCourseModal from "../../../components/RequestAddCourseModal";
import request from "../../../utils/request";
import InsertModal from "../InsertModal/index";
import tourSteps from "./tourSteps";

const Search = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [searched, setSearched] = useState(false);
	const [insert, setInsert] = useState({
		visible: false,
		course: {},
	});

	const [openTour, setOpenTour] = useState(false);

	const onSearch = () => {
		if (keyword.length < 3)
			return message.warning("Vui lòng nhập ít nhất 3 ký tự");
		if (loading) return;
		message.loading("Đang tìm kiếm", 1);
		setLoading(true);
		request
			.get(`courses/search/${keyword}`)
			.then(({ data }) => {
				setLoading(false);
				if (!data) return;
				setCourses(data);
				message.success(`Đã tìm thấy ${data.length} kết quả`);
				setSearched(true);
			})
			.catch((err) => setLoading(false));
	};

	return (
		<Form style={{ width: "100%" }}>
			<Button
				style={{ marginBottom: 5 }}
				size="small"
				type="primary"
				onClick={() => setOpenTour(!openTour)}
			>
				Hướng dẫn
			</Button>
			<Form.Item style={{ width: "100%" }}>
				<Input.Group style={{ width: "100%" }} compact>
					<Input
						id="search-container"
						autoFocus
						style={{
							width: `calc(100% - 120px)`,
						}}
						placeholder="Tìm kiếm học phần"
						onChange={(event) => setKeyword(event.target.value)}
						onKeyPress={(event) => {
							if (event.key === "Enter") onSearch();
						}}
					/>
					<Button
						id="search-button"
						icon={<SearchOutlined />}
						type="primary"
						loading={loading}
						onClick={onSearch}
					>
						Tìm kiếm
					</Button>
				</Input.Group>
			</Form.Item>
			<Form.Item>
				{loading && (
					<div
						style={{
							width: "100%",
							height: "100%",
							position: "absolute",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							background: "#ffffff90",
							zIndex: 100,
						}}
					>
						<Spin />
					</div>
				)}
				<List
					id="course-list"
					pagination={{ pageSize: 9 }}
					dataSource={courses}
					renderItem={(course) => (
						<List.Item
							actions={[
								<Button
									type="link"
									onClick={() => {
										setInsert({
											course,
											visible: true,
										});
									}}
								>
									Thêm
								</Button>,
							]}
						>
							<List.Item.Meta
								title={course.name}
								description={course.key}
							/>
						</List.Item>
					)}
				/>
			</Form.Item>
			{searched && <RequestAddCourseModal />}
			<InsertModal
				open={insert.visible}
				course={insert.course}
				onClose={() =>
					setInsert((prev) => ({ ...prev, visible: false }))
				}
			/>

			<Tour
				open={openTour}
				onClose={() => setOpenTour(false)}
				steps={tourSteps}
			/>
		</Form>
	);
};

export default Search;
