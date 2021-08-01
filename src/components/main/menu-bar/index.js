import { Menu, Button } from 'antd';
import React, { useState } from 'react';
import './index.less';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import { SelectKeyRedux } from 'src/redux/actions/play-actions';
import { connect } from 'react-redux';

const { SubMenu } = Menu;

function MenuBarCom(props) {
  const { selectedKeys, setSelectedKeys } = props;
  const [collapsed, setCollapsed] = useState(false);

  const toPage = (path, key) => {
    props.history.push("/" + path);
    setSelectedKeys(key);
  }
  return (
    <div className="menu-bar">
      <Button type="dashed" onClick={() => { setCollapsed(!collapsed) }} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <div style={{ height: '90%' }}>
        <div className="scroll-bar cannotselect">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            mode="inline"
            theme="dark"
            inlineIndent={12}
            inlineCollapsed={collapsed}
            selectedKeys={selectedKeys.currentKey}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={toPage.bind(this, 'home', '1')}>
              Recommend
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={toPage.bind(this, 'video', '2')}>
              Movie
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
              Stay tuned
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Toolbox">
              <Menu.Item key="5" onClick={toPage.bind(this, 'fymap', '5')}> Covid-19 map</Menu.Item>
              <Menu.Item key="6">Stay tuned</Menu.Item>
              <Menu.Item key="7">Stay tuned</Menu.Item>
              <Menu.Item key="8">Stay tuned</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Stay tuned">
              <Menu.Item key="9">Stay tuned</Menu.Item>
              <Menu.Item key="10">Stay tuned</Menu.Item>
              <SubMenu key="sub3" title="Stay tuned">
                <Menu.Item key="11">Stay tuned</Menu.Item>
                <Menu.Item key="12">Stay tuned</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedKeys: state.playReducer.selectedKeys
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedKeys: (key) => {
      console.log('key', key);
      dispatch(SelectKeyRedux(key))
    }
  }
}
const MenuBar = connect(mapStateToProps, mapDispatchToProps)(MenuBarCom)
export default MenuBar;