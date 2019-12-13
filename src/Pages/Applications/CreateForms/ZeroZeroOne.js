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
  Layout
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const taxArticleId = [213, 214];

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

const title = "";
class ZeroZeroOne extends Component {
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
      url: `http://10.202.41.203:9020/tax-report/form-apps/suspension?userXin=560319301503`
    };
  }

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
        })
        .catch(function(error) {
          console.log(error);
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
              <Col span={24}>
                <Form.Item label="В соответствии со статьей (укажите в соответствующей ячейке) 213 или 214 Кодекса Республики Казахстан">
                  {getFieldDecorator("taxArticleId", {
                    rules: [
                      {
                        required: true,
                        message: "Введите данные"
                      }
                    ]
                  })(
                    <Radio.Group>
                      {taxArticleId.map(item => (
                        <Radio value={item}>{item}</Radio>
                      ))}
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} type="flex" style={{ alignItems: "center" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "center" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      A
                    </Button>
                    <div>Приостановить представление налоговой отчетности</div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "suspensionStartDate",
                    {}
                  )(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Дата с"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "suspensionEndDate",
                    {}
                  )(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Дата по"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} type="flex" style={{ alignItems: "center" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "center" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      B
                    </Button>
                    <div>
                      Продлить срок приостановления представления налоговой
                      отчетности
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "suspensionContStartDate",
                    {}
                  )(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Дата с"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "suspensionContEndDate",
                    {}
                  )(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Дата по"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} type="flex" style={{ alignItems: "center" }}>
              <Col span={12}>
                <Form.Item>
                  <Row type="flex" style={{ alignItems: "center" }}>
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ marginRight: 20 }}
                    >
                      C
                    </Button>
                    <div>Возобновить представление налоговой отчетности</div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(
                    "recommencementDate",
                    {}
                  )(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Дата с"
                    />
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
                    <Input disabled placeholder="Номер документа" />
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
                  {getFieldDecorator("receiveDate")(
                    <DatePicker style={{ width: "100%" }} disabled />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Дата почтового штемпеля">
                  {getFieldDecorator("postalStampDate")(
                    <DatePicker style={{ width: "100%" }} disabled />
                  )}
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

const ZeroZeroOneWrapper = Form.create({ name: "fno_form" })(ZeroZeroOne);

export default ZeroZeroOneWrapper;
