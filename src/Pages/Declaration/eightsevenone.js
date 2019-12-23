import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import CabinetHeader from "Layout/CabinetHeader";
import ogd_list from "ogd_list.json";
import {
  Row,
  Col,
  DatePicker,
  Form,
  Button,
  Collapse,
  Typography,
  Tooltip,
  Input,
  Select,
  Icon,
  InputNumber,
  Alert,
  Radio,
  Divider,
  Breadcrumb,
  Layout,
  message
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const title = "";

const halfYearData = ["Первое полугодие", "Второе полугодие"];

const sections = {
  1: "Раздел. Общая информация о налогоплательщике (налоговом агенте)",
  2: "Раздел. Исчисление налогов",
  3: "Раздел. Исчисление социальных платежей за индивидуального предпринимателя",
  4: "Раздел. Исчисление индивидуального подоходного налога и социальных платежей физических лиц",
  5: "Раздел. Бизнес - идентификационный номер аппарата акимов городов районного значения, сел, поселков, сельских округов",
  6: "Раздел. Ответственность налогоплательщика (налогового агента)",
  7: "Раздел. Плата за эмиссию в окружающую среду, подлежащая уплате в бюджет",
  8: "Раздел. Сведения об объемах загрязнения и единицах измерения, указанных в строке 7 для исчисления за эмиссию в окружающую среду",
  9: "Раздел. Сведения об установленных ставках для исчисления платы за эмиссии в окружающую среду"
};

const environmentalUnit = {
  1: "Тонна",
  2: "Кг",
  3: "гБк",
  4: "Иное"
};

const coefficients = {
  1: "коэффициент 0.3",
  2: "коэффициент 0.2",
  3: "коэффициент 0.43",
  4: "коэффициент 0.05"
};

const longTitle =
  "Ставка платы в пределах норматива,  с учетом размера повышения ставки по решению местных представительных органов согласно( п.8 ст. 576 Налогового кодекса) и коэффициентов (п.2 ст. 577 Налогового кодекса) (870.01.006 Х 870.01.009 А(В,С ИЛИ D) или (870.01.008 Х 870.01.009 А(В,С ИЛИ D)";

const sectionTwo = [
  {
    "001": "Сумма исчисленной оплаты в пределах установленного лимита"
  },
  {
    "002": "Сумма Исчисленной оплаты сверх установленного лимита"
  },
  {
    "003": "Сумма исчисленной платы к уплате - всего"
  }
];

const sectionThree = [
  {
    "01.001": "Остаток норматива на начало квартала",
    "01.002": "Объем выкупленного норматива ",
    "01.003": "Фактический объем эмиссий в пределах установленных нормативов",
    "01.004": "Фактический объем эмиссий свех установленных нормативов",
    "01.005": "Остаток норматива на конец квартала"
  }
];

const sectionFour = [
  {
    "01.006":
      "Ставка платы, установленная согласно статье 576 налогового кодекса",
    "01.007":
      "Размер повышения ставки платы по решению местных преставительных органов (п.8 ст. 576 налогового кодекса)",
    "01.008":
      "Ставка платы с учетом размера повышения ставки по решению местных представительных органов согласно п.8 ст. 576 Налогового кодекса)"
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

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
  whiteSpace: "normal"
};

const formType = {
  1: "Первоначальная",
  2: "Очередная",
  3: "Дополнительная",
  4: "Дополнительная по уведомлению",
  5: "Ликвидационная"
};

const environmentalManagementType = {
  1: "Выбросы загрязняющих веществ от стационарных источников",
  2: "Выбросы загрязняющих веществ от сжигания попутного или природного газа в факелах",
  3: "Выбросы загрязняющих веществ в атмосферный воздух от передвижных источников",
  4: "сбросы",
  5: "размещение отходов производства и потребления",
  6: "Размешение серы"
};

const datesList = [
  "notificationDate",
  "sendDate",
  "postalStampDate",
  "receiveDate",
  "permitIssueDate",
  "permitValidityEndDate",
  "permitValidityStartDate"
];

const currencyCode = {
  1: "KZT",
  2: "RUB"
};

const customTaxPayerCategory = {
  1: "Доверительный управляющий в соотвествии со статьей 40 Налогового кодекса",
  2: "Учредитель доверительного платежа управления в соотвествии со статьей 40 Налогового кодекса",
  3: "Налогоплательщик с объемами платежей до 100 МРП в суммарном годовом объеме, в соответсвии со статьей 579 налогового кодекса"
};

class Declaration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: {
        taxPayerXin: "560319301503",
        name: "Муратали",
        lastname: "Бердибаев",
        patronymic: "Есаналиевич",
        corp:
          "Филиал республиканского государственного предприятия на праве хозяйственного ведения 'Казгидромет' министерства Энергетики республики казахстан по акмолинской области"
      },
      ogd_all: undefined,
      sumSectionThree: {},
      sumSectionFour: {},
      isFetching: false,
      data: [],
      url: `http://10.202.41.203:9020/tax-report/tax-forms?userXin=591207400104`
    };
  }

  sectionThreeHandler = name => value => {
    if (value) {
      let sum = this.state.sumSectionThree;
      sum[name] = value;
      let balance = 0;

      Object.entries(sum).map(([key, value]) => {
        if (key != "01.005") {
          balance = balance + parseFloat(value);
        }
      });
      this.props.form.setFieldsValue({
        "01.005": balance
      });
      this.setState({
        sumSectionThree: sum
      });
    }
  };

  sectionFourHandler = name => value => {
    if (value) {
      let sum = this.state.sumSectionFour;
      sum[name] = value;
      let rate = 0;
      if (sum["01.007"] && sum["01.006"]) {
        rate = parseFloat(sum["01.007"]) * parseFloat(sum["01.006"]);
      }
      this.props.form.setFieldsValue({
        "01.008": rate
      });

      this.setState({
        sumSectionFour: sum
      });
    }
  };

  componentDidMount(props) {
    this.getOgd();
  }

  getOgd = e =>
    axios
      .get("http://10.202.41.203:8050/ogd/gets-all")
      .then(response => {
        this.setState({
          ogd_all: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });

  async sendPostsAsync(body) {
    try {
      // console.log(body);
      // console.log(typeof body);
      axios
        .post(this.state.url, body)
        .then(response => this.succeedForm())
        .catch(function(error) {
          console.log(error);
          message.success("Сохранено");
        });
    } catch (e) {
      this.setState({ ...this.state, isFetching: false });
    }
  }

  sendPosts = this.sendPostsAsync;

  pageSizeChange = value => {
    this.setState({
      size: value
    });
  };

  submitAuditJournal = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const data = values;

      datesList.map(item => {
        if (data[item]) {
          data[item] = values[item].format("YYYY-MM-DD");
        }
      });
      if (!err) {
        console.log(values);

        // this.formData(data);
      }
      this.formData(data);
    });
  };

  formData = data => {
    let temp = {
      taxFormCells: []
    };
    console.log("data");
    console.log(data);

    Object.entries(data).map(item => {
      if (item[1]) {
        if(item[1]==""){}
        else if (typeof item[1] == "object") {
          temp.taxFormCells = [
            ...temp.taxFormCells,
            {
              cellKey: "870.00." + item[0],
              cellValues: item[1]
            }
          ];
        } else if (parseInt(item[0]) > 0) {
          temp.taxFormCells = [
            ...temp.taxFormCells,
            {
              cellKey: "870.00." + item[0],
              cellValues: [item[1]]
            }
          ];
        } else {
          temp[item[0]] = item[1];
        }
      }
    });
    console.log(temp);

    this.sendPosts(temp);
  };

  handleReset = () => {
    this.props.form.resetFields();
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
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const authed = this.state.authedUser;
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
                      Декларация для малого бизнеса
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Row>
            <Typography.Title level={4}>
              Декларация по плате за эмиссии в окружающую среду (Форма 870.00)
            </Typography.Title>
            <p></p>
            <Alert
              message="Прочитайте правила составления налоговой отчетности «Декларация по плате за эмиссии в окружающую среду (Форма 870.00)»."
              type="warning"
              showIcon
            />
            <Form
              onSubmit={this.submitAuditJournal}
              style={{ margin: "30px 0" }}
            >
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                style={{ backgroundColor: "transparent" }}
              >
                <Collapse.Panel header={sections[1]} key="1">
                  <Row gutter={20}>
                    <Col span={6}>
                      <Form.Item label="ИИН налогоплательщика">
                        {getFieldDecorator("taxPayerXin", {
                          initialValue: authed.taxPayerXin
                        })(<Input readOnly style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="БИН налогоплательщика">
                        {getFieldDecorator(
                          "taxPayerBin",
                          {}
                        )(<Input style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Период, за который предоставляется налоговая отчетность (год)">
                        {getFieldDecorator("year", {
                          rules: [
                            {
                              required: true,
                              message: "Please select your country!"
                            }
                          ]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите Год"
                            allowClear
                          >
                            {years().map(item => (
                              <Option value={item}>{item}</Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Период, за который предоставляется налоговая отчетность (квартал)">
                        {getFieldDecorator("quarter", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите квартал"
                          >
                            <Option key={1} value={1}>
                              Первый квартал
                            </Option>
                            <Option key={2} value={2}>
                              Второй квартал
                            </Option>
                            <Option key={3} value={3}>
                              Третий квартал
                            </Option>
                            <Option key={4} value={4}>
                              Четвертый квартал
                            </Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    {/* <Col span={18}>
                      <Form.Item label="Наименование налогоплательщика">
                        {getFieldDecorator("taxPayerName", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Input
                            placeholder="Введите данные"
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>
                    </Col> */}
                    <Col span={12}>
                      <Form.Item label="Наименование налогоплательщика">
                        {getFieldDecorator("taxPayerName", {
                          initialValue: `${authed.name} ${authed.lastname} ${authed.patronymic}`
                        })(<Input readOnly style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col span={6}>
                      <Form.Item label="Вид декларации">
                        {getFieldDecorator("formType", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите вид"
                            optionFilterProp="children"
                            allowClear
                            showSearch
                          >
                            {Object.entries(formType)
                              .sort(([a], [b]) => a - b)
                              .map(([key, value]) => (
                                <Option value={parseInt(key, 10)} name={key}>
                                  {value}
                                </Option>
                              ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Номер уведомления">
                        {getFieldDecorator(
                          "notificationNumber",
                          {}
                        )(
                          <Input
                            type="number"
                            style={{ width: "100%" }}
                            placeholder="Введите Номер"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Дата уведомления">
                        {getFieldDecorator(
                          "notificationDate",
                          {}
                        )(
                          <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            style={{
                              width: "100%"
                            }}
                            placeholder="Период с"
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item label="Отдельные категории налогоплательщика">
                      {getFieldDecorator("customTaxPayerCategory", {
                        rules: [{ required: true, message: "Введите данные" }]
                      })(
                        <Radio.Group>
                          {Object.entries(customTaxPayerCategory)
                            .sort(([a], [b]) => a - b)
                            .map(([key, value]) => (
                              <Radio
                                value={parseInt(key, 10)}
                                style={radioStyle}
                              >
                                {value}
                              </Radio>
                            ))}
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Row>
                  <Row gutter={20}>
                    <Col span={6}>
                      <Form.Item label="Код валюты">
                        {getFieldDecorator("currencyCode", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите Код"
                            allowClear
                          >
                            {Object.entries(currencyCode)
                              .sort(([a], [b]) => a - b)
                              .map(([key, value]) => (
                                <Option value={parseInt(key, 10)} name={key}>
                                  {value}
                                </Option>
                              ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    {/* <Col span={6}>
                      <Form.Item label="Количество приложений">
                        {getFieldDecorator("appCount", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите количество"
                          >
                            <Option value={true} key={true}>
                              0
                            </Option>
                            <Option value={false} key={false}>
                              1
                            </Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <Row gutter={20}>
                    <Col span={6} style={{ display: "none" }}>
                      <Form.Item label="Источник">
                        {getFieldDecorator("submissiontype", {
                          initialValue: "4",
                          rules: [{ required: true, message: "Введите данные" }]
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                    <Col span={6} style={{ display: "none" }}>
                      <Form.Item label="Форма">
                        {getFieldDecorator("formCode", {
                          initialValue: "870.00"
                        })(<Input readOnly style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Collapse.Panel>
                <Collapse.Panel header={sections[7]} key="7">
                  <Row gutter={20}>
                    {sectionTwo.map(item =>
                      Object.entries(item).map(([key, value]) => {
                        return (
                          <Col span={8}>
                            <Form.Item
                              label={<Tooltip title={value}>{value}</Tooltip>}
                            >
                              {getFieldDecorator(key, {
                                rules: [
                                  {
                                    required: true,
                                    message: "Введите данные"
                                  }
                                ]
                              })(
                                <InputNumber
                                  type="number"
                                  placeholder="Введите число"
                                  style={{ width: "100%" }}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        );
                      })
                    )}
                  </Row>
                </Collapse.Panel>
                <Collapse.Panel header={sections[6]} key="6">
                  <Row gutter={20}>
                    <Col span={6}>
                      <Form.Item label="ФИО налогового руководителя">
                        {getFieldDecorator("signingTaxPayerName", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите ФИО"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Дата подачи декларации">
                        {getFieldDecorator("sendDate", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            style={{
                              width: "100%"
                            }}
                            placeholder="Выберите дату"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Код ОГД">
                        {getFieldDecorator("taxOrgCode", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите ОГД"
                            allowClear
                            optionFilterProp="children"
                            showSearch
                          >
                            {this.state.ogd_all
                              ? this.state.ogd_all.map(item => (
                                  <Option value={item.code}>
                                    {item.code}, {item.name}
                                  </Option>
                                ))
                              : ""}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    {/* <Col span={6}>
                      <Form.Item label="Код ОГД по месту жительства">
                        {getFieldDecorator("residenceTaxOrgCode", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите ОГД"
                            allowClear
                            optionFilterProp="children"
                            showSearch
                          >
                            {this.state.ogd_all
                              ? this.state.ogd_all.map(item => (
                                  <Option value={item.code}>
                                    {item.code}, {item.name}
                                  </Option>
                                ))
                              : ""}
                          </Select>
                        )}
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <Row gutter={20}>
                    <Col span={6}>
                      <Form.Item label="Входящий номер документа">
                        {getFieldDecorator("incomingDocumentNumber", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите Номер"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="ФИО должностного лица">
                        {getFieldDecorator("signingOfficerName", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите ФИО"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6} style={{ display: "none" }}>
                      <Form.Item label="Источник">
                        {getFieldDecorator("sourceSystem", {
                          initialValue: "1",
                          rules: [{ required: true, message: "Введите данные" }]
                        })(<Input />)}
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label="Дата почтового штемпеля">
                        {getFieldDecorator("postalStampDate", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            style={{
                              width: "100%"
                            }}
                            placeholder="Период с"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Дата приема декларации">
                        {getFieldDecorator("receiveDate", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            style={{
                              width: "100%"
                            }}
                            placeholder="Период с"
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
              <p></p>
              <Typography.Title level={4}>
                Плата за эмиссию в окружающую среду (Приложение к декларации)
              </Typography.Title>

              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                style={{ backgroundColor: "transparent" }}
              >
                <Collapse.Panel header={sections[1]} key="0">
                  <Row gutter={20}>
                    {/* <Col span={6}>
                      <Form.Item label="ИИН налогоплательщика">
                        {getFieldDecorator("taxPayerXin", {
                          initialValue: authed.taxPayerXin
                        })(<Input readOnly style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col> */}
                    <Col span={6}>
                      <Form.Item label="БИН налогоплательщика">
                        {getFieldDecorator(
                          "taxPayerBin",
                          {}
                        )(<Input style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col>
                    {/* <Col span={6}>
                      <Form.Item label="Фамилия налогоплательщика">
                        <Input
                          readOnly
                          value={authed.lastname}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Отчество налогоплательщика">
                        <Input
                          readOnly
                          value={authed.patronymic}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col> */}
                    {/* <Col span={6}>
                      <Form.Item
                        label={
                          <Tooltip title="Период, за который предоставляется налоговая отчетность (год)">
                            Период, за который предоставляется налоговая
                            отчетность (год)
                          </Tooltip>
                        }
                      >
                        {getFieldDecorator("year", {
                          rules: [
                            {
                              required: true,
                              message: "Please select your country!"
                            }
                          ]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите Год"
                            allowClear
                          >
                            {years().map(item => (
                              <Option value={item}>{item}</Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label={
                          <Tooltip title="Период, за который предоставляется налоговая отчетность (квартал)">
                            Период, за который предоставляется налоговая
                            отчетность (квартал)
                          </Tooltip>
                        }
                      >
                        {getFieldDecorator("quarter", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите квартал"
                          >
                            <Option key={1} value={1}>
                              Первое квартал
                            </Option>
                            <Option key={2} value={2}>
                              Второй квартал
                            </Option>
                            <Option key={3} value={3}>
                              Третий квартал
                            </Option>
                            <Option key={4} value={4}>
                              Четвертый квартал
                            </Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <Row gutter={20}>
                    <Col span={6}>
                      <Form.Item label="№ Разрешения">
                        {getFieldDecorator(
                          "permitNumber",
                          {}
                        )(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите данные"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Дата выдачи">
                        {getFieldDecorator(
                          "permitIssueDate",
                          {}
                        )(
                          <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            style={{
                              width: "100%"
                            }}
                            placeholder="Выберите дату"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Категория объектов">
                        {getFieldDecorator(
                          "permitObjectCategory",
                          {}
                        )(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите данные"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label={
                          <Tooltip title="Срок действия с">
                            Срок действия с
                          </Tooltip>
                        }
                      >
                        {getFieldDecorator(
                          "permitValidityStartDate",
                          {}
                        )(
                          <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            style={{
                              width: "100%"
                            }}
                            placeholder="Выберите дату"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label={
                          <Tooltip title="Срок действия по">
                            Срок действия по
                          </Tooltip>
                        }
                      >
                        {getFieldDecorator(
                          "permitValidityEndDate",
                          {}
                        )(
                          <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                            style={{
                              width: "100%"
                            }}
                            placeholder="Выберите дату"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Вид специального природопользования">
                        {getFieldDecorator("environmentalManagementType", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите вид"
                            optionFilterProp="children"
                            allowClear
                            showSearch
                          >
                            {Object.entries(environmentalManagementType)
                              .sort(([a], [b]) => a - b)
                              .map(([key, value]) => (
                                <Option value={parseInt(key, 10)} name={key}>
                                  {value}
                                </Option>
                              ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Row gutter={20}>
                    <Col span={24}>
                      <Button style={{ width: "100%", textAlign: "center" }}>
                        Вид загрязняющего вещества (указать номер подпункта
                        соответствующего пункта статьи 576 Налогового кодекса)
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Пункт">
                        {getFieldDecorator(
                          "pollutantTypeItem",
                          {}
                        )(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите данные"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Подпункт">
                        {getFieldDecorator(
                          "pollutantTypeSubItem",
                          {}
                        )(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите данные"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Код опасных отходов согласно классификатору отходов">
                        {getFieldDecorator(
                          "pollutantTypeCode",
                          {}
                        )(
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Введите данные"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Единицы измерения природопользования">
                        {getFieldDecorator(
                          "environmentalUnit",
                          {}
                        )(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите"
                            optionFilterProp="children"
                            allowClear
                            showSearch
                          >
                            {Object.entries(environmentalUnit)
                              .sort(([a], [b]) => a - b)
                              .map(([key, value]) => (
                                <Option value={parseInt(key, 10)} name={key}>
                                  {value}
                                </Option>
                              ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Collapse.Panel>
                <Collapse.Panel header={sections[8]} key="8">
                  <Row gutter={20}>
                    {sectionThree.map(item =>
                      Object.entries(item).map(([key, value]) => (
                        <Col span={6}>
                          <Form.Item
                            label={<Tooltip title={value}>{value}</Tooltip>}
                          >
                            {getFieldDecorator(key, {
                              rules: [
                                {
                                  required: true,
                                  message: "Введите данные"
                                }
                              ]
                            })(
                              key == "01.005" ? (
                                <InputNumber
                                  readOnly
                                  type="number"
                                  placeholder="Введите число"
                                  style={{ width: "100%" }}
                                />
                              ) : (
                                <InputNumber
                                  onChange={this.sectionThreeHandler(key)}
                                  type="number"
                                  placeholder="Введите число"
                                  style={{ width: "100%" }}
                                />
                              )
                            )}
                          </Form.Item>
                        </Col>
                      ))
                    )}
                  </Row>
                </Collapse.Panel>
                <Collapse.Panel header={sections[9]} key="9">
                  <Row gutter={20}>
                    {sectionFour.map(item =>
                      Object.entries(item).map(([key, value]) => (
                        <Col span={6}>
                          <Form.Item
                            label={<Tooltip title={value}>{value}</Tooltip>}
                          >
                            {getFieldDecorator(key, {
                              rules: [
                                { required: true, message: "Введите данные" }
                              ]
                            })(
                              key == "01.008" ? (
                                <InputNumber
                                  readOnly
                                  setFieldsValue="1"
                                  type="number"
                                  placeholder="Введите число"
                                  style={{ width: "100%" }}
                                />
                              ) : (
                                <InputNumber
                                  onChange={this.sectionFourHandler(key)}
                                  type="number"
                                  placeholder="Введите число"
                                  style={{ width: "100%" }}
                                />
                              )
                            )}
                          </Form.Item>
                        </Col>
                      ))
                    )}
                    <Col span={6}>
                      <Form.Item label="Коэффициенты, применяемые к плательщикам платы согласно п. 2 ст. 577 Налогового кодекса">
                        {getFieldDecorator(
                          "coefficient",
                          {}
                        )(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите вид"
                            optionFilterProp="children"
                            allowClear
                            showSearch
                          >
                            {Object.entries(coefficients)
                              .sort(([a], [b]) => a - b)
                              .map(([key, value]) => (
                                <Option value={parseInt(key, 10)} name={key}>
                                  {value}
                                </Option>
                              ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label={<Tooltip title={longTitle}>{longTitle}</Tooltip>}
                      >
                        {getFieldDecorator(
                          "feeRate",
                          {}
                        )(
                          <InputNumber
                            readOnly
                            type="number"
                            placeholder="Введите число"
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
              <Row type="flex" style={{ marginTop: 30 }}>
                <Button
                  type="danger"
                  onClick={this.handleReset}
                  className="mr-auto"
                >
                  Очистить
                </Button>
                <Button type="primary" htmlType="submit">
                  Отправить
                </Button>
              </Row>
              <Row type="flex" style={{ marginTop: 20 }}>
                <Button type="default" style={{ marginRight: 10 }}>
                  Сохранить в КНП
                </Button>
                <Button type="default" style={{ marginRight: 10 }}>
                  Проверить заполнение
                </Button>
                <Button type="default" style={{ marginRight: 10 }}>
                  Отправить в ОГД
                </Button>
                <Button type="default" style={{ marginRight: 10 }}>
                  Печать
                </Button>
              </Row>
            </Form>
          </Row>
        </Content>
      </>
    );
  }
}
const DeclarationWrapper = Form.create({ name: "fno_form" })(Declaration);

export default DeclarationWrapper;
