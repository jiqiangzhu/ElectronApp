import { Space } from 'antd';
import React, { useEffect } from 'react';
import { CaretRightOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';

export default function FooterCom(props) {
    useEffect(() => {

    })

    return (
        <>
            <Space size={24}>
                <StepBackwardOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
                <CaretRightOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
                <StepForwardOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
            </Space>

        </>
    )
}