import { Content, Header } from 'antd/lib/layout/layout';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';

import GradeProvider from './providers/GradeProvider';
import CoursesTable from './components/CoursesTable';
import Search from './components/Search/index';
import './App.css';

function App() {
	return (
		<GradeProvider>
			<Header />
			<Content>
				<Row
					style={{
						flex: 1,
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
			</Content>
		</GradeProvider>
	);
}

export default App;
