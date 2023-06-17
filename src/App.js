import { Layout, Spin, Typography, App as AntdApp } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import styles from "./App.module.scss";
import Navbar from "~/components/Navbar";
import Changelog from "~/pages/Changelog";
import Home from "~/pages/Home/Home";

const Grade = lazy(() => import("~/pages/Grade"));
const TimeTable = lazy(() => import("~/pages/TimeTable"));

function App() {
	return (
		<AntdApp>
			<BrowserRouter>
				<Layout
					style={{
						minHeight: "100vh",
						display: "flex",
						flexDirection: "row"
					}}
				>
					<Navbar />
					<Layout style={{ flex: 1, overflow: "hidden" }}>
						<Header />
						<Content style={{ overflow: "hidden" }}>
							<Suspense
								fallback={
									<div className={styles.fallback}>
										<Spin />
									</div>
								}
							>
								<Routes>
									<Route path="//" element={<Home />} />
									<Route path="/grade" element={<Grade />} />
									<Route
										path="/timetable"
										element={<TimeTable />}
									/>
									<Route
										path="/changelog"
										element={<Changelog />}
									/>
								</Routes>
							</Suspense>
						</Content>
						<Layout style={{ width: "100%" }}>
							<Footer>
								<Typography.Text>
									&copy; {new Date().getFullYear()} W5 TEAM.
									All rights reserved
									<br />
								</Typography.Text>

								<Typography.Text>
									Dev by{" "}
									<a
										target="_blank"
										rel="noreferrer"
										href="https://fb.com/thangved"
									>
										Minh Thang
									</a>{" "}
									(thangved)
									<br />
								</Typography.Text>

								<Typography.Text>
									<a
										target="_blank"
										rel="noreferrer"
										href="https://github.com/thangved/w5-tools.git"
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
		</AntdApp>
	);
}

export default App;
