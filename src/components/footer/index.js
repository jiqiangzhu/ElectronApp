import { Space, Row, Col, Progress, message, Slider, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import '@/App.less';
import commonUtils from '@localUtils/common-util';
import windowUtils from '@localUtils/window-util';
import fsUtils from '@localUtils/fs-util';
import { StepBackwardOutlined, StepForwardOutlined, createFromIconfontCN } from '@ant-design/icons';
import store from '@redux';
import { playMusicRedux, pauseMusicRedux, currentIndexRedux, musicListRedux, audioRefRedux } from '@redux/actions/play-actions';

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
    const audioRef = React.createRef();
    const beginRef = React.createRef();
    const progressRef = React.createRef();
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);
    const [currentSrc, setCurrentSrc] = useState("");
    const [fileNameArray, setFileNameArray] = useState([]);
    const [audioVolume, setAudioVolume] = useState(localStorage.defalutVolume ? localStorage.defalutVolume : 1);
    useEffect(() => {
        if (localStorage.defaultMusicPath) {
            readDir("init", localStorage.defaultMusicPath)
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setDuration(duration);
        try {
            if (audioRef.current) {
                audioRef.current.volume = audioVolume;
            }
        } catch (e) {
            console.error(`The program reported an error when playing song\n${e}`);
        }
        setPlayMode(localStorage.playMode ? localStorage.playMode : "1");

    }, [duration, audioRef, audioVolume])

    const updateTime = () => {
        let temPercent = (audioRef.current.currentTime / duration) * 100;
        setPercent(temPercent);
        setBeginTime(parseInt(audioRef.current.currentTime));
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
            store.dispatch(playMusicRedux("play"));
            store.dispatch(audioRefRedux(audioRef.current));
            store.getState().playReducer.currentAudio.play();
            // reducer.currentAudio.play();
        } catch (e) {
            console.error(`The program reported an error on progress bar\n${e}`);
        }
    }

    const playNext = (value) => {
        let reducer = store.getState().playReducer;
        let listLen = store.getState().playReducer.musicList.length;
        let currIndex = store.getState().playReducer.currentIndex;
        if (listLen <= 0) {
            message.error({
                content: "music list is null",
                style: {
                    marginTop: '40vh',
                },
            });
            return;
        }
        try {
            if (reducer.playFlag === "play") {
                reducer.currentAudio.pause();
            }
            if (playMode !== "3") {
                if (value === 1) {
                    if ((currIndex + 1) >= listLen) {
                        store.dispatch(currentIndexRedux(0, audioRef.current));
                    } else {
                        store.dispatch(currentIndexRedux(currIndex + 1, audioRef.current));
                    }
                } else if (value === -1) {
                    if ((currIndex - 1) < 0) {
                        store.dispatch(currentIndexRedux(listLen - 1, audioRef.current));
                    } else {
                        store.dispatch(currentIndexRedux(currIndex - 1, audioRef.current));
                    }
                }
            } else {
                let tempIndex = commonUtils.randomInteger(currIndex, listLen);
                store.dispatch(currentIndexRedux(tempIndex, audioRef.current));
            }

            if (reducer.currentAudio && reducer.playFlag === "play") {
                reducer.currentAudio.play();
            }
            props.setMusicDom();
        } catch (e) {
            console.error(`The program reported an error when switching songs\n${e}`);
        }
    }

    const playMusic = (flag) => {
        let reducer = store.getState().playReducer;
        try {
            if (flag) {
                store.dispatch(playMusicRedux("pause"));
                return;
                // throw new Error('audio error when play music...');
            }
            store.dispatch(audioRefRedux(audioRef.current));
            if (!audioRef.current.currentSrc) {
                message.error({
                    content: "unvalid music url",
                    style: {
                        marginTop: '40vh',
                    },
                });
                return;
            }
            if (reducer.playFlag === "pause") {
                store.dispatch(playMusicRedux("play"));
                reducer.currentAudio.play();
            } else if (store.getState().playReducer.playFlag === "play") {
                store.dispatch(pauseMusicRedux("pause"));
                reducer.currentAudio.pause();
            } else {
                throw new Error('music play error.\n redux error...');
            }
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
        if (event === "init") {

        }
        store.dispatch(audioRefRedux(audioRef.current))
        let musicList = fileNameArray;
        let fullPathList = store.getState().playReducer.musicList.musicList;
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
                    store.dispatch(musicListRedux(fullPathList));
                    // store.dispatch(currentIndexRedux(localStorage.currentIndex ? parseInt(localStorage.currentIndex) : 0));
                    setCurrentSrc(store.getState().playReducer.musicList[store.getState().playReducer.currentIndex]);
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
                setAudioVolume(value);
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
                src={currentSrc}
                onCanPlay={getDuration.bind(this)}
            ></audio>
            <Row align="middle" style={{ width: "100%" }} >
                <Col span={3}>
                    <Space size={10}>
                        <StepBackwardOutlined
                            onClick={playNext.bind(this, -1)}
                            style={{ fontSize: "24px", cursor: "pointer" }} />
                        <PlayStatusCom
                            playStatus={store.getState().playReducer.playFlag}
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
    let type = props.playStatus === "play" ? "icon-zanting-xianxingyuankuang" : "icon-bofang";
    return (
        <IconFont type={type}
            style={{ color: '#fff', fontSize: "24px", cursor: "pointer" }}
            onClick={() => props.onClick()} className="webkit-no-drag" />
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