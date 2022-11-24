import { Button, Input, InputNumber, message, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import request from "../../utils/request";
import styles from "./RequestAddCourseModal.module.scss";

const RequestAddCourseModal = () => {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isErrored, setIsError] = useState(false);

	const formik = useFormik({
		initialValues: {
			key: "",
			name: "",
			weight: 1,
		},
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const res = await request.post("courses/request-add-course", {
					...values,
				});

				message.success(res.data.message);
				setVisible(false);
			} catch (error) {
				message.error(error.response.data.message);
				setIsError(true);
			}
			setLoading(false);
		},
		validate: (values) => {
			const errors = {};

			if (!values.key) {
				errors.key = "Mã học phần là bắt buộc";
			}

			return errors;
		},
	});

	const handleClick = () => setVisible(!visible);

	const handleAfterClose = () => {
		formik.resetForm();
	};

	useEffect(() => {
		setIsError(false);
	}, [formik.values.key]);
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
				confirmLoading={loading}
				title="Yêu cầu bổ sung thêm học phần"
				open={visible}
				centered
				cancelText="Hủy"
				okText="Yêu cầu"
				okType={isErrored ? "danger" : "primary"}
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
							status={
								formik.errors.key || isErrored ? "error" : ""
							}
							required
						/>
						<Typography style={{ color: "red" }}>
							{formik.errors.key}
						</Typography>
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
							onChange={formik.handleChange}
							name="weight"
							type="number"
						/>
					</Space>
				</form>
			</Modal>
		</>
	);
};

export default RequestAddCourseModal;
