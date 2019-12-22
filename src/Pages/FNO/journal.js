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

const dataRandom = [
  {
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    icon_color: "#E53131",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    icon_color: "#2CCE1E",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  }
];

const years = () => {
  const years = [];
  const dateStart = moment().subtract(20, "y");
  const dateEnd = moment();
  while (dateEnd.diff(dateStart, "years") >= 0) {
    years.push(dateStart.format("YYYY"));
    dateStart.add(1, "year");
  }
  return years;
};

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

  renderList = item => {
    let temp = dataRandom[Math.floor(Math.random() * dataRandom.length)];
    return (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar style={temp.style}>
              <Icon
                type="snippets"
                style={{
                  color: `${temp.icon_color}`
                }}
              />
            </Avatar>
          }
          title={<a href={item.url}>ФНО номер {item.code}</a>}
          description={item.Title}
        />
      </List.Item>
    );
  };

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
                      Список форм налоговой отчетности
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Form layout="inline">
            <Row>
              <Form.Item>
                <Select
                  style={{ width: "300px" }}
                  placeholder="Выберите Год"
                  allowClear
                  defaultValue="2019"
                >
                  {years().map(item => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Найти по году
                </Button>
              </Form.Item>
            </Row>
          </Form>

          <Row>
            <List
              itemLayout="horizontal"
              dataSource={fno_list}
              renderItem={this.renderList}
            />
          </Row>
        </Content>
      </>
    );
  }
}

export default App;
