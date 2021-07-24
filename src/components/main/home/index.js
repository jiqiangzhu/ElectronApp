import { useEffect } from "react";
import { Button, Row, Col } from 'antd';
import { setShowDataRedux } from '@redux/actions/map-actions';
import store from 'src/redux';

function Home(props) {
    useEffect(() => {

    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const goCovidPage = () => {
        props.history.push('./fymap')
        store.dispatch(setShowDataRedux("", {}))
    }
    return (
        <>
            <Row>
                <Col span={6}>
                    <Button type="primary" onClick={goCovidPage.bind(this)} danger>Show COVID-19 map in China</Button>
                </Col>
            </Row>
        </>
    )
}

export default Home;