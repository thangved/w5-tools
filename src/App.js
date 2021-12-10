import { Content, Header } from 'antd/lib/layout/layout';
import { Empty, Layout, Spin } from 'antd';
import 'antd/dist/antd.css';

import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import styles from './App.module.scss';
import Home from './components/Home/Home';

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
									element={<div style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
										<Empty
											description={
												<span>
													Hiện tính năng này đang phát triển<br />
													Bạn có thể dùng phiên bản tương đương
													<a
														target="_blank"
														href="https://minhthangdev.pw/tools/timetable"
														rel="noreferrer">
														{' tại đây'}
													</a>.
												</span>
											} />
									</div>}
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
