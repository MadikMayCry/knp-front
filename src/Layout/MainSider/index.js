import React from "react";

import sider_list from "./sider.json";
import MenuList from "./MenuList";
import logo from "Pages/Authorization/blank_logo.png";

import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;
class MainSider extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        collapsible
        className="main-sider"
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width="350px"
      >
        <div style={{padding: "20px"}}>
          <div className="logo-title-wrapper" style={{ marginBottom: "0" }}>
            <img
              src={logo}
              className="logo-cabinet"
            />
            <div className="logo-title">
              <div
                style={{ color: "#fff", fontSize: "14px", lineHeight: "14px" }}
                className="title"
              >
                КАБИНЕТ НАЛОГОПЛАТЕЛЬЩИКА
              </div>
            </div>
          </div>
        </div>
        <MenuList list={sider_list}></MenuList>
      </Sider>
    );
  }
}

export default MainSider;
