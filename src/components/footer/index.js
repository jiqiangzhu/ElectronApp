import { Space, Row, Col, Progress, message, Slider, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import '@/App.less';
import commonUtils from '@localUtils/common-util';
import windowUtils from '@localUtils/window-util';
import fsUtils from '@localUtils/fs-util';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

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
    const progressRef = React.createRef();
    const [playFlag, setPlayFlag] = useState("pause");
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);
    const [filePathArray, setFilePathArray] = useState([]);

    useEffect(() => {
        setDuration(duration);
        try {
            if (playFlag === "play" && audioRef.current.paused) {
                audioRef.current.volume = localStorage.defalutVolume;
                // console.log("readyState>>>>>>>", audioRef.current.readyState);
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
        console.log("event---------", event.pageX);
        console.log("progressRef.current.offsetLeft--------", progressRef.current.offsetLeft + 190);
        console.log("progressRef.current.width--------", progressRef.current.offsetWidth + 190);
        let currentProgress = event.pageX - (progressRef.current.offsetLeft + 190);
        let currentRate = parseInt(currentProgress / progressRef.current.offsetWidth * 100);
        let setCurrentTime = (duration * currentRate) / 100;
        audioRef.current.currentTime = setCurrentTime;
        setPlayFlag("play");
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
                        setCurrentIndex(currentIndex + 1)
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
                    content: "valid music url",
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
        await windowUtils.openFolder(dirPath, readDir.bind(this));
    }

    const getDuration = () => {
        setDuration(audioRef.current.duration);
    }

    const readDir = async (event, arg) => {
        let musicPathList = [];
        // let musicList = filePathArray;
        let path;
        if (typeof arg === "string") {
            path = arg;
        } else if (typeof arg === "object") {
            path = arg.filePaths[0];
        }
        await fsUtils.readMusicDir(path, (err, files) => {
            console.log(`list of files from ${path}------->>>>>>>`, files);
            if (files.length > 0) {
                let list = [];
                files.filter((item, index) => {
                    if (item.indexOf('.mp3') !== -1) {
                        list.push(item.substr(0, item.indexOf('.mp3')));
                        musicPathList.push(path + '\\' + item)

                        // let fileName = item.substr(0, item.indexOf('.mp3'))
                        // musicPathList.push({ fullPath: path + '\\' + item, fileName: fileName })
                        return true;
                    }
                    return false;
                })
                props.getMusicListFromFooterCom(list);
                setFilePathArray(musicPathList);
                // if(!audioRef.current.paused) {

                // }
            }
        })
    }

    const setVolume = (value) => {
        localStorage.defalutVolume = value;
        try {
            audioRef.current.volume = localStorage.defalutVolume;
        } catch (e) {
            console.log("program reported an error when set ");
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
                <Col span={1} style={{ paddingBottom: '10px', paddingRight: '10px' }}
                    className="flex-type flex-justify-end">
                    {commonUtils.secondsFormat(beginTime)}
                </Col>
                <Col span={12}>
                    <div ref={progressRef}>
                        <Progress percent={percent}
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
                onClick={() => props.onClick("play")} className="webkit-no-drag" />
        )
    } else {
        return (
            <IconFont type="icon-zanting-xianxingyuankuang"
                style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }}
                onClick={() => props.onClick("pause")} className="webkit-no-drag" />
        )
    }

}

/**
 * set media volume
 * @param {Object} props 
 * @returns 
 */
function SetVolumeCom(props) {
    const style = {
        display: 'inline-block',
        height: 80
    };
    const menu = (
        <div style={style}>
            <Slider vertical max={10} min={0} step={1} defaultValue={props.defaultValue * 10}
                onChange={(value) => props.setVolume(value / 10)} />
        </div>
    );
    return (
        <Dropdown overlay={menu} trigger={['hover']} placement='topCenter'>
            <Space className="webkit-no-drag">
                <IconFont style={{ fontSize: '16px' }}
                    type="icon-yinliang"
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
    );
    let playMode = props.playMode * 1;
    return (
        <Dropdown overlay={menu} trigger={['click']} placement='topCenter'>
            <Space className="webkit-no-drag">
                <IconFont style={{ fontSize: '16px' }}
                    type={playModeArr[playMode - 1].type}
                    className="webkit-no-drag" />
            </Space>
        </Dropdown>
    )
}