import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Layout, Spin, Typography } from 'antd';
import 'antd/dist/antd.css';

import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import styles from './App.module.scss';
import Home from './components/Home/Home';

const Grade = lazy(() => import('./components/Grade'));
const TimeTable = lazy(() => import('./components/TimeTable'));

function App() {
	return (
		<BrowserRouter>
			<Layout
				style={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Navbar />
				<Layout style={{ flex: 1, overflow: 'hidden' }}>
					<Header />
					<Content style={{ overflow: 'hidden' }}>
						<Suspense
							fallback={
								<div className={styles.fallback}>
									<Spin />
								</div>
							}
						>
							<Routes>
								<Route path='//' element={<Home />} />
								<Route path='/grade' element={<Grade />} />
								<Route
									path='timetable'
									element={<TimeTable />}
								/>
							</Routes>
						</Suspense>
					</Content>
					<Layout style={{ width: '100%' }}>
						<Footer>
							<Typography.Text>
								&copy; {new Date().getFullYear()} W5 TEAM. All
								rights reserved
								<br />
							</Typography.Text>

							<Typography.Text>
								Dev by{' '}
								<a
									target='_blank'
									rel='noreferrer'
									href='https://fb.com/thangved'
								>
									Minh Thang
								</a>{' '}
								(thangved)
								<br />
							</Typography.Text>

							<Typography.Text>
								<a
									target='_blank'
									rel='noreferrer'
									href='https://github.com/thangved/w5-tools.git'
								>
									Source here!
								</a>
								<br />
							</Typography.Text>
						</Footer>
					</Layout>
				</Layout>
			</Layout>
		</BrowserRouter>
	);
}

export default App;

