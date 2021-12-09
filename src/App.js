import { Affix, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import './App.css';
import GradeProvider from './providers/GradeProvider';
import Search from './components/Search/index';
import { Content, Header } from 'antd/lib/layout/layout';
import CoursesTable from './components/CoursesTable';

function App() {
  return (
    <GradeProvider>
      <Header />
      <Content>
        <Row style={{
          flex: 1,
          padding: 10,
        }}>
          <Col lg={8} md={8} xs={24}>
            <Search />
          </Col>
          <Col lg={16} md={16} xs={24}>
            <Affix>
              <CoursesTable />
            </Affix>
          </Col>
        </Row>
      </Content>
    </GradeProvider>
  );
}

export default App;
