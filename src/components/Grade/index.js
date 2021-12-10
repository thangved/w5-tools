import { Col, Row } from 'antd';
import GradeProvider from '../../providers/GradeProvider';
import CoursesTable from './CoursesTable';
import Search from './Search/index';

const Grade = () => {
    return (
        <GradeProvider>
            <Row
                style={{
                    padding: 10,
                }}
            >
                <Col lg={8} md={8} xs={24}>
                    <Search />
                </Col>
                <Col lg={16} md={16} xs={24}>
                    <CoursesTable />
                </Col>
            </Row>
        </GradeProvider>
    )
}

export default Grade
