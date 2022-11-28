import {
	HistoryOutlined,
	TableOutlined,
	ToolOutlined,
} from "@ant-design/icons/lib/icons";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
	const [collapsed, setCollapsed] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Sider
			collapsible
			theme="light"
			collapsed={collapsed}
			onCollapse={setCollapsed}
		>
			<Link to="/" className={styles.logo} />
			<Menu
				theme="light"
				selectedKeys={[location.pathname]}
				mode="inline"
			>
				<Menu.Item
					key={"/grade"}
					icon={<ToolOutlined />}
					onClick={() => navigate("/grade")}
				>
					{!collapsed && "Tính điểm"}
				</Menu.Item>
				<Menu.Item
					key={"/timetable"}
					icon={<TableOutlined />}
					onClick={() => navigate("/timetable")}
				>
					{!collapsed && "Thời khóa biểu"}
				</Menu.Item>

				<Menu.Item
					key={"/changelog"}
					icon={<HistoryOutlined />}
					onClick={() => navigate("/changelog")}
				>
					{!collapsed && "Nhập ký thay đổi"}
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Navbar;
