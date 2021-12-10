import { Avatar, Card, Col, Row } from "antd";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <Row>
            <Col lg={4} xs={24}>
                <Card
                    hoverable
                    onClick={() => navigate('/grade')}
                >
                    <Card.Meta
                        avatar={<Avatar
                            src="https://github.com/thangved.png" />}
                        title="Tính điểm"
                        description="@thangved"
                    >
                    </Card.Meta>
                </Card>
            </Col>
            <Col lg={4} xs={24}>
                <Card
                    hoverable
                    onClick={() => navigate('/timetable')}
                >
                    <Card.Meta
                        avatar={<Avatar
                            src="https://github.com/thangved.png" />}
                        title="Sắp thời khóa biểu"
                        description="@thangved"
                    >
                    </Card.Meta>
                </Card>
            </Col>
        </Row>
    )
}

export default Home
