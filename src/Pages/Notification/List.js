import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Table from "./Table";
import CabinetHeader from "Layout/CabinetHeader";
import {
  Row,
  Input,
  Col,
  DatePicker,
  Form,
  Button,
  Select,
  Icon,
  Alert,
  Breadcrumb,
  Layout
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const notificationTypeList = {
  1: "Уведомление о принятии/не принятии формы налоговой отчетности",
  2: "Уведомление о принятии/не принятии налогового заявления на приостановление",
  3: "Уведомление о принятии/не принятии налогового заявления на отзыв"
};

const title = "";

const halfYearData = ["Первое полугодие", "Второе полугодие"];

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

const datesList = [
  "acceptanceEndDate",
  "acceptanceStartDate",
  "notificationEndDate",
  "notificationStartDate",
  "notificationType",
  "receiveEndDate",
  "receiveStartDate"
];

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

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: {
        taxPayerXin: "560319301503",
        name: "Муратали",
        lastname: "Бердибаев",
        patronymic: "Есаналиевич"
      },
      isFetching: false,
      data: [],
      halfYears: quarterData[halfYearData[0]],
      quarter: quarterData[halfYearData[0]][0],
      url: `http://10.202.41.203:9020/tax-report/notifications?size=50&userXin=560319301503`
    };
  }

  async fetchPostsAsync(url) {
    try {
      this.setState({ ...this.state, isFetching: true });
      const response = await axios.get(url);

      this.setState({
        ...this.state,
        isFetching: false,
        data: response.data.content
      }); // Take first 5 posts only
    } catch (e) {
      this.setState({ ...this.state, isFetching: false });
    }
  }

  fetchPosts = this.fetchPostsAsync;

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
        this.formData(data);
      }
    });
  };

  formData = data => {
    let temp = this.state.url;
    Object.entries(data).map(item => {
      if (item[1]) {
        if (item[0] === "appStatuses") {
          item[1].map(smth => {
            temp = `${temp}&${item[0]}=${smth}`;
          });
          return;
        }
        temp = `${temp}&${item[0]}=${item[1]}`;
      }
    });
    this.fetchPosts(temp);
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
                      Журнал уведомлений
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Row>
            <Form onSubmit={this.submitAuditJournal}>
              <Row gutter={20}>
                <Col span={6} style={{ display: "none" }}>
                  <Form.Item label="ИИН налогоплательщика">
                    {getFieldDecorator("taxPayerXin", {
                      initialValue: authed.taxPayerXin
                    })(<Input readOnly style={{ width: "100%" }} />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Номер уведомления">
                    {getFieldDecorator(
                      "notificationNumber",
                      {}
                    )(<Input style={{ width: "100%" }} />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Дата поступления с">
                    {getFieldDecorator("acceptanceStartDate")(
                      <DatePicker
                        format="YYYY-MM-DD"
                        showTime
                        style={{
                          width: "100%"
                        }}
                        placeholder="Выберите дату"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Дата поступления по">
                    {getFieldDecorator("sendStartDate")(
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
                  <Form.Item label="Дата уведомления с">
                    {getFieldDecorator("notificationStartDate")(
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
                  <Form.Item label="Дата уведомления по">
                    {getFieldDecorator("notificationEndDate")(
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
                  <Form.Item label="Дата ознакомления с">
                    {getFieldDecorator("receiveStartDate")(
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
                  <Form.Item label="Дата ознакомления по">
                    {getFieldDecorator("receiveEndDate")(
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
                  <Form.Item label="Наименование уведомления">
                    {getFieldDecorator("yearField")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите Год"
                        allowClear
                      >
                        {Object.entries(notificationTypeList).map(([key,value]) => (
                          <Option key={value} value={value}>
                            {value}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Количество на странице">
                    {getFieldDecorator("size")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите размер"
                        name="month"
                        showSearch
                        allowClear
                        onChange={this.pageSizeChange}
                      >
                        <Option value={10}>10</Option>
                        <Option value={20}>20</Option>
                        <Option value={50}>50</Option>
                        <Option value={100}>100</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex">
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
          </Row>
          <Row style={{ marginTop: 40 }}>
            <Table data={this.state.data} isFetching={this.state.isFetching} />
          </Row>
        </Content>
      </>
    );
  }
}
const WrapperNotification = Form.create({ name: "fno_form" })(Notification);

export default WrapperNotification;
