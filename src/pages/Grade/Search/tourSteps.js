const tourSteps = [
	{
		title: 'Tìm kiếm học phần',
		description: 'Nhập từ khóa vào ô tìm kiếm',
		target: () => {
			document.getElementById('search-container').focus();
			return document.getElementById('search-container');
		},
	},
	{
		title: 'Tìm kiếm học phần',
		description: 'Nhấn vào nút tìm kiếm hoặc nhấn enter',
		target: () => document.getElementById('search-button'),
	},
	{
		title: 'Chọn học phần mong muốn',
		description: 'Chọn học phần muốn thêm và nhấn vào nút thêm ở bên cạnh',
		target: () => document.getElementById('course-list'),
	},
	{
		title: 'Nhập điểm',
		description: 'Nhập điểm học phần (thang 10)',
		target: () => document.getElementById('grade-input'),
	},
	{
		title: 'Thêm học phần',
		description: 'Nhấn vào nút OK để thêm học phần',
		target: () => document.getElementById('ok-button'),
	},
	{
		title: 'Hoàn thành',
		description:
			'Vậy là bạn đã hoàn tất việc nhập điểm một học phần gòi đó, hehe!',
		target: () => document.getElementById('course-table'),
	},
];

export default tourSteps;
