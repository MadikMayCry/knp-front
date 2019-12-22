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
  6: "Раздел. Ответственность налогоплательщика (налогового агента)"
};

const sectionTwo = [
  {
    "001": "Доход"
  },
  {
    "002":
      "в том числе доход от корректировки в соответствии с Законом о трансфертном ценообразовании "
  },
  {
    "003": [
      {
        "003.0": "Среднесписочная численность работников,в том числе",
        "003.1": "пенсионеры",
        "003.2": "инвалиды"
      }
    ]
  },
  {
    "004": "Среднемесячная заработная плата на одного работника"
  },
  {
    "005": "Сумма исчисленных налогов"
  },
  {
    "006":
      "Корректировка суммы налогов в соответствии с пунктом 2 статьи 687 Налогового кодекса"
  },
  {
    "007": "Сумма налогов после корректировки "
  },
  {
    "008":
      "Сумма индивидуального (корпоративного) подоходного налога, подлежащего уплате в бюджет"
  },
  {
    "009":
      "Сумма социального налога, подлежащего уплате в бюджет (очередная, первоначальная, ликвидационная)"
  }
];

const sectionThree = [
  {
    "010.0": "Доход для исчисления социальных отчислений",
    "010.1": "1 месяц",
    "010.2": "2 месяц",
    "010.3": "3 месяц",
    "010.4": "4 месяц",
    "010.5": "5 месяц",
    "010.6": "6 месяц",
    "010.7": "Итого за полугодие"
  },
  {
    "011.0": "Сумма социальных отчислений, к уплате",
    "011.1": "1 месяц",
    "011.2": "2 месяц",
    "011.3": "3 месяц",
    "011.4": "4 месяц",
    "011.5": "5 месяц",
    "011.6": "6 месяц",
    "011.7": "Итого за полугодие"
  },
  {
    "012.0": "Доход, для исчисления обязательных пенсионных взносов",
    "012.1": "1 месяц",
    "012.2": "2 месяц",
    "012.3": "3 месяц",
    "012.4": "4 месяц",
    "012.5": "5 месяц",
    "012.6": "6 месяц",
    "012.7": "Итого за полугодие"
  },
  {
    "013.0": "Сумма обязательных пенсионных взносов, к уплате",
    "013.1": "1 месяц",
    "013.2": "2 месяц",
    "013.3": "3 месяц",
    "013.4": "4 месяц",
    "013.5": "5 месяц",
    "013.6": "6 месяц",
    "013.7": "Итого за полугодие"
  },
  {
    "014.0":
      "Сумма взносов на обязательное социальное медицинское страхование, к уплате",
    "014.1": "1 месяц",
    "014.2": "2 месяц",
    "014.3": "3 месяц",
    "014.4": "4 месяц",
    "014.5": "5 месяц",
    "014.6": "6 месяц",
    "014.7": "Итого за полугодие"
  }
];

const sectionFour = [
  {
    "015.0":
      "Сумма индивидуального подоходного налога, подлежащая перечислению в бюджет с доходов граждан Республики Казахстан",
    "015.1": "1 месяц",
    "015.2": "2 месяц",
    "015.3": "3 месяц",
    "015.4": "4 месяц",
    "015.5": "5 месяц",
    "015.6": "6 месяц",
    "015.7": "Итого за полугодие"
  },
  {
    "016.0":
      "Сумма индивидуального подоходного налога, подлежащая перечислению в бюджет с доходов иностранцев и лиц без гражданства",
    "016.1": "1 месяц",
    "016.2": "2 месяц",
    "016.3": "3 месяц",
    "016.4": "4 месяц",
    "016.5": "5 месяц",
    "016.6": "6 месяц",
    "016.7": "Итого за полугодие"
  },
  {
    "017.0":
      "Доходы физических лиц, с которых исчисляются социальные отчисления",
    "017.1": "1 месяц",
    "017.2": "2 месяц",
    "017.3": "3 месяц",
    "017.4": "4 месяц",
    "017.5": "5 месяц",
    "017.6": "6 месяц",
    "017.7": "Итого за полугодие"
  },
  {
    "018.0": "Сумма социальных отчислений, к уплате",
    "018.1": "1 месяц",
    "018.2": "2 месяц",
    "018.3": "3 месяц",
    "018.4": "4 месяц",
    "018.5": "5 месяц",
    "018.6": "6 месяц",
    "018.7": "Итого за полугодие"
  },
  {
    "019.0":
      "Доходы работников, с которых удерживаются (начисляются) обязательные пенсионные взносы",
    "019.1": "1 месяц",
    "019.2": "2 месяц",
    "019.3": "3 месяц",
    "019.4": "4 месяц",
    "019.5": "5 месяц",
    "019.6": "6 месяц",
    "019.7": "Итого за полугодие"
  },
  {
    "020.0": "Сумма обязательных пенсионных взносов, у уплате",
    "020.1": "1 месяц",
    "020.2": "2 месяц",
    "020.3": "3 месяц",
    "020.4": "4 месяц",
    "020.5": "5 месяц",
    "020.6": "6 месяц",
    "020.7": "Итого за полугодие"
  },
  {
    "021.0": "Сумма обязательных пенсионных взносов, у уплате",
    "021.1": "1 месяц",
    "021.2": "2 месяц",
    "021.3": "3 месяц",
    "021.4": "4 месяц",
    "021.5": "5 месяц",
    "021.6": "6 месяц",
    "021.7": "Итого за полугодие"
  },
  {
    "022.0": "Сумма обязательных профессиональных пенсионных взносов, к уплате",
    "022.1": "1 месяц",
    "022.2": "2 месяц",
    "022.3": "3 месяц",
    "022.4": "4 месяц",
    "022.5": "5 месяц",
    "022.6": "6 месяц",
    "022.7": "Итого за полугодие"
  },
  {
    "023.0":
      "Доходы, принимаемые для исчисления взносов и отчислений на обязательное социальное медицинское страхование",
    "023.1": "1 месяц",
    "023.2": "2 месяц",
    "023.3": "3 месяц",
    "023.4": "4 месяц",
    "023.5": "5 месяц",
    "023.6": "6 месяц",
    "023.7": "Итого за полугодие"
  },
  {
    "024.0":
      "Сумма взносов и отчислений на обязательное социальное медицинское страхование, у уплате",
    "024.1": "1 месяц",
    "024.2": "2 месяц",
    "024.3": "3 месяц",
    "024.4": "4 месяц",
    "024.5": "5 месяц",
    "024.6": "6 месяц",
    "024.7": "Итого за полугодие"
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

const quarterData = {
  "Первое полугодие": ["Первый квартал", "Второй квартал"],
  "Второе полугодие": ["Третий квартал", "Четвертый квартал"]
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

const datesList = [
  "notificationDate",
  "sendDate",
  "postalStampDate",
  "receiveDate"
];

const currencyCode = {
  1: "KZT",
  2: "RUB"
};

const customTaxPayerCategory = {
  1: "Доверительный управляющий в соотвествии со статьей 40 Налогового кодекса",
  2: "Учредитель доверительного платежа управления в соотвествии со статьей 40 Налогового кодекса",
  3: "Ведет бухгалтерский учет в соотвествии с пунктом 2 статьи 2 Закона Республики Казахстан «О бухгалтерском учете и финансовой отчетности",
  4: "Не ведет бухгалтерский учет в соотвествии с пунктом 2 статьи 2 Закона Республики Казахстан «О бухгалтерском учете и финансовой отчетности"
};

class Declaration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: {
        taxPayerXin: "560319301503",
        name: "Муратали",
        lastname: "Бердибаев",
        patronymic: "Есаналиевич"
      },
      ogd_all: undefined,
      reqbody: {},
      isFetching: false,
      data: [],
      halfYears: quarterData[halfYearData[0]],
      quarter: quarterData[halfYearData[0]][0],
      url: `http://10.202.41.203:9020/tax-report/tax-forms?userXin=591207400104`
    };
  }

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
      console.log(body);
      console.log(typeof body);
      axios
        .post(this.state.url, body)
        .then(response => this.succeedForm())
        .catch(function(error) {
          console.log(error);
          message.error("Неудачно");
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

        this.formData(data);
      }
    });
  };

  formData = data => {
    let temp = {
      taxFormCells: []
    };
    console.log(data);

    Object.entries(data).map(item => {
      if (item[1]) {
        if (typeof item[1] == "object") {
          temp.taxFormCells = [
            ...temp.taxFormCells,
            {
              cellKey: "910.00." + item[0],
              cellValues: item[1]
            }
          ];
        } else if (parseInt(item[0]) > 0) {
          temp.taxFormCells = [
            ...temp.taxFormCells,
            {
              cellKey: "910.00." + item[0],
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

  // Half Year - Quarter
  handlehalfYearChange = value => {
    this.setState({
      halfYears: quarterData[value],
      quarter: quarterData[value][0]
    });
  };

  onquarterChange = value => {
    this.setState({
      quarter: value
    });
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
    const { halfYears } = this.state;
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
              Упрощенная Декларация для субъектов малого бизнеса
            </Typography.Title>
            <p></p>
            <Alert
              message="Прочитайте правила составления налоговой отчетности «Упрощенная декларация субъектов малого бизнеса»."
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
                      <Form.Item label="Фамилия налогоплательщика">
                        <Input
                          readOnly
                          value={authed.lastname}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Имя налогоплательщика">
                        <Input
                          readOnly
                          value={authed.name}
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
                    </Col>
                    <Col span={6} style={{ display: "none" }}>
                      <Form.Item label="Полное ФИО">
                        {getFieldDecorator("taxPayerName", {
                          initialValue: `${authed.name} ${authed.lastname} ${authed.patronymic}`
                        })(<Input readOnly style={{ width: "100%" }} />)}
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
                      <Form.Item label="Период, за который предоставляется налоговая отчетность (полугодие)">
                        {getFieldDecorator("halfYear", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите Полугодие"
                          >
                            <Option key={1} value={1}>
                              Первое полугодие
                            </Option>
                            <Option key={2} value={2}>
                              Второе полугодие
                            </Option>
                          </Select>
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
                    <Col span={6}>
                      <Form.Item label="Код валюты">
                        {getFieldDecorator("currencyCode", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите Код"
                            onChange={this.onquarterChange}
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
                    <Col span={6}>
                      <Form.Item label="Признак резидентсва">
                        {getFieldDecorator("isResident", {
                          rules: [{ required: true, message: "Введите данные" }]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Выберите признак"
                          >
                            <Option value={true} key={true}>
                              резидент Республики Казахстан
                            </Option>
                            <Option value={false} key={false}>
                              нерезидент Республики Казахстан
                            </Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
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
                  </Row>
                </Collapse.Panel>
                <Collapse.Panel header={sections[2]} key="2">
                  <Row gutter={20}>
                    {sectionTwo.map(item =>
                      Object.entries(item).map(([key, value]) => {
                        if (typeof value != "object") {
                          return (
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
                                  <InputNumber
                                    type="number"
                                    placeholder="Введите число"
                                    style={{ width: "100%" }}
                                  />
                                )}
                              </Form.Item>
                            </Col>
                          );
                        } else {
                          return Object.entries(...value).map(
                            ([key, value]) => (
                              <Col span={6}>
                                <Form.Item
                                  label={
                                    <Tooltip title={value}>{value}</Tooltip>
                                  }
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
                            )
                          );
                        }
                      })
                    )}
                  </Row>
                </Collapse.Panel>
                <Collapse.Panel header={sections[3]} key="3">
                  {sectionThree.map(item => (
                    <Row gutter={20}>
                      <Col span={24}>
                        <Button
                          type="primary"
                          style={{
                            margin: "10px 0 20px 0"
                          }}
                        >{`Код Строки 910.00.${Object.keys(item)[0].slice(
                          0,
                          -2
                        )}`}</Button>
                      </Col>
                      {Object.entries(item).map(([key, value]) => (
                        <Col span={6}>
                          <Form.Item
                            label={<Tooltip title={value}>{value}</Tooltip>}
                          >
                            {getFieldDecorator(key, {
                              rules: [
                                { required: true, message: "Введите данные" }
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
                      ))}
                    </Row>
                  ))}
                </Collapse.Panel>
                <Collapse.Panel header={sections[4]} key="4">
                  {sectionFour.map(item => (
                    <Row gutter={20}>
                      <Col span={24}>
                        <Button
                          type="primary"
                          style={{
                            margin: "10px 0 20px 0"
                          }}
                        >{`Код Строки 910.00.${Object.keys(item)[0].slice(
                          0,
                          -2
                        )}`}</Button>
                      </Col>
                      {Object.entries(item).map(([key, value]) => (
                        <Col span={6}>
                          <Form.Item
                            label={<Tooltip title={value}>{value}</Tooltip>}
                          >
                            {getFieldDecorator(key, {
                              rules: [
                                { required: true, message: "Введите данные" }
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
                      ))}
                    </Row>
                  ))}
                </Collapse.Panel>
                <Collapse.Panel header={sections[5]} key="5">
                  <Row gutter={20}>
                    <Col span={6}>
                      <Form.Item
                        label={
                          <Tooltip title="БИН аппарата акимов городов районного значения, сел, поселков и сельских округов">
                            БИН аппарата акимов городов районного значения, сел,
                            поселков и сельских округов
                          </Tooltip>
                        }
                      >
                        {getFieldDecorator("025", {
                          rules: [
                            {
                              required: true,
                              message: "Введите данные"
                            }
                          ]
                        })(
                          <InputNumber
                            type="number"
                            placeholder="Введите номер"
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>
                    </Col>
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
                    <Col span={6}>
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
                    </Col>
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
