import { SearchOutlined } from "@ant-design/icons/lib/icons"
import { Button, Form, Input, List, message, Select } from "antd"
import axios from "axios";
import { useContext, useState } from "react"
import { AppConfigs } from '../../../configs/AppConfigs';
import { TimeTable } from '../../../providers/TimeTableProvider';
import InsertModal from "../InsertModal";

const Search = () => {

    const { yearList, year, semester, setYear, setSemester } = useContext(TimeTable);

    const [courses, setCourses] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({
        visible: false,
        key: null,
        data: {},
    });

    const onSearch = () => {
        if (keyword.length < 3)
            return message.warn('Vui lòng nhập ít nhất 3 ký tự');
        setLoading(true);
        message.loading('Đang tìm...');
        axios.get(`${AppConfigs.APIURL}/courses/search/${keyword}`)
            .then(({ data }) => {
                setLoading(false);
                if (!data)
                    return;
                setCourses(data)
                message.success(`Đã tìm thấy ${data.length} khóa học`);
            })
            .catch(e => setLoading(false));
    }

    const SelectYear = (
        <>
            <Select
                placeholder="Năm học"
                value={year}
                loading={!yearList.length}
                onChange={setYear}
            >
                {
                    yearList.map(y => (
                        <Select.Option
                            value={y.value}
                            key={y.value}>
                            {y.year}
                        </Select.Option>
                    ))
                }
            </Select>
            <Select
                placeholder="Học kỳ"
                value={semester}
                loading={!yearList.length}
                onChange={setSemester}
            >
                {
                    yearList.filter(y => y.value === year)[0]
                        ?.semester.map(s => (
                            <Select.Option
                                value={s}
                                key={s}
                            >
                                {s}
                            </Select.Option>
                        ))
                }
            </Select>
        </>
    )

    return (
        <Form style={{
            width: '100%',
            padding: 10,
        }}>
            <Form.Item
                style={{
                    width: '100%',
                }}
            >
                <Input.Group>
                    <Input
                        addonBefore={SelectYear}
                        value={keyword}
                        placeholder="Nhập tên hoặc mã học phần"
                        style={{
                            width: '100%'
                        }}
                        onChange={event => setKeyword(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter')
                                onSearch();
                        }}
                    />
                    <Button
                        style={{
                            width: '100%',
                        }}
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
                <List
                    pagination={{ pageSize: 9 }}
                    dataSource={courses}
                    renderItem={course => (
                        <List.Item actions={[
                            <Button
                                type="link"
                                onClick={() => setModal({
                                    visible: true,
                                    key: course.key,
                                    data: course,
                                })}
                            >
                                Thêm
                            </Button>
                        ]}>
                            <List.Item.Meta
                                title={course.name}
                                description={course.key}
                            />
                        </List.Item>
                    )}
                />
            </Form.Item>
            <InsertModal
                visible={modal.visible}
                courseKey={modal.key}
                data={modal.data}
                onClose={() => setModal({
                    visible: false,
                    key: null,
                    data: {},
                })}
            />
        </Form>
    )
}

export default Search
