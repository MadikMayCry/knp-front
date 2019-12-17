import React, { Component } from "react";

import {
  Menu,
  Dropdown,
  Icon,
  message,
  Layout,
  Button,
  Select,
  Row,
  Divider,
  Tooltip,
  List,
  Avatar
} from "antd";
import Calendar from "./Calendar";
import bg from "./bg.png";

const { Option } = Select;
const { Header, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="user" />
      3rd item
    </Menu.Item>
  </Menu>
);

class CabinetHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <>
        <Header
          style={{ background: "#F0F3F9", padding: "0px 50px" }}
          className="cabinet-header d-flex jc-fl-end"
        >
          <h1 className="page-title" style={{ marginRight: "auto" }}>
            {title}
          </h1>
          <img style={{ height: "30px", marginRight: 10 }} src={bg} />
          <Button style={{ marginRight: "10px" }}>
            <Icon type="calendar" />
          </Button>
          <Dropdown overlay={menu}>
            <Button>
              <Icon type="link" />
              Полезные ссылки <Icon type="down" />
            </Button>
          </Dropdown>
          <div className="logo-title-wrapper" style={{ margin: "0 10px" }}>
            <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
            <div className="logo-title">
              <div className="title">Канафина Ж.А.</div>
              <div className="sub-title">ИИН 781227450219</div>
            </div>
          </div>
          <Button type="link">
            <Icon type="logout" />
          </Button>
        </Header>
        <Content style={{ margin: "0 16px", padding: "10px", flex: "initial" }}>
          <Calendar />
        </Content>
      </>
    );
  }
}

export default CabinetHeader;
