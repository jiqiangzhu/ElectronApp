import store from '@redux';
import { List, Drawer, Layout } from 'antd';

const { Content } = Layout;
/**
 * music list popup
 * @param {*} props 
 * @returns react dom
 */
function MusicListPopup(props) {
    return (
        <>
            <Drawer
                title="Music List"
                placement="right"
                closable={false}
                onClose={() => props.onClose()}
                visible={props.visible}
                maskStyle={{ background: 'transparent' }}
                headerStyle={{ color: '#FFFFFF' }}
                className="webkit-no-drag cannotselect"
            >
                <div className="my-content">
                    <Content>
                        <List
                            dataSource={props.musicDom}
                            renderItem={(item, index) => (
                                <List.Item className={index === store.getState().playReducer.currentIndex ? "list-item" : ""}>
                                    {item}
                                </List.Item>
                            )}
                        />

                    </Content>
                </div>
            </Drawer>
        </>
    )
}

export default MusicListPopup;