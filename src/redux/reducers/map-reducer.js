import { UpdateTime, MapDom, ShowData } from '../actions/map-actions'

const initialState = {
  newTime: '0000-00-00 00:00:00',
  mapDom: '',
  name: '',
  data: '',
}

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case UpdateTime: {
      return {
        ...state,
        newTime: action.payload.newTime,
      }
    }
    case MapDom: {
      return {
        ...state,
        mapDom: action.payload.mapDom,
      }
    }
    case ShowData: {
      try {
        let showDetaislData = []
        if (
          action.payload.name === 'China' &&
          Object.keys(action.payload.data).length &&
          Object.keys(action.payload.data.add_daily).length
        ) {
          for (let item in action.payload.data) {
            switch (item) {
              case 'deathtotal':
                showDetaislData.push(`累计死亡人数：${action.payload.data[item]}`)
                break
              case 'curetotal':
                showDetaislData.push(`累计治愈人数：${action.payload.data[item]}`)
                break
              default:
                break
            }
          }
          return {
            ...state,
            name: action.payload.name,
            data: JSON.stringify(showDetaislData),
          }
        }
        if (Object.keys(action.payload.data).length && Object.keys(action.payload.data.data).length) {
          // action.payload.data is not {}
          const data = action.payload.data.data
          for (let item in data) {
            switch (item) {
              case 'value':
                showDetaislData.push(`总感染人数: ${data[item]}`)
                break
              case 'deathNum':
                showDetaislData.push(`总死亡人数: ${data[item]}`)
                break
              case 'cureNum':
                showDetaislData.push(`累计治愈人数: ${data[item]}`)
                break
              case 'zerodays':
                showDetaislData.push(`连续无新增天数: ${data[item]}`)
                break
              default:
                break
            }
          }
        }
        return {
          ...state,
          name: action.payload.name,
          data: showDetaislData.length ? JSON.stringify(showDetaislData) : '',
        }
      } catch (err) {
        console.error('showdata-error--', err)
        const showData = JSON.stringify(['无明细数据'])
        return {
          ...state,
          name: action.payload.name,
          data: showData,
        }
      }
    }
    default:
      return state
  }
}

export default mapReducer
