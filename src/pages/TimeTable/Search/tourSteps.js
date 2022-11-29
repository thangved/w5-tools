const tourSteps = [
	{
		title: "Chọn năm học - học kỳ",
		description: "Nhấn vào đây và chọn năm học",
		target: () => document.getElementById("select-year"),
	},
	{
		title: "Chọn năm học - học kỳ",
		description: "Nhấn vào đây và chọn học kỳ",
		target: () => document.getElementById("select-semester"),
	},
	{
		title: "Tìm kiếm học phần",
		description: "Nhập tên hoặc mã học phần rồi đợi chút là có kết quả",
		target: () => {
			document.getElementById("search-container").focus();
			return document.getElementById("search-container");
		},
	},
	{
		title: "Chọn học phần mong muốn",
		description: "Chọn học phần bạn muốn thêm và nhấn vào nút thêm",
		target: () => {
			return document.getElementById("course-list");
		},
	},
	{
		title: "Chọn nhóm học phần",
		description:
			"Chọn nhóm học phần mà bạn nghĩ mà bạn nên học hoặc bạn nghĩ là bạn bè nghĩ bạn nghĩ bạn nên học : ))",
		placement: "top",
		target: () => {
			return document.getElementById("select-group");
		},
	},
	{
		title: "Thêm học nhóm học phần",
		description: "Nhấn vào nút OK để thêm nhóm học phần vào thời khóa biểu",
		target: () => {
			return document.getElementById("ok-button");
		},
	},
	{
		title: "Hoàn thành",
		description:
			"Vậy là bạn đã hoàn thành việc thêm một nhóm học phần vào thời khóa biểu, chúc bạn không hối hận với lựa chọn này : ))",
		target: () => {
			return document.getElementById("timetable-main");
		},
	},
];

export default tourSteps;
