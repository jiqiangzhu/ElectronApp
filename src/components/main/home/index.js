import { useEffect } from "react";
import { Button, Row, Col } from 'antd';
import { setShowDataRedux } from '@redux/actions/map-actions';
import store from 'src/redux';
import './index.less';
import routes2 from "src/router/second-router";

function Home(props) {
    useEffect(() => {
        console.log('router', props.history);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const goCovidPage = () => {
        props.history.push('./fymap')
        store.dispatch(setShowDataRedux("China", {}))
    }
    return (
        <div className="home">
            {routes2}
            <Row>
                <Col span={6}>
                    <Button type="primary" onClick={goCovidPage.bind(this)} danger>Show COVID-19 map in China</Button>
                    {/* <Link to="/menu">To Menu</Link> */}
                </Col>
            </Row>
        </div>
    )
}

export default Home;