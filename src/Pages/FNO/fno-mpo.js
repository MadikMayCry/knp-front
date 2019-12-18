import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import TableMpo from "./TableMpo";
import CabinetHeader from "Layout/CabinetHeader";
import ogd_list from "ogd_list.json";
import fno_list from "fno_list.json";
import monthList from "month_list.json";
import {
  Row,
  Col,
  DatePicker,
  Form,
  Input,
  Button,
  Descriptions,
  Modal,
  Radio,
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

const formStatuses = {
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

const submissionType = {
  1: "На бумажном носителе ",
  2: "На магнитном носителе ",
  3: "По почте ",
  4: "В электронном виде ",
  5: "PDF"
};

const sourceSystem = {
  1: "Кабинет НП",
  2: "Портал КГД",
  3: "МГУ"
};

const taxPayerType = {
  1: "Юридические лица, филиалы",
  2: "Индивидуальные предприниматели",
  3: "Физические лица",
  4: "Администратор в процедуре реабилитации и банкротстве",
  5: "Лица, занимающиеся частной практикой"
};

const revocationReason = {
  1: "Отзыв ликвидационной налоговой отчетности в случае принятия налогоплательщиком решения в соответствии со статьями 37,38,40,41 и 42 о возобновлении деятельности до начала проведения налоговой проверки;",
  2: "Отзыв налоговой отчетности, представленной с нарушением условий пункта 2 статьи 68, пункта 5 статьи 70 Налогового кодекса;",
  3: "Представленной налогоплательщиком, у которого в соответствии с Налоговым кодексом отсутствует обязательство по представлению такой налоговой отчетности;",
  4: "Несоответствие требованиям пункта 5 статьи 584 Налогового кодекса;"
};

class FNOMPO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
      halfYears: quarterData[halfYearData[0]],
      quarter: quarterData[halfYearData[0]][0],
      url: `http://10.202.41.203:9020/tax-report/tax-forms?userXin=781227450219`,
      card_url: `http://10.202.41.203:9020/tax-report/tax-forms/`
    };
  }

  getCardData = item => {
    console.log(item);

    axios
      .get(`${this.state.card_url}${item}?userXin=591207400104`)
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

  renderSearchResults = () => {
    let { results } = this.state;
    if (results) {
      console.log(results);
      debugger;
      return (
        <Descriptions bordered size="middle" column={1}>
          {Object.entries(results).map(([key, value]) =>
            typeof value != "object" ? (
              <Descriptions.Item label={key}>{value}</Descriptions.Item>
            ) : (
              ""
            )
          )}
        </Descriptions>
      );
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
        data: response.data.content,
        taxPayerName: response.data.content[0].taxPayerName
      }); // Take first 5 posts only
      console.log(response.data.content);
    } catch (e) {
      console.log("err");
      this.setState({ ...this.state, data: "", isFetching: false });
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
      if (!err) {
        const data = {
          ...values,
          sendStartDate: values["sendStartDate"]
            ? values["sendStartDate"].format("YYYY-MM-DD")
            : undefined,
          sendEndDate: values["sendEndDate"]
            ? values["sendEndDate"].format("YYYY-MM-DD")
            : undefined
        };
        this.formData(data);
      }
    });
  };

  formData = data => {
    let temp = this.state.url;
    Object.entries(data).map(item => {
      if (item[1]) {
        if (item[0] === "formStatuses") {
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
    const { halfYears } = this.state;
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
          <Row>
            <Alert
              className="breadcrumb-title"
              message={
                <>
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Журнал форм КНП</Breadcrumb.Item>
                  </Breadcrumb>
                </>
              }
              type="info"
            ></Alert>
          </Row>
          <Row>
            <Form onSubmit={this.submitAuditJournal}>
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item label="ИИН налогоплательщика">
                    {getFieldDecorator("taxPayerXin")(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Введите ИИН"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="ФИО">
                    <Input
                      style={{ width: "100%" }}
                      value={this.state.taxPayerName}
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item label="Способ предоставления">
                    {getFieldDecorator("submissionType")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите способ"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        showSearch
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
                  <Form.Item label="Источник">
                    {getFieldDecorator("sourceSystem")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите источник"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        showSearch
                      >
                        {Object.entries(sourceSystem)
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
                  <Form.Item label="Причина отзыва">
                    {getFieldDecorator("revocationReason")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите причину"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        showSearch
                      >
                        {Object.entries(revocationReason)
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
                        showSearch
                        optionFilterProp="children"
                        showSearch
                      >
                        {this.optionFieldsJson(ogd_list)}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Код ФНО">
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
                  <Form.Item label="Вид ФНО">
                    {getFieldDecorator("formType")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите вид ФНО"
                        optionFilterProp="children"
                        allowClear
                        showSearch
                      >
                        {Object.entries(formType)
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
                  <Form.Item label="Статус ФНО">
                    {getFieldDecorator("formStatuses")(
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Выберите вид ФНО"
                        optionFilterProp="children"
                        allowClear
                        showSearch
                      >
                        {Object.entries(formStatuses)
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
                  <Form.Item label="Регистрационный номер">
                    {getFieldDecorator("registrationNumber")(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Введите номер"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Год">
                    {getFieldDecorator("yearField")(
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
                    {getFieldDecorator("halfYear")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите Полугодие"
                        onChange={this.handlehalfYearChange}
                      >
                        {halfYearData.map(halfYear => (
                          <Option key={halfYear}>{halfYear}</Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Квартал">
                    {getFieldDecorator("quarter")(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Выберите Квартал"
                        onChange={this.onquarterChange}
                        allowClear
                      >
                        {halfYears.map(item => (
                          <Option key={item}>{item}</Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Месяц">
                    {getFieldDecorator("month")(
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
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Дата подачи ФНО">
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
                  <Form.Item label="Дата подачи ФНО">
                    {getFieldDecorator("sendEndDate")(
                      <DatePicker
                        format="YYYY-MM-DD"
                        showTime
                        style={{
                          width: "100%"
                        }}
                        placeholder="Период по"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Дата приема">
                    {getFieldDecorator("acceptStartDate")(
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
                  <Form.Item label="Дата приема">
                    {getFieldDecorator("acceptEndDate")(
                      <DatePicker
                        format="YYYY-MM-DD"
                        showTime
                        style={{
                          width: "100%"
                        }}
                        placeholder="Период по"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Form.Item label="Типы налогоплательщика">
                  {getFieldDecorator("taxPayerType")(
                    <Radio.Group>
                      {Object.entries(taxPayerType)
                        .sort(([a], [b]) => a - b)
                        .map(([key, value]) => (
                          <Radio value={key}>{value}</Radio>
                        ))}
                    </Radio.Group>
                  )}
                </Form.Item>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item label="Количество на странице">
                    {getFieldDecorator("size", {
                      initialValue: 100
                    })(
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
            <TableMpo
              data={this.state.data}
              isFetching={this.state.isFetching}
              postId={this.state.postId}
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
const WrapperFNOMPO = Form.create({ name: "fno_mpo_form" })(FNOMPO);

export default WrapperFNOMPO;
