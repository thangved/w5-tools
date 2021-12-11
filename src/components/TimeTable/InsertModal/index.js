import { Alert, Descriptions, Select } from "antd"
import Modal from "antd/lib/modal/Modal"
import { useState, useEffect, useContext } from "react"
import axios from 'axios';
import { AppConfigs } from '../../../configs/AppConfigs';
import { TimeTable } from '../../../providers/TimeTableProvider';

const InsertModal = ({ visible, courseKey, data, onClose = () => { } }) => {
    const { year, semester, addGroup } = useContext(TimeTable);

    const [groups, setGroups] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (courseKey)
            axios.get(`${AppConfigs.APIURL}/courses/key/${courseKey}?y=${year}&n=${semester}`)
                .then(({ data }) => {
                    if (data)
                        setGroups(data);
                });
    }, [courseKey, semester, year]);

    useEffect(() => {
        setSelected(undefined);
    }, [courseKey]);

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            onOk={() => {
                addGroup(selected);
                onClose();
            }}
        >
            <h2>{data.name}</h2>
            <Descriptions>

                <Descriptions.Item
                    span={4}
                    label="Tên học phần">
                    {data.name}
                </Descriptions.Item>

                <Descriptions.Item
                    span={4}
                    label="Mã học phần">
                    {data.key}
                </Descriptions.Item>

                <Descriptions.Item label="Nhóm học phần">
                    <Select
                        value={JSON.stringify(selected)}
                        placeholder="Nhóm học phần"
                        style={{
                            width: '100%',
                        }}
                        onChange={value => setSelected(JSON.parse(value))}
                    >

                        {
                            groups.map(group => (
                                <Select.Option
                                    value={JSON.stringify(group)}
                                    key={group.class}>
                                    {group.class}
                                </Select.Option>
                            ))
                        }

                    </Select>
                </Descriptions.Item>

            </Descriptions>
            {
                selected?.time?.map(time => (
                    <Alert message={
                        <Descriptions>

                            <Descriptions.Item label="Thứ" span={4}>
                                {time.day}
                            </Descriptions.Item>

                            <Descriptions.Item label="Phòng" span={4}>
                                {time.room}
                            </Descriptions.Item>

                            <Descriptions.Item label="Tiết bắt đầu" span={4}>
                                {time.start}
                            </Descriptions.Item>

                            <Descriptions.Item label="Số tiết" span={4}>
                                {time.count}
                            </Descriptions.Item>

                        </Descriptions>
                    } />
                ))
            }
        </Modal>
    )
}

export default InsertModal