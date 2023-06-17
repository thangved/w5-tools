import { CloudDownloadOutlined } from '@ant-design/icons';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { Button, Modal } from 'antd';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';

import { TimeTable } from '~/providers/TimeTableProvider';

const ExportJson = ({ groups }) => {
	const { year, semester } = useContext(TimeTable);
	const [visible, setVisible] = useState(false);

	const data = {
		year: `${year?.slice(4)}${semester}`,
		courses: groups.map((item) => {
			return {
				...item,
				classId: item.id,
			};
		}),
	};

	const toggle = () => setVisible(!visible);

	let formatted;

	if (window.prettier) {
		formatted = window.prettier.format(JSON.stringify(data), {
			parser: 'json',
			plugins: window.prettierPlugins,
			useTabs: true,
			tabWidth: 4,
			printWidth: 40,
		});
	}

	return (
		<>
			<Helmet>
				<script src="https://unpkg.com/prettier@2.7.1/standalone.js"></script>
				<script src="https://unpkg.com/prettier@2.7.1/parser-babel.js"></script>
			</Helmet>
			<Button onClick={toggle} icon={<CloudDownloadOutlined />}>
				Xuất JSON
			</Button>

			<Modal open={visible} onCancel={toggle} onOk={toggle} width={1000}>
				<div style={{ padding: 20 }}></div>
				<CodeMirror
					theme={dracula}
					value={formatted}
					extensions={[json()]}
					readOnly
				/>
			</Modal>
		</>
	);
};

export default ExportJson;
