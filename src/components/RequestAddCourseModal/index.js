import { Button, Input, InputNumber, message, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useFormik } from "formik";
import React, { useState } from "react";

import request from "../../utils/request";
import styles from "./RequestAddCourseModal.module.scss";

const RequestAddCourseModal = () => {
	const [visible, setVisible] = useState(false);

	const formik = useFormik({
		initialValues: {
			key: "",
			name: "",
			weight: 1,
		},
		onSubmit: async (values) => {
			try {
				const res = await request.post("courses/request-add-course", {
					...values,
				});

				message.success(res.data.message);
				setVisible(false);
			} catch (error) {
				message.error(error.response.data.message);
			}
		},
	});

	const handleClick = () => setVisible(!visible);

	const handleAfterClose = () => {
		formik.resetForm();
	};
	return (
		<>
			<Button
				type="link"
				block
				onClick={handleClick}
				className={styles.button}
			>
				Không có học phần bạn đang tìm?
				<br /> Bấm vào đây để thêm nhé.
			</Button>
			<Modal
				title="Yêu cầu bổ sung thêm học phần"
				open={visible}
				centered
				cancelText="Hủy"
				okText="Yêu cầu"
				onCancel={handleClick}
				onOk={formik.handleSubmit}
				afterClose={handleAfterClose}
			>
				<form onSubmit={formik.handleSubmit}>
					<Space direction="vertical" style={{ width: "100%" }}>
						<Input
							autoFocus
							placeholder="Mã học phần"
							value={formik.values.key}
							name="key"
							onChange={formik.handleChange}
							onKeyDown={(event) =>
								event.code === "Enter" && formik.handleSubmit()
							}
							status={!formik.values.key ? "error" : ""}
							required
						/>
						<Input
							placeholder="Tên học phần (Tùy chọn)"
							value={formik.values.name}
							name="name"
							onChange={formik.handleChange}
						/>
						<InputNumber
							style={{ width: "100%" }}
							placeholder="Số tín chỉ (Tùy chọn)"
							value={formik.values.weight}
							type="number"
						/>
					</Space>
				</form>
			</Modal>
		</>
	);
};

export default RequestAddCourseModal;
