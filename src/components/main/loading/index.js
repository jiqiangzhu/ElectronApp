import { connect } from 'react-redux';
import { setShowLoaingRedux } from 'src/redux/actions/play-actions';
import './index.less';
import { Button } from 'antd';

function Loading(props) {
    const { showLoading, setShowLoading } = props;
    return (
        <div className="loading" style={{ display: showLoading ? "flex" : "none" }}>
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
            <Button onClick={() => setShowLoading(showLoading)}>关闭</Button>
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
            dispatch(setShowLoaingRedux(!showLoading))
        }
    }
}
const LoadingCom = connect(mapStateToProps, mapDispatchToProps)(Loading);


export default LoadingCom;