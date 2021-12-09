import { Button, Form, InputNumber, message } from "antd"
import Modal from "antd/lib/modal/Modal"
import { useContext, useEffect, useState } from "react"
import exChange from "./ExChange";
import { Grade } from './../../providers/GradeProvider';

const InsertModal = ({ visible, course, onClose = () => { } }) => {
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
            visible={visible}
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
            }}
        >
            <h2>{course.name}</h2>
            <h3>{course.key}</h3>
            <Form>
                <Form.Item
                    label="Điểm thang 10">
                    <InputNumber
                        max={10}
                        min={0}
                        onChange={value => setDigit(value)} />
                </Form.Item>
                <Form.Item
                    label="Điểm thang 4">
                    <Button disabled type="dash">
                        {four}
                    </Button>
                </Form.Item>
                <Form.Item
                    label="Điểm chữ">
                    <Button disabled type="dash">
                        {txt}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default InsertModal
