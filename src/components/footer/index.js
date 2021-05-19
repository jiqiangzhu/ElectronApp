import { Space, Row, Col, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import '@/App.less';
import commonUtils from '@localUtils/common-util';
import windowUtils from '@localUtils/window-util';
import fsUtils from '@localUtils/fs-util';
// import mp3Path from '../../assets/audio/test.mp3'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

export default function FooterCom(props) {
    const IconFont = createFromIconfontCN();
    const [beginTime, setBeginTime] = useState(0);
    const [loopFlag, setLoopFlag] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = React.createRef();
    const progressRef = React.createRef();
    const [playFlag, setPlayFlag] = useState("pause");
    const [duration, setDuration] = useState(0);
    const [persent, setPersent] = useState(0);
    const [filePathArray, setFilePathArray] = useState([]);

    const updateTime = () => {
        let temPersent = (audioRef.current.currentTime / duration) * 100;
        setPersent(temPersent)
        setBeginTime(parseInt(audioRef.current.currentTime))

    }
    const setPlayMode = () => {
        console.log("this", this);
        setLoopFlag(!loopFlag);
        console.log("play mode if true single cycle else false----->>>>", loopFlag);
    }

    const setCurrentPlayTime = (event) => { //205
        console.log("event---------", event.pageX);
        console.log("progressRef.current.offsetLeft--------", progressRef.current.offsetLeft + 205);
        console.log("progressRef.current.width--------", progressRef.current.offsetWidth + 205);
        let currentProgress = event.pageX - (progressRef.current.offsetLeft + 205);
        let currentRate = parseInt(currentProgress / progressRef.current.offsetWidth * 100);
        let setCurrentTime = (duration * currentRate) / 100
        audioRef.current.currentTime = setCurrentTime;
        if (playFlag === "pause") {
            playMusic("play")
        }
    }
    const playNext = (value) => {
        let tempIndex = currentIndex + value;
        console.log("tempIndex----->>>>>>>>>>", tempIndex);
        if (tempIndex > filePathArray.length) {
            setCurrentIndex(0);
        } else if (tempIndex < 0) {
            setCurrentIndex(filePathArray.length);
        } else {
            setCurrentIndex(tempIndex)
        }
        console.log("audioRef.current---->>>>>>>>>>>", audioRef.current);
        // audioRef.current.currentTime = 0;
        // if(playFlag === "pause" || playFlag === "play") {
        playMusic("play")
        // }
    }
    const playMusic = (flag) => {
        console.log("-------------flag", flag);
        setPlayFlag(flag);
        if (playFlag === "pause") {
            console.log("play之前>>>>>>>>>>>>", audioRef.current);
            audioRef.current.play();
            console.log("play之后>>>>>>>>>>>>", audioRef.current);
        } else if (playFlag === "play") {
            console.log("pause之前>>>>>>>>>>>>", audioRef.current);
            audioRef.current.pause();
            console.log("pause之后>>>>>>>>>>>>", audioRef.current);
        }
    }
    const importLocal = async (e, dirPath = "D:/") => {
        console.log("dirPath------->>>>", dirPath);
        await windowUtils.openFolder(dirPath, readDir.bind(this));
    }
    const readDir = async (event, arg) => {
        let musicPathList = [];
        let path = arg.filePaths[0];
        await fsUtils.readMusicDir(path, (err, files) => {
            console.log(`list of files from ${path}------->>>>>>>`, files);
            if (files.length > 0) {
                let list = [];
                files.filter((item, index) => {
                    if (item.indexOf('.mp3') !== -1) {
                        list.push(item.substr(0, item.indexOf('.mp3')));
                        musicPathList.push(path + '\\' + item)
                        return true;
                    }
                    return false;
                })
                props.getMusicListFromFooterCom(list);
                setFilePathArray(musicPathList);
            }
        })
    }

    useEffect(() => {
        setDuration(audioRef.current.duration);
        // setCurrentIndex(currentIndex)
    }, [audioRef, currentIndex])

    return (
        <>
            {/* 
                onCanPlay={getDuration.bind(this)}
                onEnded={playNext.bind(this, currentIndex)}    
            */}
            <audio
                onTimeUpdate={updateTime.bind(this)}
                onError={playMusic.bind(this, "pause")}
                ref={audioRef}
                preload="true"
                loop={loopFlag}
                controls={false}
                onEnded={playNext.bind(this, 1)}
                src={filePathArray[currentIndex]}
            ></audio>
            <Row align="middle" style={{ width: "100%" }} >
                <Col span={3}>
                    <Space size={10}>
                        <StepBackwardOutlined
                            onClick={playNext.bind(this, -1)}
                            style={{ fontSize: "24px", cursor: "pointer" }} />
                        <PlayStatusCom
                            playStatus={playFlag}
                            onClick={(flag) => playMusic.bind(this, flag)} />
                        <StepForwardOutlined
                            onClick={playNext.bind(this, 1)}
                            style={{ fontSize: "24px", cursor: "pointer" }} />
                    </Space>
                </Col>
                <Col span={1} style={{ paddingBottom: '10px', paddingRight: '10px' }}
                    className="flex-type flex-justify-end">
                    {commonUtils.secondsFormat(beginTime)}
                </Col>
                <Col span={12}>
                    <div ref={progressRef}>
                        <Progress percent={persent}
                            onClick={setCurrentPlayTime.bind(this)}
                            className="audio-process"
                            showInfo={false} strokeColor={{
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
                        <IconFont style={{ fontSize: '16px' }}
                            type="icon-hanhan-01-011"
                            onClick={setPlayMode.bind(this)}
                            className="webkit-no-drag" />
                        <IconFont style={{ fontSize: '16px' }}
                            type="icon-jia"
                            onClick={importLocal.bind(this)}
                            className="webkit-no-drag" />
                    </Space>
                </Col>
            </Row>

        </>
    )
}
/**
 * set play or pause
 * @param {*} props
 * @returns
 */
function PlayStatusCom(props) {
    const IconFont = createFromIconfontCN();
    if (props.playStatus === "pause") {
        return (
            <IconFont type="icon-bofang"
                style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }}
                onClick={props.onClick("play")} className="webkit-no-drag" />
        )
    } else {
        return (
            <IconFont type="icon-zanting-xianxingyuankuang"
                style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }}
                onClick={props.onClick("pause")} className="webkit-no-drag" />
        )
    }

}
