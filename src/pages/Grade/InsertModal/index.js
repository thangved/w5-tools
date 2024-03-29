import { Descriptions, InputNumber, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';

import exChange from './ExChange';
import { Grade } from '~/providers/GradeProvider';

const InsertModal = ({ open, course, onClose = () => {} }) => {
	const { addCourses } = useContext(Grade);

	const [digit, setDigit] = useState(0);
	const [four, setFour] = useState(0);
	const [txt, setTxt] = useState('');

	useEffect(() => {
		const { four, txt } = exChange(digit);
		setFour(four);
		setTxt(txt);
	}, [digit]);

	return (
		<Modal
			open={open}
			onCancel={onClose}
			onOk={() => {
				addCourses({
					...course,
					digit,
					four,
					txt,
				});
				onClose();
				message.success('Đã thêm học phần.');
				setDigit(10);
			}}
			okButtonProps={{ id: 'ok-button' }}
		>
			<h2>{course.name}</h2>
			<h3>{course.key}</h3>
			<Descriptions layout="vertical" bordered>
				<Descriptions.Item span={4} label="Điểm thang 10">
					<InputNumber
						max={10}
						min={0}
						style={{ width: '100%' }}
						onChange={(value) => setDigit(value)}
						onKeyPress={(event) => {
							if (event.key === 'Enter') {
								addCourses({
									...course,
									digit,
									four,
									txt,
								});
								onClose();
								message.success('Đã thêm học phần.');
								setDigit(10);
							}
						}}
						id="grade-input"
					/>
				</Descriptions.Item>
				<Descriptions.Item span={4} label="Điểm thang 4">
					{four}
				</Descriptions.Item>
				<Descriptions.Item span={4} label="Điểm chữ">
					{txt}
				</Descriptions.Item>
			</Descriptions>
		</Modal>
	);
};

export default InsertModal;
