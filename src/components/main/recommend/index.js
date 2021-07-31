import { Row, Col, Image } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

function Recommend(props) {

    // const imgPath = require('@/assets/img/recommend/1.jpg').default;
    // const imgPath2 = require('@/assets/img/recommend/2.jpg').default;
    // const imgPath3 = require('@/assets/img/recommend/3.jpg').default;
    const [imgPathArr, setImgPathArr] = useState([]);

    const getImgPath = () => {
        try {
            let arr = []
            for (let i = 1; i <= 30; i++) {
                arr.push(require(`@/assets/img/recommend/${i}.jpg`).default)
            }
            setImgPathArr(arr);
        } catch (e) {
            console.warn('get Image path error', e);
        }
    }

    useEffect(() => {
        getImgPath()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="home-content recommend">
            <div className="scroller-bar">
                <Row>
                    {
                        imgPathArr.map((item, index) => {
                            return (
                                <Col key={index} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                                    <Image
                                        src={item}
                                    />

                                </Col>
                            )
                        })
                    }
                </Row>
            </div>

        </div >
    )
}

export default Recommend