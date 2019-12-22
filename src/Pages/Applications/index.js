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
    title: "О проведении налоговой проверки;",
    icon: "snippets",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "О прекращении деятельности",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "Налоговое заявление налогоплательщика (налогового агента) об отзыве налоговой отчетности",
    icon: "snippets",
    url: "/007",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title:
      "Налоговое заявление о приостановлении (продлении, возобновлении) представления налоговой отчетности",
    icon: "snippets",
    url: "/001",
    icon_color: "#E53131",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    title: "На получение подтверждения налогового резидентства",
    icon: "snippets",
    icon_color: "#2CCE1E",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  },
  {
    title:
      "На получение справки о суммах полученных доходов из источников в Республике Казахстан и удержанных (уплаченных) налогов",
    icon: "snippets",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "О постановке на регистрационный учет",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title: "О снятии с регистрационного учета",
    icon: "snippets",
    icon_color: "#E53131",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    title: "О регистрационном учете лица, занимающегося частной практикой",
    icon: "snippets",
    icon_color: "#2CCE1E",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  },
  {
    title: "О регистрационном учете по налогу на добавленную стоимость ",
    icon: "snippets",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "О регистрационном учете электронного налогоплательщика",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "О возврате налога на добавленную стоимость, уплаченного по товарам, работам, услугам, приобретаемым за счет средств гранта",
    icon: "snippets",
    icon_color: "#E53131",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    title:
      "На получение выписки из лицевого счета о состоянии расчетов с бюджетом, а также по социальным платежам",
    icon: "snippets",
    icon_color: "#2CCE1E",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  },
  {
    title:
      "На проведение зачета и (или) возврата налогов, платежей в бюджет, таможенных платежей, пеней, процентов и штрафов",
    icon: "snippets",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "О постановке контрольно-кассовой машины на учет в налоговом органе",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title: "О снятии с учета контрольно-кассовой машины",
    icon: "snippets",
    icon_color: "#E53131",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    title:
      "Об изменении сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    icon: "snippets",
    icon_color: "#2CCE1E",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  },
  {
    title:
      "По подтверждению достоверности сумм превышения налога на добавленную стоимость",
    icon: "snippets",
    icon_color: "#334ECD",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title:
      "Заявление о внесении в реестр производителей, оптовых поставщиков и (или) розничных реализаторов только авиационного топлива и (или) мазута",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "Заявление об исключении из реестра производителей, оптовых поставщиков и (или) розничных реализаторов только авиационного топлива и (или) мазута",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "Заявление о продлении срока представления декларации по обороту нефтепродуктов",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "Заявление на отзыв формы отчетности по декларированию производства и оборота отдельных видов нефтепродуктов",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "Заявление о продлении срока представления декларации по обороту биотоплива",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "Заявление о внесении в реестр физических и юридических лиц, осуществляющих деятельность по обороту биотоплива",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title: "Заявление об исключении из реестра физических и юридических лиц",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title: "Заявление на отзыв формы отчетности по биотопливу",
    icon: "snippets",
    icon_color: "#EFC224",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title:
      "Заявление о продлении срока представления декларации по производству и обороту этилового спирта и (или) виноматериала, декларации по производству и обороту алкогольной продукции, декларации по обороту алкогольной продукции",
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
                      Список налоговых заявлений
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Row type="flex" style={{ justifyContent: "flex-end" }}>
            <Input.Search
              placeholder="Введите название"
              style={{ width: 300 }}
              enterButton="Поиск"
              onSearch={value => console.log(value)}
            />
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
                    // description={item.desc}
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
