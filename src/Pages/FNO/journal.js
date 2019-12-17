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
  Select,
  Icon,
  Alert,
  Breadcrumb,
  Layout
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const title = "";

const halfYearData = ["Первое полугодие", "Второе полугодие"];

const quarterData = {
  "Первое полугодие": ["Первый квартал", "Второй квартал"],
  "Второе полугодие": ["Третий квартал", "Четвертый квартал"]
};

const appStatuses = {
  1: "Принят",
  2: "Обрабатывается в МПО",
  3: "Обрабатывается в ЦУЛС",
  4: "Ошибка разноски в ЦУЛС",
  5: "Отозвана",
  6: "Отозвана без сторно",
  7: "Ошибка сторнирования"
};
const formType = {
  1: "Первоначальная",
  2: "Очередная",
  3: "Дополнительная",
  4: "Дополнительная по уведомлению",
  5: "Ликвидационная"
};

const data = [
  {
    title: "ФНО номер 910.00",
    desc:
      "Упрощеная декларация для субъектов малого бизнеса",
    icon: "snippets",
    url: "/declaration",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
      halfYears: quarterData[halfYearData[0]],
      quarter: quarterData[halfYearData[0]][0],
      url: `http://10.202.41.203:9020/tax-report/tax-forms?userXin=560319301503`
    };
  }

  optionFieldsJson = item => {
    return item.map(item => {
      return (
        <Option value={item.code}>
          {item.code}, {item.Title}
        </Option>
      );
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
                    <Breadcrumb.Item>
                      Журнал Форм налоговой отчетности
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Row>
            <List
              itemLayout="horizontal"
              dataSource={data}
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
                    description={item.desc}
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

export default App;
