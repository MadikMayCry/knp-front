import React, { Component } from "react";
import {
  Layout,
  Col,
  Row,
  Tabs,
  Button,
  Icon,
  Select,
  Divider,
  Steps,
  Alert,
  List,
  Avatar,
  Tab
} from "antd";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import CabinetHeader from "Layout/CabinetHeader";

import { Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;

const data_table = [
  {
    key: "1",
    fno_numn: "001.00",
    fno_name:
      "Налоговое заявление о приостановлении (продлении, возобновлении) представления налоговой отчетности",
    date_created: "10.01.2018",
    status: "Принято"
  },
  {
    key: "2",
    fno_numn: "001.00",
    fno_name:
      "Налоговое заявление о приостановлении (продлении, возобновлении) представления налоговой отчетности",
    date_created: "10.01.2018",
    status: "Принято"
  },
  {
    key: "3",
    fno_numn: "007.00",
    fno_name:
      "Налоговое заявление о приостановлении (продлении, возобновлении) представления налоговой отчетности",
    date_created: "10.01.2018",
    status: "Принято"
  }
];

const { TabPane } = Tabs;
const title = "Личный кабинет";
const { Step } = Steps;

const onClose = e => {
  console.log(e, "I was closed.");
};

const { Header, Content } = Layout;

const data = [
  {
    title: "Уважаемые налогоплательщики!",
    desc:
      "С 1 января 2020 года вступают в силу изменения  в Налоговый кодекс в части ..."
  },
  {
    title: "Уважаемые налогоплательщики!",
    desc:
      "С 1 января 2020 года вступают в силу изменения  в Налоговый кодекс в части ..."
  },
  {
    title: "Уважаемые налогоплательщики!",
    desc:
      "С 1 января 2020 года вступают в силу изменения  в Налоговый кодекс в части ..."
  },
  {
    title: "Уважаемые налогоплательщики!",
    desc:
      "С 1 января 2020 года вступают в силу изменения  в Налоговый кодекс в части ..."
  }
];

const data_link = [
  "Сведение о задолженности. Получения сведений об отсутствии (наличии) налоговой задолженности, задолженности по обязательным пенсионным взносам, обязательным профессиональным пенсионным взносам и социальным отчислениям",
  "Обжалование результатов налоговой проверки. Обжалование результатов налоговой проверки позволяет налогоплательщику отслеживать статусы своих жалоб на результаты налоговой проверки: формировать запрос на актуальный статус жалобы, получать информацию о статусе и соответствующие данному статусу документы, получать в электронном виде извещение о приостановлении срока рассмотрения жалобы и назначения тематической проверки",
  "Сведения по данным УГО. Получение информации о зарегистрированных на налогоплательщика объектах налогообложения"
];

const data_service = [
  {
    title: "Уважаемые налогоплательщики!",
    icon: "file-text",
    icon_color: "#334ECD",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "Уважаемые налогоплательщики!",
    icon: "user",
    icon_color: "#E53131",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    title: "Уважаемые налогоплательщики!",
    icon: "credit-card",
    icon_color: "#2CCE1E",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  },
  {
    title: "Уважаемые налогоплательщики!",
    icon: "bell",
    icon_color: "#EFC224",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  }
];

class Home extends Component {
  render() {
    return (
      <>
        <CabinetHeader title={title} />
        <Content style={{ margin: "0 16px", padding: "20px 10px" }}>
          <Alert
            message="Informational Notes"
            type="info"
            showIcon
            message="17 нобяря. Уплата ЕЗН за период с 1 января по 1 октября 2019 года!"
            type="warning"
            closable
            onClose={onClose}
          />
          <Row gutter={20} style={{ padding: "20px 00px" }} type="flex">
            <Col span={8} style={{}}>
              <div className="card-wrapper">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Уведомления" key="1">
                    <div className="tab-content">
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              title={<Link to="/">{item.title}</Link>}
                              description={item.desc}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Новости" key="2">
                    <div className="tab-content">
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              title={<Link to="/">{item.title}</Link>}
                              description={item.desc}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Сообщения" key="3">
                    <div className="tab-content">
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              title={<Link to="/">{item.title}</Link>}
                              description={item.desc}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
            <Col span={8}>
              <div className="card-wrapper">
                <div className="card">
                  <h4>Государственные услуги</h4>
                  <Divider style={{ margin: "15px 0" }} />
                  <List
                    itemLayout="horizontal"
                    dataSource={data_service}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              shape="square"
                              size="large"
                              // icon={item.icon ? item.icon : "user"}
                              style={item.style}
                            >
                              <Icon
                                type={item.icon}
                                style={{
                                  fontSize: "20px",
                                  color: `${item.icon_color}`
                                }}
                                theme="outlined"
                              />
                            </Avatar>
                          }
                          title={<a href="">{item.title}</a>}
                          description={item.desc}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="card-wrapper">
                <div className="card">
                  <h4>Сервисы</h4>
                  <Divider style={{ margin: "15px 10px" }} />
                  <List
                    className="services"
                    size="large"
                    dataSource={data_link}
                    renderItem={item => (
                      <List.Item>
                        <div className="desc-text">{item}</div>
                        <Button className="card-link" type="primary" size="small">Подробнее</Button>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "10px",
              padding: "40px 20px 20px",
              backgroundColor: "#fff"
            }}
          >
            <Steps current={1}>
              <Step title="Загрузка" description="документ загружен" />
              <Step
                title="В процессе"
                subTitle="Осталось 00:00:08"
                description="Ожидание действий"
              />
              <Step title="Завершение" description="Полная выгрузка" />
            </Steps>
            <Table dataSource={data_table} style={{ marginTop: "25px" }}>
              <Column title="Номер ФНО" dataIndex="fno_numn" key="fno_numn" />
              <Column
                title="Наименование ФНО"
                dataIndex="fno_name"
                key="fno_name"
              />
              <Column
                title="Дата создания"
                dataIndex="date_created"
                key="date_created"
              />
              <Column title="Статус" dataIndex="status" key="status" />
            </Table>
          </Row>
        </Content>
      </>
    );
  }
}

export default Home;