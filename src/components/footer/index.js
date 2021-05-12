import { Space, Row, Col, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import '@/App.less';
import mp3Path from '../../assets/audio/test.mp3'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

export default function FooterCom(props) {
    useEffect(() => {

    })
    const IconFont = createFromIconfontCN();
    // const [beginTime, setBeginTime] = useState(0);
    const [loopFlag, setLoopFlag] = useState(true);
    // const [currentIndex, setCurrentIndex] = useState(1);
    const audioRef = React.createRef();
    let [playFlag, setPlayFlag] = useState("play");
    // const getDuration = () => {

    // }
    // const updateTime = value => {
    //     console.log("播放到时间----", value);
    //     setBeginTime(value)
    // }
    const setPlayMode = () => {
        console.log("this", this);
        setLoopFlag(!loopFlag);
        console.log("当前播放模式 单曲循环 true  否则 false", loopFlag);
    }
    const playMusic = (flag) => {
        console.log("flag------------", typeof flag);
        setPlayFlag(flag);
        console.log("playFlag----------", typeof playFlag);
        if (playFlag === "play") {
            console.log("......play");
            audioRef.current.play();
        } else if (playFlag === "pause") {
            audioRef.current.pause();
        }
    }


    // const playNext = () => {
    //     setCurrentIndex(currentIndex + 1)
    // }

    return (
        <>
            {/* 
        
                onCanPlay={getDuration.bind(this)}
                onTimeUpdate={updateTime.bind(this)} 
                
                onEnded={playNext.bind(this, currentIndex)}    
            */}
            <audio
                ref={audioRef}
                loop={loopFlag}
                preload="true"
                controls={false}
                src={mp3Path}
            ></audio>
            <Row align="middle" style={{ width: "100%" }} >
                <Col span={3}>
                    <Space size={10}>
                        <StepBackwardOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
                        <PlayStatusCom playStatus={playFlag} onClick={(flag) => playMusic.bind(this, flag)} />
                        {/* <CaretRightOutlined style={{ fontSize: "30px", cursor: "pointer" }} onClick={playMusic.bind(this)} /> */}
                        {/* <IconFont type="icon-bofang" style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }} onClick={setPlayMode.bind(this)} className="webkit-no-drag" /> */}
                        <StepForwardOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
                    </Space>
                </Col>
                <Col span={1}>
                    {/* {beginTime} */}
                </Col>
                <Col offset={1} span={12} >
                    <Progress percent={100} className="audio-process" showInfo={false} strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }} />
                </Col>
                <Col offset={1} span={1}>

                </Col>
                <Col span={2}>
                    <IconFont type="icon-hanhan-01-011" onClick={setPlayMode.bind(this)} className="webkit-no-drag" />

                </Col>
            </Row>

        </>
    )
}

function PlayStatusCom(props) {
    const IconFont = createFromIconfontCN();
    if (props.playStatus === "play") {
        return (
            <IconFont type="icon-bofang" style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }} onClick={props.onClick("pause")} className="webkit-no-drag" />
        )
    } else {
        return (
            <IconFont type="icon-zanting-xianxingyuankuang" style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }} onClick={props.onClick("play")} className="webkit-no-drag" />
        )
    }

}

// function Counter(props) {
//     const [count, setCount] = useState(props.initialCount);
//     return (
//       <>
//         Count: {count}
//         <button onClick={() => setCount(props.initialCount)}>Reset</button>
//         <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
//         <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
//       </>
//     );
//   }