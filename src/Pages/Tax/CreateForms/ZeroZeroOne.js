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

const title = "Журнал ФНО";
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
      url: `http://10.202.41.203:9020/tax-report/tax-forms?userXin=591207400104`
    };
  }

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
              <Col span={6}>
                <Form.Item
                  label={
                    <Tooltip
                      title="В соответствии со статьей (укажите в соответствующей
                      ячейке) 213 или 214 Кодекса Республики Казахстан"
                    >
                      В соответствии со статьей (укажите в соответствующей
                      ячейке) 213 или 214 Кодекса Республики Казахстан
                    </Tooltip>
                  }
                >
                  {getFieldDecorator("taxPayerType")(
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
                  {getFieldDecorator("sendDate", {
                    rules: [{ required: true, message: "Введите данные" }]
                  })(
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
                  {getFieldDecorator("sendDate", {
                    rules: [{ required: true, message: "Введите данные" }]
                  })(
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
                  {getFieldDecorator("sendDate", {
                    rules: [{ required: true, message: "Введите данные" }]
                  })(
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
                  {getFieldDecorator("sendDate", {
                    rules: [{ required: true, message: "Введите данные" }]
                  })(
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
                    <div>
                      Продлить срок приостановления представления налоговой
                      отчетности
                    </div>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("sendDate", {
                    rules: [{ required: true, message: "Введите данные" }]
                  })(
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
          </Form>
        </Content>
      </>
    );
  }
}

const ZeroZeroOneWrapper = Form.create({ name: "fno_form" })(ZeroZeroOne);

export default ZeroZeroOneWrapper;
