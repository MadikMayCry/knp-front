import React, { Component } from "react";

import {
  Menu,
  Dropdown,
  Icon,
  message,
  Layout,
  Button,
  Select,
  List,
  Avatar
} from "antd";

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
      <Header
        style={{ background: "#fff", padding: "0px 50px" }}
        className="cabinet-header d-flex jc-fl-end"
      >
        <h1 className="page-title" style={{ marginRight: "auto" }}>
          {title}
        </h1>
        <Button style={{ marginRight: "10px" }}>
          <Icon type="calendar" />
        </Button>
        {/* <Select
          showSearch
          style={{ width: 200, margin: "0 10px" }}
          placeholder="Полезные ссылки"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="jack">Ссылка на первый сайт</Option>
          <Option value="lucy">Ссылка на второй сайт</Option>
          <Option value="tom">Ссылка на третий сайт</Option>
        </Select> */}
        <Dropdown overlay={menu}>
          <Button>
            <Icon type="link" />
            Полезные ссылки <Icon type="down" />
          </Button>
        </Dropdown>
        <div className="logo-title-wrapper" style={{ margin: "0 10px" }}>
          <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
          <div className="logo-title">
            <div className="title">Жайсанбаев Р.М.</div>
            <div className="sub-title">ИИН 940108350128</div>
          </div>
        </div>
        <Button type="link">
          <Icon type="logout" />
        </Button>
      </Header>
    );
  }
}

export default CabinetHeader;
