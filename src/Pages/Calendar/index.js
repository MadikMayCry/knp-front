import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import CabinetHeader from "Layout/CabinetHeader";
import ogd_list from "ogd_list.json";
import fno_list from "fno_list.json";
import monthList from "month_list.json";
import {
  Row,
  Col,
  DatePicker,
  Form,
  List,
  Avatar,
  Button,
  Input,
  Select,
  Icon,
  Alert,
  Breadcrumb,
  Layout
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const title = "";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeVals = e => {
    e = e.format("YYYY-MM-DD");
    let year = e.slice(0, 4);
    let month = e.slice(5, 7);
    this.setState({
      year,
      month
    });
  };

  render() {
    return (
      <>
        <CabinetHeader title={title} />
        <Content style={{ margin: "0 16px", padding: "20px 10px" }}>
          <Row>
            <Alert
              className="breadcrumb-title"
              message={
                <>
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Расширенный календарь</Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Row type="flex" style={{ alignItems: "center" }}>
            <Col span={8}>
              <DatePicker.MonthPicker
                style={{ width: "100%" }}
                placeholder="Выберите месяц"
                onChange={this.changeVals}
              />
            </Col>
            <Col span={6} style={{ padding: "0 10px" }}>
              Вы выбрали данные за {this.state.month} {this.state.year}
            </Col>
          </Row>
          <Row>
            <List
              itemLayout="horizontal"
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={item.style}>
                        <Icon
                          type={item.icon}
                          style={{
                            color: `${item.icon_color}`
                          }}
                        />
                      </Avatar>
                    }
                    title={<a href={item.url}>{item.title}</a>}
                  />
                </List.Item>
              )}
            />
          </Row>
        </Content>
      </>
    );
  }
}

export default Calendar;
