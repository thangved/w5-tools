import { Alert, Table, Typography } from "antd"
import { useContext } from "react"
import { TextLoop } from "react-text-loop-next";
import { TimeTable } from '../../../providers/TimeTableProvider';
import Print from "./Print";

const columns = [
    {
        title: 'Tiết',
        dataIndex: '0',
        key: '0',
        width: 50,
        fixed: 'left'
    },
    {
        title: 'Thứ 2',
        dataIndex: '1',
        key: '1',
        with: 180,
    },
    {
        title: 'Thứ 3',
        dataIndex: '2',
        key: '2',
        with: 180,
    },
    {
        title: 'Thứ 4',
        dataIndex: '3',
        key: '3',
        with: 180,
    },
    {
        title: 'Thứ 5',
        dataIndex: '4',
        key: '4',
        with: 180,
    },
    {
        title: 'Thứ 6',
        dataIndex: '5',
        key: '5',
        with: 180,
    },
    {
        title: 'Thứ 7',
        dataIndex: '6',
        key: '6',
        with: 180,
    },
]

const GroupTable = () => {
    const { matrix, groups } = useContext(TimeTable);



    return (

        <>
            <Alert key="-1"
                message={<TextLoop>
                    <Typography.Title
                        key="tkb"
                        level={3}>
                        Thời khóa biểu
                    </Typography.Title>
                    <Typography.Title
                        key="ln"
                        level={3}>
                        Bạn đang học {groups.length} môn
                    </Typography.Title>

                    {
                        groups.map((group, index) => (
                            <Typography.Title
                                key={group.class}
                                level={3}>
                                {index + 1}. {group.name}
                            </Typography.Title>
                        ))
                    }

                </TextLoop>}
                action={[
                    <Print matrix={matrix} />
                ]}
            />

            <div
                style={{
                    maxWidth: 'calc(100vw - 100px)',
                    overflow: 'auto',
                }}>

                <Alert
                    key="0"
                    message={
                        <Typography.Title level={4}>
                            Buổi sáng
                        </Typography.Title>
                    } />
                <Table
                    bordered
                    size="small"
                    scroll={{ x: 950, y: '100vh' }}
                    dataSource={matrix.slice(0, 5)}
                    columns={columns}
                    pagination={false}
                />
                <Alert
                    key="2"
                    message={
                        <Typography.Title level={4}>
                            Buổi chiều
                        </Typography.Title>
                    } />
                <Table
                    bordered
                    size="small"
                    scroll={{ x: 950, y: '100vh' }}
                    dataSource={matrix.slice(5, 9)}
                    columns={columns}
                    pagination={false}
                />
                <Alert
                    key="4"
                    message={
                        <Typography.Title level={4}>
                            Buổi tối
                        </Typography.Title>
                    } />
                <Table
                    bordered
                    size="small"
                    scroll={{ x: 950, y: '100vh' }}
                    dataSource={matrix.slice(9)}
                    columns={columns}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default GroupTable
