import { Content, Header } from 'antd/lib/layout/layout';
import { Layout, Spin } from 'antd';
import 'antd/dist/antd.css';

import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import styles from './App.module.scss';
import Home from './components/Home/Home';
import TimeTable from './components/TimeTable';

const Grade = lazy(() => import('./components/Grade'));

function App() {
	return (
		<BrowserRouter>
			<Layout style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'row',
			}}>
				<Navbar />
				<Layout style={{ flex: 1 }}>
					<Header />
					<Content>
						<Suspense fallback={
							<div className={styles.fallback}>
								<Spin />
							</div>
						}>
							<Routes>
								<Route
									path="//"
									element={<Home />} />
								<Route
									path="/grade"
									element={<Grade />} />
								<Route
									path="timetable"
									element={<TimeTable />}
								/>
							</Routes>
						</Suspense>
					</Content>
				</Layout>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
