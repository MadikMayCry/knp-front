import React, { Component } from "react";
import {
  Row,
  Col,
  DatePicker,
  Button,
  Form,
  Icon,
  Alert,
  Modal,
  Descriptions,
  Select,
  Breadcrumb,
  Layout,
  Input
} from "antd";
import CabinetHeader from "Layout/CabinetHeader";

import TableTaxMpo from "./TableTaxMpo";

import axios from "axios";

const { Content } = Layout;
const { Option } = Select;

const title = "Журнал Налоговых заявлений";

const datesList = [
  "receiveEndDate",
  "receiveStartDate",
  "sendEndDate",
  "sendStartDate"
];

const russianTitle = {
  taxPayerXin: "ИИН Налогоплательщика",
  taxPayerName: "ФИО",
  // formCode: "QWE", код нал отчетности
  // formType: "QWE",
  // formHalfYear: "QWE", //полугодие формы
  // formYear: "QWE", // год формы
  // formRegistrationNumber: "QWE", // д поле
  // revocationReason: "QWE", // 4
  // revocationReasonDetail: "QWE", // 5
  // oldCurrencyCode: "QWE",// 6 Старый код валюты
  // newCurrencyCode: "QWE", //
  // oldIsResident: "QWE", // старый резидент
  // oldTaxOrgCode: "QWE", // старый огд
  // oldResidenceTaxOrgCode: "QWE", // Е
  // oldHalfYear: "QWE", // полугодие старое
  // oldYear: "QWE", // старый год
  // oldFormType: "QWE", // вид формы прежнее ззначение
  // isLiquidationToRegular: "QWE", // H
  // sendDate: "QWE", // Дата подачи
  // incomingDocumentNumber: "QWE", // Вход ном документа
  // taxOrgCode: "QWE", // код ОГД
  // receiveDate: "QWE", // Дата
  // submissionType: "QWE" // Тип подачи
  formCode: "Код налоговой отчетности",
  formHalfYear: "Налоговый период полугодие",
  formRegistrationNumber: "Регистрационный номер",
  formType: "Вид налоговой отчетности",
  formYear: "Налоговый период год",
  incomingDocumentNumber: "Входящий номер документа",
  isLiquidationToRegular:
    "Отзыв ликвидационной налоговой отчетности в случае принятия налогоплательщиком решения о возобновлении деятельности после проведения налоговой проверки или завершения камерального контроля",
  newContractDate: "string",
  newContractNumber: "string",
  newCurrencyCode: 0,
  newFormType: 0,
  newHalfYear: 0,
  newIsResident: true,
  newResidenceTaxOrgCode: "string",
  newTaxOrgCode: "Старый код налогового органа",
  newYear: 0,
  oldContractDate: "string",
  oldContractNumber: "string",
  oldCurrencyCode: "Не указан или неверно указан код валюты",
  oldFormType: "0",
  oldHalfYear: 0,
  oldIsResident: true,
  oldResidenceTaxOrgCode: "string",
  oldTaxOrgCode: "string",
  oldYear: 0,
  postalStampDate: "Дата почтового штемпеля",
  receiveDate: "Дата приема",
  revocationReason: 0,
  revocationReasonDetail: 0,
  sendDate: "Дата отправки",
  signingOfficerName: "string",
  signingTaxPayerName: "string",
  submissionType: "Тип подачи",
  taxOrgCode: "string",
  taxPayerName: "ФИО",
  taxPayerXin: "ИИН Налогоплательщика"
};

const appStatuses = {
  1: "Принято",
  2: "Обработано",
  3: "Не принято"
};

const appType = {
  1: "Налоговое заявление о приостановлении (продлении, возобновлении) представления налоговой отчетности",
  2: "Налоговое заявление на отзыв налоговой отчетности"
};

const debtStatus = {
  1: "Отсутствует задолженность",
  2: "На выяснении",
  3: "Имеется задолженность",
  4: "Ошибка"
};

const submissionType = {
  1: "На бумажном носителе – для тех ФНО, которые были предоставлены в явочном порядке на бумажном носителе",
  2: "На магнитном носителе – для тех ФНО, которые были предоставлены в явочном порядке в электронном виде на магнитном носителе",
  3: "По почте – для тех ФНО, которые были предоставлены заказным письмом с уведомлением по почте на бумажном носителе",
  4: "В электронном виде – для тех ФНО, которые были отправлены системой подачи ФНО через Интернет",
  5: "PDF – для тех ФНО, которые были предоставлены через PDF"
};

class ListStatements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        "http://10.202.41.203:9020/tax-report/form-apps?page=0&size=10&userXin=781227450219",
      card_url: "http://10.202.41.203:9020/tax-report/form-apps/",
      results: {},
      startValue: null,
      endValue: null,
      endOpen: false
    };
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  async componentDidMount() {
    await this.getData();
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

  getData = e => {
    axios
      .get(this.state.url)
      .then(response => {
        let rows = response.data.content;
      })
      .catch(error => {
        this.setState({ success: false });
      });
  };

  renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
    return {
      [newProp]: old,
      ...others
    };
  };
  renderSearchResults = () => {
    let { results } = this.state;
    this.renameProp("taxPayerName", "ИИН", results);
    if (results) {
      Object.entries(russianTitle).map(([key, value]) => {
        let temp = results[key];
        if (temp) {
          results[value] = temp;
          delete results[key];
        }
      });

      return (
        <Descriptions bordered size="middle" column={1}>
          {Object.entries(results).map(([key, value]) => (
            <Descriptions.Item label={key}>{value}</Descriptions.Item>
          ))}
        </Descriptions>
      );
    }
  };

  showModal = () => {
    this.setState({
      visible: true
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

  getCardData = item => {
    axios
      .get(`${this.state.card_url}${item}`)
      .then(response => {
        this.setState({
          results: response.data
        });
        console.log(response.data);

        this.showModal();
      })
      .catch(error => {
        this.setState({ success: false });
      });
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  async fetchPostsAsync(url) {
    try {
      this.setState({ ...this.state, isFetching: true });
      const response = await axios.get(url);
      let taxPayerName = response.data.content[0].taxPayerName;
      if (taxPayerName) {
        this.setState({
          taxPayerName
        });
      }

      this.setState({
        ...this.state,
        isFetching: false,
        data: response.data.content
      }); // Take first 5 posts only
    } catch (e) {
      console.log("err");
      this.setState({ ...this.state, data: "", isFetching: false });
    }
  }
  fetchPosts = this.fetchPostsAsync;

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

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    return (
      <>
        <CabinetHeader title={title} />
        <Content style={{ margin: "0 16px", padding: "20px 10px" }}>
          <Row gutter={20}>
            <Alert
              className="breadcrumb-title"
              message={
                <>
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                      <Icon type="user" />
                      <span>Список налоговых заявлений</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Налоговое заявление 001</Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Form onSubmit={this.submitAuditJournal} style={{ margin: "30px 0" }}>
            <Row gutter={20}>
              <Col span={6}>
                <Form.Item label="Список статусов НЗ">
                  {getFieldDecorator("appStatuses")(
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Выберите статус"
                      optionFilterProp="children"
                      allowClear
                      showSearch
                      showArrow
                    >
                      {Object.entries(appStatuses)
                        .sort(([a], [b]) => a - b)
                        .map(([key, value]) => (
                          <Option value={key} name={key}>
                            {value}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Наименование НЗ">
                  {getFieldDecorator("appType")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите наименование"
                      optionFilterProp="children"
                      allowClear
                      showSearch
                      showArrow
                    >
                      {Object.entries(appType)
                        .sort(([a], [b]) => a - b)
                        .map(([key, value]) => (
                          <Option value={key} name={key}>
                            {value}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Сведения о задолженности">
                  {getFieldDecorator("debtStatus")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите сведение"
                      optionFilterProp="children"
                      allowClear
                      showSearch
                      showArrow
                    >
                      {Object.entries(debtStatus)
                        .sort(([a], [b]) => a - b)
                        .map(([key, value]) => (
                          <Option value={key} name={key}>
                            {value}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Дата приема с">
                  {getFieldDecorator("receiveStartDate", {
                    initialValue: startValue
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
                <Form.Item label="Дата приема по">
                  {getFieldDecorator("receiveEndDate")(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Период по"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Дата подачи с">
                  {getFieldDecorator("sendStartDate")(
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
                <Form.Item label="Дата подачи по">
                  {getFieldDecorator("sendEndDate")(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      style={{
                        width: "100%"
                      }}
                      placeholder="Период по"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Номер уведомления">
                  {getFieldDecorator("registrationNumber")(
                    <Input placeholder="Введите номер" />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Способ предоставления">
                  {getFieldDecorator("submissionType")(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Выберите способ"
                      optionFilterProp="children"
                      allowClear
                      showSearch
                      showArrow
                    >
                      {Object.entries(submissionType)
                        .sort(([a], [b]) => a - b)
                        .map(([key, value]) => (
                          <Option value={key} name={key}>
                            {value}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Код ОГД">
                  {getFieldDecorator("taxOrgCode")(
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
          <Row gutter={20}>
            <TableTaxMpo
              data={this.state.data}
              isFetching={this.state.isFetching}
              getCardData={this.getCardData}
            />
          </Row>
        </Content>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          width="90vw"
          onCancel={this.handleCancel}
        >
          {this.renderSearchResults()}
        </Modal>
      </>
    );
  }
}

const ListStatementsWrapper = Form.create({ name: "fno_form" })(ListStatements);

export default ListStatementsWrapper;
