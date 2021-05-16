import { Space, Row, Col, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import '@/App.less';
import commonUtils from '@localUtils/commonUtils.js';
import windowUtils from '@localUtils/windowUtils.js';
import fsUtils from '@localUtils/fs-utils.js';
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
    // const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = React.createRef();
    const progressRef = React.createRef();
    const [playFlag, setPlayFlag] = useState("play");
    const [duration, setDuration] = useState(0);
    const [persent, setPersent] = useState(0);

    const updateTime = () => {
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
    const importLocal = async () => {
        await windowUtils.openFolder(async (event, arg) => {
            let path = arg.filePaths[0];
            await fsUtils.readMusicDir(path, (err, files) => {
                console.log("files----", files);
                if (files.length > 0) {
                    let list = [];
                    files.filter((item, index) => {
                        if(item.indexOf('.mp3') !== -1) {
                            list.push(item.substr(0, item.indexOf('.mp3')));
                            return true;
                        }
                        return false;
                    })
                    props.getMusicListFromFooterCom(list);
                }
            })
        });


    }
    return (
        <>
            {/* 
                onCanPlay={getDuration.bind(this)}
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
                        <StepForwardOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
                    </Space>
                </Col>
                <Col span={1} style={{ paddingBottom: '10px', paddingRight: '10px' }} className="flex-type flex-justify-end">
                    {commonUtils.secondsFormat(beginTime)}
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
                    {commonUtils.secondsFormat(parseInt(duration) ? parseInt(duration) : 0)}
                </Col>
                <Col span={2} className="flex-type flex-justify-end">
                    <Space style={{ paddingBottom: '10px', }}>
                        <IconFont style={{ fontSize: '16px' }} type="icon-hanhan-01-011" onClick={setPlayMode.bind(this)} className="webkit-no-drag" />
                        <IconFont style={{ fontSize: '16px' }} type="icon-jia" onClick={importLocal.bind(this)} className="webkit-no-drag" />
                    </Space>
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
