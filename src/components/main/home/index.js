import { useEffect } from "react";
import { Button, Row, Col } from 'antd';

function Home(props) {
    useEffect(() => {

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Row>
                <Col span={6}>
                    <Button type="primary" onClick={() => props.history.push('./fymap')} danger>Show COVID-19 map in China</Button>
                </Col>
            </Row>
        </>
    )
}

export default Home;