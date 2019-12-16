import React, { Component } from "react";
import {
  Layout,
  Col,
  Row,
  Tabs,
  Button,
  Icon,
  Modal,
  Divider,
  Steps,
  Alert,
  List,
  Avatar,
  Breadcrumb
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

const { Content } = Layout;

const data_notification = [
  {
    id: 1,
    title: "Уважаемые налогоплательщики!",
    desc: `Уважаемые налогоплательщики, осуществляющие следующие виды деятельности:
      индивидуальные предприниматели и юридические лица, осуществляющие лизинговую деятельность в качестве лизингодателя без лицензии;
      ломбарды;
      индивидуальные предприниматели и юридические лица, осуществляющие операции с драгоценными металлами и драгоценными камнями, ювелирными изделиями из них;
      индивидуальные предприниматели и юридические лица, оказывающие посреднические услуги при осуществлении сделок купли-продажи недвижимого имущества.
      Обращаем Ваше внимание на то, что юридические лица и индивидуальные предприниматели, осуществляющие вышеуказанные виды деятельности являются одним из субъектов финансового мониторинга согласно пункту 1 статьи 3 Закона Республики Казахстан «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма» (далее – Закон о ПОД/ФТ).
      Вместе с тем, вышеуказанные субъекты финансового мониторинга, в соответствии с пунктом 3 статьи 3 Закона о ПОД/ФТ, обязаны направить уведомление о начале или прекращении деятельности лица, являющегося субъектом финансового мониторинга (далее - Уведомление) в Комитет по финансовому мониторингу в порядке, предусмотренном приказом Министра национальной экономики Республики Казахстан от 6 января 2015 года № 4 «Об утверждении форм уведомлений и Правил приема уведомлений государственными органами, а также об определении государственных органов, осуществляющих прием уведомлений».
      Необходимо отметить, что в соответствии с пунктом 2 статьи 17 Закона Республики Казахстан «О разрешениях и уведомлениях», осуществление физическими и юридическими лицами деятельности или действий (операций), для которых настоящим Законом установлен разрешительный или уведомительный порядок, без получения соответствующего разрешения или без направления соответствующего уведомления не допускается.
      Более того, статьей 463 Кодекса Республики Казахстан «Об административных правонарушениях» за ненаправление уведомления предусмотрена ответственность.
      Предоставление уведомления автоматизировано в информационной системе «Государственная база данных «Е - лицензирование» (раздел «Финансы» - «Уведомительный порядок»), в связи с чем уведомляем о возможности направления уведомления электронным способом.
      Дополнительно сообщаем, что согласно пункту 3 Правил представления субъектами финансового мониторинга сведений и информации об операциях, подлежащих финансовому мониторингу, утвержденных постановлением Правительства Республики Казахстан от 23 ноября 2012 года № 1484, вышеуказанные субъекты направляют сведения и информация об операциях, подлежащих финансовому мониторингу (форма ФМ-1) посредством сетей телекоммуникаций республиканского государственного предприятия на праве хозяйственного ведения «Казахстанский центр межбанковских расчетов Национального Банка Республики Казахстан» (АРМ-СФМ) или веб-портала уполномоченного органа (Web-СФМ) в формате XML.
      Регистрация в АРМ-СФМ или Web-СФМ осуществляется по ссылке https://kfm.gov.kz/ru/to-help-sps/sdvo/
      По дополнительным вопросам просим обратиться в Комитет по финансовому мониторингу по следующим контактам: 8 (7172) 74-97-52, 74-97-49, 74-92-26, 74-97-39.
      Комитет по финансовому мониторингу
      Министерства финансов
      Республики Казахстан.
      `
  },
  {
    id: 2,
    title: "Уважаемые налогоплательщики!",
    desc:
      "Обращаем ваше внимание, что оплата налогов, госпошлин, штрафов и других платежей возможно осуществлять через мобильное приложение egov.kz."
  },
  {
    id: 3,
    title: "Уважаемый налогоплательщик (налоговый агент)!",
    desc:
      "Доводим до Вашего сведения, что в связи с изменением налогового законодательства приказом МФ РК № 1255 от 13 ноября 2019 года внесены изменения в налоговую "
  }
];

const messages = [
  {
    title: "Уважаемые налогоплательщики!",
    desc:
      "Форма налоговой отчетности 910.00 за второе полугодие 2018 обработана от 15.12.2019г."
  },
  {
    title: "Уважаемые налогоплательщики!",
    desc:
      "Cведения об отсутствии (наличии) налоговой задолженности получены от 12.12.2019г."
  },
  {
    title: "Уважаемые налогоплательщики!",
    desc: "Выписка из лицевого счета получена от 10.12.2019г."
  },
  {
    title: "Уважаемые налогоплательщики!",
    desc:
      "Налоговое заявление об отзыве налоговой отчетности 911.00 обработано от 01.12.2019г."
  }
];

const data_link = [
  "Сведение о задолженности. Получения сведений об отсутствии (наличии) налоговой задолженности, задолженности по обязательным пенсионным взносам, обязательным профессиональным пенсионным взносам и социальным отчислениям",
  "Оплата налогов и других обязательных платежей в бюджет",
  "Сервис предоставления сведений о состоянии расчетов с бюджетом"
];

const data_news = [
  {
    title:
      "Теперь контрафактную алкогольную продукцию можно выявить за считанные секунды",
    desc: `АО «Национальные информационные технологии» разработало новое мобильное приложение «e-Sapa», с помощью которого каждый казахстанец сможет определить подлинность учетно-контрольной марки и легальность поставляемой алкогольной продукции.
    Для того, чтобы проверить продукцию на контрафакт пользователю нужно открыть сканер в приложении и точно навести фокус камеры смартфона на штрих код, который расположен на учетно-контрольной марке. После сканирования марки, на экране смартфона откроется страница, в которой будет сказано «Код существует в Базе» и указана информация о производителе – это будет означать, что продукция безопасна и пригодна к употреблению, либо придет Push-уведомление «УКМ не найдена», что говорит об обратном.
    Если возникли сложности со считыванием марки или марка повреждена, то можно воспользоваться функцией «Ручного ввода», в которой вы можете проверить алкогольную продукцию по серии и номеру указанному на марке в горловой части бутылки, в формате AA – серия, 000000000 - номер.
    Мобильное приложение доступно для скачивания в магазинах приложений Play Market и App Store.
    Отметим, что «e-Sapa» было разработано в рамках борьбы с реализацией алкогольной продукции с марками неустановленного образца и минимизации продажи нелегальной алкогольной продукции совместно с Комитетом государственных доходов Министерства Финансов РК.
    `,
    date: "9 декабря 2019"
  },
  {
    title: "Оплачивать госуслуги можно с помощью QR-кода",
    desc: `АО «Национальные информационные технологии» сообщает, что с 12 ноября текущего года, на платежном шлюзе «Электронного правительства» (ПШЭП) доступна услуга оплаты посредством QR-кода, реализованного на платформе международной платежной системы Visa. Сервис был разработан АО «НИТ» совместно с Halyk Bank (АО «Народный банк Казахстана»).
    Теперь для того, чтобы воспользоваться этим способом оплаты государственных услуг достаточно заказать услугу на веб-портале «электронного правительства», на странице ПШЭП выбрать «QR-code»-HomeBank и  отсканировать сформированный код в мобильном приложении Homebank.
    Удобная и безопасная технология QR платежей Visa позволяет мгновенно проводить безналичные операции с помощью мобильного приложения на смартфоне, без необходимости ручного ввода данных платежных карт.
    Отметим, что на ПШЭП доступны также следующие способы оплаты: платежной картой, электронным кошельком, мобильным балансом, счет-заявкой.
    `,
    date: "12 ноября 2019"
  }
];

const data_service = [
  {
    title: "Регистрационный учет лица, занимающегося частной практикой",
    icon: "file-text",
    icon_color: "#334ECD",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(51, 78, 205, 0.2)"
    }
  },
  {
    title: "Регистрация налогоплательщиков",
    icon: "user",
    icon_color: "#E53131",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  },
  {
    title: "Регистрационный учет в качестве электронного налогоплательщика",
    icon: "credit-card",
    icon_color: "#2CCE1E",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(44, 206, 30, 0.2)"
    }
  },
  {
    title: "Регистрационный учет плательщиков налога на добавленную стоимость",
    icon: "bell",
    icon_color: "#EFC224",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(239, 194, 36, 0.2)"
    }
  },
  {
    title: "Выдача лицензии на производство этилового спирта",
    icon: "user",
    icon_color: "#E53131",
    desc:
      "Изменение сроков исполнения налогового обязательства по уплате налогов и (или) плат",
    style: {
      background: "rgba(229, 49, 49, 0.2)"
    }
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modal: {
        desc: ""
      },
      data_notification: data_notification
    };
  }

  showModal = e => {
    console.log(e.target.name);

    this.setState({
      visible: true,
      modal: {
        desc: e.target.value
      }
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  acquainted = e => {
    const filterInPlace = (array, predicate) => {
      let end = 0;
      for (let i = 0; i < array.length; i++) {
        const obj = array[i];
        if (predicate(obj)) {
          array[end++] = obj;
        }
      }
      array.length = end;
    };
    const toDelete = new Set([parseInt(e.target.name, 10)]);
    filterInPlace(this.state.data_notification, obj => !toDelete.has(obj.id));
    this.setState({ data_notification });
  };

  render() {
    return (
      <>
        <CabinetHeader title={title} />
        <Content style={{ margin: "0 16px", padding: "20px 10px" }}>
          <Breadcrumb title={title} />
          <Row gutter={20} type="flex" style={{ marginBottom: "30px" }}>
            <Col span={8} style={{}}>
              <div className="card-wrapper">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Уведомления" key="1">
                    <div className="tab-content">
                      <List
                        itemLayout="horizontal"
                        dataSource={this.state.data_notification}
                        renderItem={item => (
                          <List.Item className="yyy">
                            <div className="title-text-custom">
                              {item.title}
                            </div>
                            <div className="desc-text-custom ant-list-item-meta-description">
                              {item.desc}
                            </div>
                            <Button
                              type="default"
                              size="small"
                              onClick={this.acquainted}
                              name={item.id}
                            >
                              Ознакомлен
                            </Button>

                            <Button
                              className="card-link"
                              type="primary"
                              size="small"
                              onClick={this.showModal}
                              style={{
                                marginLeft: "auto"
                              }}
                              value={item.desc}
                            >
                              Подробнее
                            </Button>
                          </List.Item>
                        )}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Новости" key="2">
                    <div className="tab-content">
                      <List
                        itemLayout="horizontal"
                        dataSource={data_news}
                        renderItem={item => (
                          <List.Item className="yyy">
                            <div className="title-text-custom">
                              {item.title}
                            </div>
                            <div className="desc-text-custom ant-list-item-meta-description">
                              {item.desc}
                            </div>
                            <Button type="default" size="small">
                              {item.date}
                            </Button>
                            <Button
                              className="card-link"
                              type="primary"
                              size="small"
                              style={{
                                marginLeft: "auto"
                              }}
                              onClick={this.showModal}
                              value={item.desc}
                            >
                              Подробнее
                            </Button>
                          </List.Item>
                        )}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Сообщения" key="3">
                    <div className="tab-content">
                      <List
                        itemLayout="horizontal"
                        dataSource={messages}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              description={item.desc}
                            />
                            <Button
                              className="card-link"
                              type="primary"
                              size="small"
                            >
                              <Icon type="arrow-right" />
                            </Button>
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
                          // description={item.desc}
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
                  <Divider style={{ margin: "15px 0px" }} />
                  <List
                    className="services"
                    size="large"
                    dataSource={data_link}
                    renderItem={item => (
                      <List.Item>
                        <div className="desc-text-custom ant-list-item-meta-description">
                          {item}
                        </div>
                        <Button
                          className="card-link"
                          type="primary"
                          size="small"
                          onClick={this.showModal}
                          value={item}
                        >
                          Подробнее
                        </Button>
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
        <Modal
          title="Уважаемые налогоплательщики"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="75vw"
        >
          <p>{this.state.modal.desc}</p>
        </Modal>
      </>
    );
  }
}

export default Home;
