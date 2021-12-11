import React, { useCallback, useRef } from "react";
import { Button } from 'antd';
import { PrinterOutlined } from "@ant-design/icons/lib/icons";
import ReactToPrint from "react-to-print";

import styles from './GroupTable.module.scss';

const Print = ({ matrix }) => {
    const refTable = useRef();

    const reactPrintContent = () => {
        return refTable.current;
    }

    const reactToPrintTrigger = useCallback(() => {
        return <Button
            type="primary"
            icon={<PrinterOutlined />}>
            In
        </Button>;
    }, []);

    const tableContent = [];

    for (let i = 0; i < 14; i++) {
        const tRow = i !== 5 && i !== 9 ? <tr key={i}>
            <td key={0}>{matrix[i][0]}</td>
            <td key={1}>{matrix[i][1]}</td>
            <td key={2}>{matrix[i][2]}</td>
            <td key={3}>{matrix[i][3]}</td>
            <td key={4}>{matrix[i][4]}</td>
            <td key={5}>{matrix[i][5]}</td>
            <td key={6}>{matrix[i][6]}</td>
        </tr> : <>
            <tr key={Math.random().toString(36).slice(3)}>
                <td colSpan={7}>
                    {i === 5 ? 'Buổi chiều' : 'Buổi tối'}
                </td>
            </tr>
            <tr key={i}>
                <td key={0}>{matrix[i][0]}</td>
                <td key={1}>{matrix[i][1]}</td>
                <td key={2}>{matrix[i][2]}</td>
                <td key={3}>{matrix[i][3]}</td>
                <td key={4}>{matrix[i][4]}</td>
                <td key={5}>{matrix[i][5]}</td>
                <td key={6}>{matrix[i][6]}</td>
            </tr>
        </>
        tableContent.push(tRow);
    }

    return (
        <>
            <ReactToPrint
                content={reactPrintContent}
                trigger={reactToPrintTrigger}
                documentTitle="Thời khóa biểu"
            />
            <table
                ref={refTable}
                className={styles.table}>
                <thead>
                    <tr>
                        <td>
                            Tiết
                        </td>
                        <td>
                            Thứ 2
                        </td>
                        <td>
                            Thứ 3
                        </td>
                        <td>
                            Thứ 4
                        </td>
                        <td>
                            Thứ 5
                        </td>
                        <td>
                            Thứ 6
                        </td>
                        <td>
                            Thứ 7
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr key={Math.random().toString(36).slice(3)}>
                        <td colSpan={7}>
                            Buổi sáng
                        </td>
                    </tr>
                    {tableContent}
                </tbody>
            </table>
        </>
    )
}

export default Print
