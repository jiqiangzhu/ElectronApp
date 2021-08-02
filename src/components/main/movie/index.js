import { Button } from 'antd'
import store from 'src/redux'
import { setShowLoaingRedux } from 'src/redux/actions/play-actions'
import './index.less'

function Movie(props) {
    const changeEvent = () => {
        store.dispatch(setShowLoaingRedux(true))
    }

    return (
        <div className="home-content movie-content">
            <Button type="primary" onClick={changeEvent.bind(this)}>Change</Button>
        </div>
    )
}

export default Movie;