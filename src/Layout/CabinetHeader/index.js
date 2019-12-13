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

import bg from "./bg.png";

const { Option } = Select;
const { Header, Content } = Layout;

const dates = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31
];

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
  calendarsList = () => {
    return dates.map(item => {
      if (item == 13) {
        return (
          <Tooltip title="Сегодня 13 декабря" placement="bottom">
            <Button shape="circle" size="default" type="primary">
              {item}
            </Button>
          </Tooltip>
        );
      }
      if (item == 20) {
        return (
          <Tooltip title="Срок уплаты акциза + за СТП" placement="bottom">
            <Button shape="circle" size="default" type="danger">
              {item}
            </Button>
          </Tooltip>
        );
      }
      if (item == 31) {
        return (
          <Tooltip title="Срок уплаты налога на транспорт" placement="bottom">
            <Button
              shape="circle"
              size="default"
              style={{
                backgroundColor: "#ffec3d"
              }}
            >
              {item}
            </Button>
          </Tooltip>
        );
      }
      return (
        <Button shape="circle" size="default" type="link">
          {item}
        </Button>
      );
    });
  };

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
              <div className="title">Жолдасбекова Ш.К.</div>
              <div className="sub-title">ИИН 591207400104</div>
            </div>
          </div>
          <Button type="link">
            <Icon type="logout" />
          </Button>
        </Header>
        <Content style={{ margin: "0 16px", padding: "10px", flex: "initial" }}>
          <Row
            gutter={20}
            type="flex"
            style={{ justifyContent: "space-between" }}
          >
            <Button type="link">
              <Icon type="left-square" />
              Ноябрь 2019
            </Button>
            <Button type="default">
              <Icon type="calendar" />
              Декабрь 2019
            </Button>
            <Button type="link">
              Январь 2020
              <Icon type="right-square" />
            </Button>
          </Row>
          <Divider style={{ marginTop: 10 }} />
          <Row
            gutter={20}
            type="flex"
            style={{ marginBottom: "10px", justifyContent: "space-between" }}
          >
            {this.calendarsList()}
          </Row>
        </Content>
      </>
    );
  }
}

export default CabinetHeader;
