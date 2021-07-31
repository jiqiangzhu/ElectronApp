import { Menu, Button } from 'antd';
import React from 'react';
import './index.less';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

class MenuBar extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  toPage = (path) => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="menu-bar">
        <Button type="dashed" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <div style={{ height: '90%' }}>
          <div className="scroll-bar">
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1', 'sub2', 'sub3']}
              mode="inline"
              theme="dark"
              inlineIndent={12}
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => this.toPage('/home')}>
                Recommend
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Movie
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Stay tuned
              </Menu.Item>
              <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Toolbox">
                <Menu.Item key="5" onClick={() => this.toPage('/fymap')}> Covid-19 map</Menu.Item>
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
}

export default MenuBar;