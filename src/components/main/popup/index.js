import { List, Drawer, Layout } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

const { Content } = Layout;
/**
 * music list popup
 * @param {*} props
 * @returns react dom
 */
function MusicList(props) {
  const { currentIndex } = props;
  const popupRef = React.createRef();
  // useEffect(() => {
  //   function updateScroll() {
  //     try {
  //       console.log('props.visible', props.visible)
  //       if (popupRef.current && props.visible) {
  //         popupRef.current.scrollTo(0, 1000)
  //       }
  //     } catch {
  //       console.warn('自动滚动出错了')
  //     }
  //   }
  //   updateScroll()
  // }, [popupRef, props])
  return (
    <>
      <Drawer
        title="Music List"
        placement="right"
        closable={false}
        onClose={() => props.onClose()}
        visible={props.visible}
        headerStyle={{ color: '#FFFFFF' }}
        className="webkit-no-drag cannotselect"
      >
        <div ref={popupRef} className="my-content music-popup">
          <Content>
            <List
              dataSource={props.musicDom}
              renderItem={(item, index) => (
                <List.Item className={index === currentIndex && item.props.children.length >= 14 ? 'list-item' : ''}>
                  {item}
                </List.Item>
              )}
            />
          </Content>
        </div>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentIndex: state.playReducer.currentIndex,
  };
};

const MusicListPopup = connect(mapStateToProps)(MusicList);

export default MusicListPopup;
