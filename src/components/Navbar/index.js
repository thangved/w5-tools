import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { TableOutlined, ToolOutlined } from "@ant-design/icons/lib/icons";

import styles from "./Navbar.module.scss";
import { useState } from "react";

const Navbar = () => {
	const [collapsed, setCollapsed] = useState(true);
	const navigate = useNavigate();

	return (
		<Sider theme="light" collapsed={collapsed} onCollapse={setCollapsed}>
			<Link to="/" className={styles.logo} />
			<Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
				<Menu.Item
					key={1}
					icon={<ToolOutlined />}
					onClick={() => navigate("/grade")}
				>
					{!collapsed && "Tính điểm"}
				</Menu.Item>
				<Menu.Item
					key={2}
					icon={<TableOutlined />}
					onClick={() => navigate("/timetable")}
				>
					{!collapsed && "Thời khóa biểu"}
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Navbar;
