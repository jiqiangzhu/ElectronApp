import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setShowLoaingRedux } from 'src/redux/actions/play-actions';
import './index.less';

function Loading(props) {
    const { showLoading, setShowLoading } = props;
    const [showTips, setShowTips] = useState("Loading...")
    useEffect(() => {
        setTimeout(() => {
            setShowTips("Cancel");
        })
    }, [showTips])
    return (
        <div className="loading cannotselect" style={{ display: showLoading ? "flex" : "none" }}>
            <div className="box">
                <div className="solar">
                    <i className="mercury"></i>
                    <i className="venus"></i>
                    <i className="earth"></i>
                    <i className="mars"></i>
                    <i className="belt"></i>
                    <i className="jupiter"></i>
                    <i className="saturn"></i>
                    <i className="uranus"></i>
                    <i className="neptune"></i>
                </div>
                <div className="tips">
                    <div className={`words ${showTips === "Cancel" ? "cancel" : "continue"}`} onClick={() => setShowLoading(false)}>
                        {showTips}
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        showLoading: state.playReducer.showLoading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setShowLoading: (showLoading) => {
            dispatch(setShowLoaingRedux(showLoading))
        }
    }
}
const LoadingCom = connect(mapStateToProps, mapDispatchToProps)(Loading);


export default LoadingCom;