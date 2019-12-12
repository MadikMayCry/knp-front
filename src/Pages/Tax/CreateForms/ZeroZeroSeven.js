import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import CabinetHeader from "Layout/CabinetHeader";
import fno_list from "fno_list.json";
import monthList from "month_list.json";
import {
  Row,
  Col,
  DatePicker,
  Form,
  Button,
  Collapse,
  Typography,
  Checkbox,
  Tooltip,
  Input,
  Select,
  message,
  Icon,
  InputNumber,
  Alert,
  Radio,
  Divider,
  Breadcrumb,
  Layout
} from "antd";

const title = "Журнал ФО";

const { Content } = Layout;
const { Option } = Select;

const revocationReason = {
  1: "ликвидационной налоговой отчетности в случае принятия налогоплательщиком решения о возобновлении деятельности до начала проведения налоговой проверки",
  2: "представленной с нарушением условий пункта 2 статьи 208 и пункта 5 статьи 211 Налогового кодекса",
  3: "представленной при отсутствии обязательства по представлению такой налоговой отчетности",
  4: "которая считается непредставленной в соответствии с пунктом 5 статьи 209 Налогового кодекса",
  5: `представленной после истечения срока исковой давности, за исключением налоговой отчетности по 
  уведомлениям об устранении нарушений, выявленных налоговым органом по результатам камерального контроля`
};

const revocationReasonDetail = {
  1: "налоговые формы не соответствуют установленным уполномоченным органом формам",
  2: "в налоговой форме не указан код налогового органа",
  3: "в налоговой форме не указан или неверно указан идентификационный номер налогоплательщика (налогового агента)",
  4: "в налоговой форме не указан налоговый период",
  5: "в налоговой форме не указан вид налоговой отчетности",
  6: "налоговая отчетность не подписана и (или) не заверена печатью со своим наименованием",
  7: `налоговая отчетность имеет статус обработки "Отказ в обработке" при непрохождении в системе приема и обработки налоговой отчетности форматно-логического контроля`,
  8: "нарушены требования пункта 1 статьи 212 Налогового кодекса относительно способа представления налоговой отчетности в случае продления срока представления налоговой отчетности",
  9: "одновременно с декларацией по налогу на добавленную стоимость не представлены реестры счетов-фактур по приобретенным и реализованным в течение налогового периода товарам, работам, услугам - в случае получения или выписывания счетов-фактур на бумажном носителе",
  10: "налоговая отчетность по налогу на добавленную стоимость представлена не в явочном порядке после снятия с регистрационного учета по указанному налогу по решению налогового органа"
};

const formType = {
  1: "Первоначальная",
  2: "Очередная",
  3: "Дополнительная",
  4: "Дополнительная по уведомлению",
  5: "Ликвидационная"
};

const currencyCode = {
  1: "KZT",
  2: "RUB"
};

const datesList = [
  "postalStampDate",
  "receiveDate",
  "recommencementDate",
  "sendDate",
  "suspensionContEndDate",
  "suspensionContStartDate",
  "suspensionEndDate",
  "suspensionStartDate"
];

const halfYearData = {
  1: "Первое полугодие",
  2: "Второе полугодие"
};

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

class ZeroZeroSeven extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: {
        taxPayerXin: "591207400104",
        name: "ШОЛПАН",
        lastname: "ЖОЛДАСБЕКОВА",
        patronymic: "КАПАЛОВНА"
      },
      ogd_all: undefined,
      reqbody: {},
      isFetching: false,
      data: [],
      url: `http://10.202.41.203:9020/tax-report/form-apps/revocation?userXin=781227450219`
    };
  }

  isLiquidationToRegular() {}

  optionFieldsJson = item => {
    return item.map(item => {
      return (
        <Option value={item.code}>
          {item.code}, {item.Title}
        </Option>
      );
    });
  };

  componentDidMount() {
    this.getOgd();
  }

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
        this.formData(data);
      }
    });
  };

  formData = data => {
    this.sendPosts(data);
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

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
      axios
        .post(this.state.url, body)
        .then(function(response) {
          console.log(response);
          message.success("Успешно");
        })
        .catch(function(error) {
          console.log(error);
          message.error("Неудачно");
        });
    } catch (e) {
      this.setState({ ...this.state, isFetching: false });
    }
  }

  sendPosts = this.sendPostsAsync;

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const authed = this.state.authedUser;
    const { halfYears } = this.state;
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
          <Form onSubmit={this.submitAuditJournal} style={{ margin: "30px 0" }}>
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

              <Col span={6}>
                <Form.Item label="Код налоговой отчетности">
                  {getFieldDecorator("formCode")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите ФНО"
                      optionFilterProp="children"
                      allowClear
                      showSearch
                    >
                      {this.optionFieldsJson(fno_list)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Вид налоговой отчетности">
                  {getFieldDecorator("formType", {
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
            </Row>
            <Row gutter={20}>
              <Col span={8}>
                <Form.Item label="Регистрационный номер">
                  {getFieldDecorator("formRegistrationNumber", {
                    rules: [
                      {
                        required: true,
                        message: "Введите данные"
                      }
                    ]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="Введите номер"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Год">
                  {getFieldDecorator("formYear")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите Год"
                      allowClear
                    >
                      {years().map(item => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Полугодие">
                  {getFieldDecorator("formHalfYear")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите Полугодие"
                    >
                      {Object.entries(halfYearData).map(([key, item]) => (
                        <Option value={key}>{item}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="Квартал">
                  {/* {getFieldDecorator("quarter")( */}
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Выберите Квартал"
                    allowClear
                  >
                    <Option value={1}>Первый квартал</Option>
                    <Option value={2}>Второй квартал</Option>
                    <Option value={3}>Третий квартал</Option>
                    <Option value={4}>Четвертый квартал</Option>
                  </Select>
                  {/* )} */}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Месяц">
                  {/* {getFieldDecorator("month")( */}
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Выберите месяц"
                    name="month"
                    showSearch
                    allowClear
                  >
                    {Object.entries(monthList)
                      .sort(([a], [b]) => a - b)
                      .map(([key, value]) => (
                        <Option value={key} name={key}>
                          {value}
                        </Option>
                      ))}
                  </Select>
                  {/* )} */}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item
                label="Укажите причину отзыва налоговой отчетности"
                className="revocReason"
              >
                {getFieldDecorator("revocationReason", {
                  rules: [
                    {
                      required: true,
                      message: "Введите данные"
                    }
                  ]
                })(
                  <Radio.Group>
                    {Object.entries(revocationReason).map(([key, value]) => (
                      <Radio value={key}>{value}</Radio>
                    ))}
                  </Radio.Group>
                )}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="Если в строке 4 отмечено «D», то отметьте в соответствующей ячейке причину"
                className="revocReason"
              >
                {getFieldDecorator(
                  "revocationReasonDetail",
                  {}
                )(
                  <Radio.Group>
                    {Object.entries(revocationReasonDetail).map(
                      ([key, value]) => (
                        <Radio value={key}>{value}</Radio>
                      )
                    )}
                  </Radio.Group>
                )}
              </Form.Item>
            </Row>
            <Row gutter={20} type="flex" style={{ alignItems: "top" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "top" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      A
                    </Button>
                    <div>Не указан или неверно указан код валюты</div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Прежнее содержание">
                  {getFieldDecorator(
                    "oldCurrencyCode",
                    {}
                  )(
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
              <Col span={6}>
                <Form.Item label="Новое содержание">
                  {getFieldDecorator(
                    "newCurrencyCode",
                    {}
                  )(
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
            </Row>
            <Row
              gutter={20}
              type="flex"
              style={{
                alignItems: "top",
                display: "flex",
                flexWrap: "nowrap"
              }}
            >
              <Col span={12}>
                <Form.Item>
                  <Row
                    type="flex"
                    style={{
                      display: "flex",
                      flexWrap: "nowrap"
                    }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      B
                    </Button>
                    <div className="desc-form">
                      не указаны или неверно указаны номер и (или) дата
                      контракта на недропользование:
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "oldContractDate",
                    {}
                  )(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Дата "
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator(
                    "oldContractNumber",
                    {}
                  )(<Input placeholder="Номер" style={{ width: "100%" }} />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "newContractDate",
                    {}
                  )(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Дата "
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator(
                    "newContractNumber",
                    {}
                  )(<Input placeholder="Номер" style={{ width: "100%" }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} type="flex" style={{ alignItems: "top" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "top" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      C
                    </Button>
                    <div className="desc-form">
                      не указан или неверно указан статус резидентства:
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "oldIsResident",
                    {}
                  )(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите признак"
                    >
                      <Option value={true}>
                        резидент Республики Казахстан
                      </Option>
                      <Option value={false}>
                        нерезидент Республики Казахстан
                      </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "newIsResident",
                    {}
                  )(
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
            <Row gutter={20} type="flex" style={{ alignItems: "top" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "top" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      D
                    </Button>
                    <div className="desc-form">
                      неверно указан код налогового органа
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "oldTaxOrgCode",
                    {}
                  )(
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
                <Form.Item>
                  {getFieldDecorator(
                    "newTaxOrgCode",
                    {}
                  )(
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
            <Row gutter={20} type="flex" style={{ alignItems: "top" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "top" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      E
                    </Button>
                    <div className="desc-form">
                      неверно указан код налогового органа*
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "oldResidenceTaxOrgCode",
                    {}
                  )(
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
                <Form.Item>
                  {getFieldDecorator(
                    "newResidenceTaxOrgCode",
                    {}
                  )(
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
            <Row gutter={20} type="flex" style={{ alignItems: "top" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "top" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      F
                    </Button>
                    <div className="desc-form">
                      неверно указан налоговый период
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("oldYear", {
                    rules: [{ required: true, message: "Введите данные" }]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите Год"
                      allowClear
                    >
                      {years().map(item => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("oldHalfYear")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите Полугодие"
                    >
                      {Object.entries(halfYearData).map(([key, item]) => (
                        <Option value={key}>{item}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  {/* {getFieldDecorator("quarter")( */}
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Выберите Квартал"
                    allowClear
                  >
                    <Option value={1}>Первый квартал</Option>
                    <Option value={2}>Второй квартал</Option>
                    <Option value={3}>Третий квартал</Option>
                    <Option value={4}>Четвертый квартал</Option>
                  </Select>
                  {/* )} */}
                </Form.Item>
                <Form.Item>
                  {/* {getFieldDecorator("month")( */}
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Выберите месяц"
                    name="month"
                    showSearch
                    allowClear
                  >
                    {Object.entries(monthList)
                      .sort(([a], [b]) => a - b)
                      .map(([key, value]) => (
                        <Option value={key} name={key}>
                          {value}
                        </Option>
                      ))}
                  </Select>
                  {/* )} */}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("newYear")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите Год"
                      allowClear
                    >
                      {years().map(item => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("newHalfYear")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите Полугодие"
                    >
                      {Object.entries(halfYearData).map(([key, item]) => (
                        <Option value={key}>{item}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  {/* {getFieldDecorator("quarter")( */}
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Выберите Квартал"
                    allowClear
                  >
                    <Option value={1}>Первый квартал</Option>
                    <Option value={2}>Второй квартал</Option>
                    <Option value={3}>Третий квартал</Option>
                    <Option value={4}>Четвертый квартал</Option>
                  </Select>
                  {/* )} */}
                </Form.Item>
                <Form.Item>
                  {/* {getFieldDecorator("month")( */}
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Выберите месяц"
                    name="month"
                    showSearch
                    allowClear
                  >
                    {Object.entries(monthList)
                      .sort(([a], [b]) => a - b)
                      .map(([key, value]) => (
                        <Option value={key} name={key}>
                          {value}
                        </Option>
                      ))}
                  </Select>
                  {/* )} */}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} type="flex" style={{ alignItems: "top" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "top" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      G
                    </Button>
                    <div className="desc-form">
                      неверно указан вид налоговой отчетности
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "oldFormType",
                    {}
                  )(
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
                <Form.Item>
                  {getFieldDecorator(
                    "newFormType",
                    {}
                  )(
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
            </Row>
            <Row gutter={20} type="flex" style={{ alignItems: "top" }}>
              <Col span={18}>
                <Form.Item>
                  <Row
                    type="flex"
                    style={{ display: "flex", flexWrap: "nowrap" }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      H
                    </Button>
                    <div className="desc-form">
                      отзыв ликвидационной налоговой отчетности в случае
                      принятия налогоплательщиком решения о возобновлении
                      деятельности после проведения налоговой проверки или
                      завершения камерального контроля
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("isLiquidationToRegular", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox></Checkbox>)}
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
              <Col span={6} style={{ display: "none" }}>
                <Form.Item label="Полное ФИО">
                  {getFieldDecorator("taxPayerName", {
                    initialValue: `${authed.name} ${authed.lastname} ${authed.patronymic}`
                  })(<Input readOnly style={{ width: "100%" }} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ФИО руководителя (налогоплательщика, налогового агента) уполномоченного представителя налогоплательщика">
                  {getFieldDecorator("signingTaxPayerName")(
                    <Input placeholder="Введите ФИО" />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Входящий номер документа">
                  {getFieldDecorator("incomingDocumentNumber")(
                    <Input placeholder="Номер документа" />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Код Огд">
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
            </Row>
            <Row type="flex" gutter={20}>
              <Col span={6}>
                <Form.Item label="Полное ФИО должностного лица, принявшего заявление">
                  {getFieldDecorator(
                    "signingOfficerName",
                    {}
                  )(
                    <Input
                      placeholder="Полное ФИО должностного лица"
                      disabled
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Дата подачи налогового заявления">
                  {getFieldDecorator("sendDate", {
                    initialValue: moment()
                  })(<DatePicker style={{ width: "100%" }} disabled />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Дата приема налогового заявления">
                  {getFieldDecorator("receiveDate", {
                    initialValue: moment()
                  })(<DatePicker style={{ width: "100%" }} disabled />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Дата почтового штемпеля">
                  {getFieldDecorator(
                    "postalStampDate",
                    {}
                  )(<DatePicker style={{ width: "100%" }} disabled />)}
                </Form.Item>
              </Col>
            </Row>
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
          </Form>
        </Content>
      </>
    );
  }
}

const ZeroZeroSevenWrapper = Form.create({ name: "fno_form" })(ZeroZeroSeven);

export default ZeroZeroSevenWrapper;
