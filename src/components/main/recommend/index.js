import { Row, Col, Image } from 'antd';
import { useEffect } from 'react';
import './index.less';

function Recommend(props) {
    
    const imgPath = require('@/assets/img/recommend/1.jpg').default;
    const imgPath2 = require('@/assets/img/recommend/2.jpg').default;
    useEffect(() => {

    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="home-content recommend">
            <div className="scroller-bar">
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath}
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath}
                        />
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <Image
                            src={imgPath2}
                        />
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default Recommend