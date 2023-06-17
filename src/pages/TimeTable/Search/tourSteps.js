const tourSteps = [
	{
		title: 'Chọn năm học - học kỳ',
		description: 'Nhấn vào đây và chọn năm học',
		target: () => document.getElementById('select-year'),
	},
	{
		title: 'Chọn năm học - học kỳ',
		description: 'Nhấn vào đây và chọn học kỳ',
		target: () => document.getElementById('select-semester'),
	},
	{
		title: 'Tìm kiếm học phần',
		description: 'Nhập tên hoặc mã học phần rồi đợi chút là có kết quả',
		target: () => {
			document.getElementById('search-container').focus();
			return document.getElementById('search-container');
		},
	},

	{
		title: 'Hoàn thành',
		description:
			'Vậy là bạn đã hoàn thành việc thêm một nhóm học phần vào thời khóa biểu, chúc bạn không hối hận với lựa chọn này : ))',
		target: () => {
			return document.getElementById('timetable-main');
		},
	},
];

export default tourSteps;
