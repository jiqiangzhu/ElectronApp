import { Space, Row, Col, Progress, message, Slider, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import '@/App.less';
import commonUtils from '@localUtils/common-util';
import windowUtils from '@localUtils/window-util';
import fsUtils from '@localUtils/fs-util';
import { StepBackwardOutlined, StepForwardOutlined, createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN();
const playModeArr = [
    {
        type: "icon-hanhan-01-011",
        desc: "List Loop",
        index: "1"
    }, {
        type: "icon-hanhan-01-01",
        desc: "Single Circle",
        index: "2"
    }, {
        type: "icon-hanhan-01-012",
        desc: "Random",
        index: "3"
    },
];
/**
 * Footer Play Controller Component
 * @param {Object} props 
 * @returns 
 */
export default function FooterCom(props) {
    const [beginTime, setBeginTime] = useState(0);
    // 1 list loop 2 single circle 3 random default 1
    const [playMode, setPlayMode] = useState("1");
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = React.createRef();
    const beginRef = React.createRef();
    const progressRef = React.createRef();
    const [playFlag, setPlayFlag] = useState("pause");
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);
    const [filePathArray, setFilePathArray] = useState([]);
    const [fileNameArray, setFileNameArray] = useState([]);

    useEffect(() => {
        setDuration(duration);
        try {
            if (playFlag === "play" && audioRef.current.paused) {
                audioRef.current.volume = localStorage.defalutVolume;
                audioRef.current.play();
            } else if (playFlag === "pause") {
                audioRef.current.pause();
            }
        } catch (e) {
            console.error(`The program reported an error when playing song\n${e}`);
        }
        setPlayMode(localStorage.playMode ? localStorage.playMode : "1");

    }, [duration, audioRef, playFlag])

    const updateTime = () => {
        let temPercent = (audioRef.current.currentTime / duration) * 100;
        setPercent(temPercent)
        setBeginTime(parseInt(audioRef.current.currentTime))
    }

    const changePlayMode = (e) => {
        setPlayMode(e.key);
        localStorage.playMode = e.key;
    }

    const setCurrentPlayTime = (event) => {
        try {
            if (!audioRef.current.currentSrc) {
                message.error({
                    content: "url is unvalid",
                    style: {
                        marginTop: '40vh',
                    },
                });
                return;
            }
            console.log("event---------", event.pageX);
            // 10 paddingRight
            let currentProgress = event.pageX - (beginRef.current.offsetWidth + beginRef.current.offsetLeft + 10);
            let currentRate = (currentProgress / progressRef.current.offsetWidth * 100);
            let setCurrentTime = (duration * currentRate) / 100;

            console.log("currentProgress--------", currentProgress);
            console.log("currentRate--------", currentRate);
            console.log("setCurrentTime--------", setCurrentTime);
            audioRef.current.currentTime = setCurrentTime;
            setPlayFlag("play");
        } catch (e) {
            console.error(`The program reported an error on progress bar\n${e}`);
        }
    }

    const playNext = (value) => {
        if (filePathArray.length <= 0) {
            message.error({
                content: "music list is null",
                style: {
                    marginTop: '40vh',
                },
            });
            return;
        }
        try {
            if (playMode !== "3") {
                if (value === 1) {
                    if ((currentIndex + 1) >= filePathArray.length) {
                        setCurrentIndex(0);
                    } else {
                        setCurrentIndex(currentIndex + 1);
                    }
                } else if (value === -1) {
                    if ((currentIndex - 1) < 0) {
                        setCurrentIndex(filePathArray.length - 1);
                    } else {
                        setCurrentIndex((currentIndex - 1) * 1)
                    }
                }
            } else {
                let tempIndex = commonUtils.randomInteger(currentIndex, filePathArray.length);
                setCurrentIndex(tempIndex);
            }

        } catch (e) {
            console.error(`The program reported an error when switching songs\n${e}`);
        }

    }

    const playMusic = (flag) => {
        try {
            if (!audioRef.current.currentSrc) {
                message.error({
                    content: "unvalid music url",
                    style: {
                        marginTop: '40vh',
                    },
                });
                return;
            }
            setPlayFlag(flag);
        } catch (e) {
            console.error(`The program reported an error when playing songs\n${e}`);
        }
    }

    const importLocal = async (e, dirPath = "D:/") => {
        await windowUtils.openFolder(dirPath, readDir);
    }

    const getDuration = () => {
        setDuration(audioRef.current.duration);
    }

    const readDir = async (event, arg) => {
        let musicList = fileNameArray;
        let fullPathList = filePathArray;
        let path;
        if (typeof arg === "string") {
            path = arg;
        } else if (typeof arg === "object") {
            path = arg.filePaths[0];
        }
        fsUtils.readMusicDir(path, (err, files) => {
            try {
                console.log(`list of files from ${path}------->>>>>>>`, files);
                if (files.length > 0) {
                    files.filter((item, index) => {
                        if (item.indexOf('.mp3') !== -1) {
                            musicList.push(item);
                            return true;
                        }
                        return false;
                    })
                    musicList = Array.from(new Set(musicList)); //de-duplication
                    fullPathList = musicList.map((item, index) => {
                        return path + '\\' + item;
                    })
                    setFileNameArray(musicList);
                    setFilePathArray(fullPathList);
                    props.getMusicListFromFooterCom(musicList);
                }
            } catch (e) {
                console.error("err----------", err);
                console.error("e----------", e);
            }
        })
    }

    const setVolume = (value) => {
        try {
            if (!isNaN(value)) {
                if (value === 0) {
                    audioRef.current.volume = 0;
                } else {
                    localStorage.defalutVolume = value;
                    audioRef.current.volume = localStorage.defalutVolume;
                }
            } else {
                throw new Error('value is not a number')
            }
        } catch (e) {
            console.log(`program reported an error when set volume \n ${e}`);
        }
    }

    return (
        <>
            <audio
                onTimeUpdate={updateTime.bind(this)}
                onError={playMusic.bind(this, "pause")}
                ref={audioRef}
                preload="true"
                loop={playMode === "2" ? true : false}
                controls={false}
                onEnded={playNext.bind(this, 1)}
                src={filePathArray[currentIndex]}
                onCanPlay={getDuration.bind(this)}
            ></audio>
            <Row align="middle" style={{ width: "100%" }} >
                <Col span={3}>
                    <Space size={10}>
                        <StepBackwardOutlined
                            onClick={playNext.bind(this, -1)}
                            style={{ fontSize: "24px", cursor: "pointer" }} />
                        <PlayStatusCom
                            playStatus={playFlag}
                            onClick={playMusic.bind(this)} />
                        <StepForwardOutlined
                            onClick={playNext.bind(this, 1)}
                            style={{ fontSize: "24px", cursor: "pointer" }} />
                    </Space>
                </Col>
                {/* <Col span={1} style={{ paddingBottom: '10px', paddingRight: '10px' }}
                    className="flex-type flex-justify-end">
                    {commonUtils.secondsFormat(beginTime)}
                </Col> */}
                <span ref={beginRef} style={{ paddingBottom: '10px', paddingRight: '10px' }} className="cannotselect">
                    {commonUtils.secondsFormat(beginTime)}
                </span>
                <Col span={12}>
                    <div className="progress" ref={progressRef}>
                        <Progress percent={percent}
                            onClick={setCurrentPlayTime.bind(this)}
                            className="audio-process"
                            showInfo={false} strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }} />
                    </div>
                </Col>
                <span style={{ paddingBottom: '10px', paddingLeft: '10px' }} className="cannotselect">
                    {commonUtils.secondsFormat(parseInt(duration) ? parseInt(duration) : 0)}
                </span>
                {/* <Col style={{ paddingBottom: '10px', paddingLeft: '10px' }} span={1}>
                    {commonUtils.secondsFormat(parseInt(duration) ? parseInt(duration) : 0)}
                </Col> */}
                <Col span={4} className="flex-type flex-justify-end">
                    <Space size="middle" style={{ paddingBottom: '10px', }}>
                        <SetPlayModeCom changePlayMode={changePlayMode.bind(this)}
                            playMode={playMode}
                        />
                        <IconFont style={{ fontSize: '16px' }}
                            type="icon-jia"
                            onClick={importLocal.bind(this)}
                            className="webkit-no-drag" />
                        <SetVolumeCom defaultValue={localStorage.defalutVolume ? localStorage.defalutVolume : 1}
                            setVolume={setVolume.bind(this)}
                        />
                        <IconFont style={{ fontSize: '16px' }}
                            type="icon-liebiao1"
                            onClick={() => props.openMusicList()}
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
    let action = props.playStatus === "pause" ? "play" : "pause";
    let type = props.playStatus === "pause" ? "icon-bofang" : "icon-zanting-xianxingyuankuang";
    return (
        <IconFont type={type}
            style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }}
            onClick={() => props.onClick(action)} className="webkit-no-drag" />
    )
}

/**
 * set media volume
 * @param {Object} props 
 * @returns 
 */
function SetVolumeCom(props) {
    const [currentVolume, setCurrentVolume] = useState(props.defaultValue * 10);
    const style = {
        display: 'inline-block',
        height: 80
    }

    const setVolume = (value) => {
        if (value === 0) {
            if (currentVolume === 0) {
                props.setVolume(localStorage.defalutVolume);
                setCurrentVolume(localStorage.defalutVolume * 10);
            } else {
                props.setVolume(0);
                setCurrentVolume(0);
            }
            return;
        }
        props.setVolume(value / 10);
        setCurrentVolume(value);
    }

    const menu = (
        <div style={style}>
            <Slider vertical max={10} min={0} step={1} defaultValue={props.defaultValue * 10}
                value={currentVolume}
                onChange={(value) => setVolume(value)} />
        </div>
    )

    return (
        <Dropdown overlay={menu} trigger={['hover']} placement='topCenter'>
            <Space className="webkit-no-drag">
                <IconFont style={{ fontSize: '16px' }}
                    onClick={() => setVolume(0)}
                    type={currentVolume === 0 ? "icon-mute" : 'icon-yinliang'}
                    className="webkit-no-drag" />
            </Space>
        </Dropdown>
    )
}

/**
 * set play mode
 * @param {Object} props 
 * @returns 
 */
function SetPlayModeCom(props) {

    const menu = (
        <Menu theme="dark"
            onClick={props.changePlayMode}
        >
            {playModeArr.map((item, index) => {
                return (
                    <Menu.Item key={item.index}>
                        <IconFont style={{ fontSize: '16px' }}
                            type={item.type}
                            className="webkit-no-drag" /> {item.desc}
                    </Menu.Item>
                )
            })}
        </Menu >
    )

    let playMode = props.playMode * 1;

    return (
        <Dropdown overlay={menu} trigger={['hover']} placement='topCenter'>
            <Space className="webkit-no-drag">
                <IconFont style={{ fontSize: '16px' }}
                    type={playModeArr[playMode - 1].type}
                    className="webkit-no-drag" />
            </Space>
        </Dropdown>
    )
}