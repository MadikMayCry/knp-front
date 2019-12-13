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
    title: "Приостановление представления налоговой отчетности",
    desc:
      "Налоговое заявление о приостановлении (продлении, возобновлении) представления налоговой отчетности",
    icon: "snippets",
    url: "/001",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title: "Продление представления налоговой отчетности",
    desc: "Уведомление о продлении срока представления налоговой отчетности",
    icon: "snippets",
    url: "/007",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "Налоговая задолженность",
    desc:
      "Запрос на получение сведений об отсутствии (наличии) задолженности, учет по которым ведется в органах государственных доходов",
    icon: "snippets",
    icon_color: "#E53131",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    title: "Зачеты и возвраты",
    desc:
      "Налоговое заявление на проведение зачета и (или) возврата налогов, платежей в бюджет, таможенных платежей, пеней, процентов и штрафов",
    icon: "snippets",
    icon_color: "#2CCE1E",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  },
  {
    title: "Отзыв налоговой отчетности",
    desc: "Налоговое заявление на отзыв налоговой отчетности",
    icon: "snippets",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "Уведомление о ввозе (вывозе) товаров",
    desc:
      "Уведомление о товарах, временно ввезенных на территорию РК с территории государств-членов ТС, а также временно вывезенных с территории РК на территорию государств-членов ТС",
    icon: "snippets",
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
                      Журнал налоговых заявлений
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
