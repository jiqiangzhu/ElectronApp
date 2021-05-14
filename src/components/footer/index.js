import { Space, Row, Col, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import '@/App.less';
import mp3Path from '../../assets/audio/test.mp3'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

export default function FooterCom(props) {
    useEffect(() => {
        setDuration(audioRef.current.duration)
    })
    const IconFont = createFromIconfontCN();
    const [beginTime, setBeginTime] = useState(0);
    const [loopFlag, setLoopFlag] = useState(true);
    // const [currentIndex, setCurrentIndex] = useState(1);
    const audioRef = React.createRef();
    const progressRef = React.createRef();
    const [playFlag, setPlayFlag] = useState("play");
    const [duration, setDuration] = useState(0);
    // const getDuration = () => {

    // }
    const [persent, setPersent] = useState(0);

    const updateTime = () => {
        // const duration = audioRef.current.duration;
        let temPersent = (audioRef.current.currentTime / duration) * 100;
        setPersent(temPersent)
        setBeginTime(parseInt(audioRef.current.currentTime))

    }
    const setPlayMode = () => {
        console.log("this", this);
        setLoopFlag(!loopFlag);
        console.log("当前播放模式 单曲循环 true  否则 false", loopFlag);
    }
    const playMusic = (flag) => {
        setPlayFlag(flag);
        if (playFlag === "play") {
            audioRef.current.play();
        } else if (playFlag === "pause") {
            audioRef.current.pause();
        }
    }

    const setCurrentPlayTime = (event) => { //205
        console.log("event---------", event.pageX);
        console.log("progressRef.current.offsetLeft--------", progressRef.current.offsetLeft + 205);
        console.log("progressRef.current.width--------", progressRef.current.offsetWidth + 205);
        let currentProgress = event.pageX - (progressRef.current.offsetLeft + 205);
        let currentRate = parseInt(currentProgress / progressRef.current.offsetWidth * 100);
        let setCurrentTime = (duration * currentRate) / 100
        audioRef.current.currentTime = setCurrentTime;
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
                onTimeUpdate={updateTime.bind(this)}
                ref={audioRef}
                preload="true"
                loop={loopFlag}
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
                <Col span={1} style={{ paddingBottom: '10px', paddingRight: '10px' }} className="flex-type flex-justify-end">
                    {secondsFormat(beginTime)}
                </Col>
                <Col span={12}>
                    <div ref={progressRef}>
                        <Progress percent={persent} onClick={setCurrentPlayTime.bind(this)} className="audio-process" showInfo={false} strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }} />
                    </div>
                </Col>
                <Col style={{ paddingBottom: '10px', paddingLeft: '10px' }} span={1}>
                    {secondsFormat(parseInt(duration) ? parseInt(duration) : 0)}
                </Col>
                <Col span={2} className="flex-type flex-justify-end">
                    <IconFont style={{ paddingBottom: '10px', fontSize: '16px' }} type="icon-hanhan-01-011" onClick={setPlayMode.bind(this)} className="webkit-no-drag" />
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
function secondsFormat(sec){
    let hour = Math.floor(sec / 3600);
    let minute = Math.floor((sec - hour * 3600) / 60);
    let second = sec - hour * 3600 - minute * 60;
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return minute + ":" + second;
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