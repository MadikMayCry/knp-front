import React, { Component } from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Row,
  Divider,
  Checkbox,
  Alert,
  Col,
  notification,
  List,
  PageHeader,
  Breadcrumb,
  Select,
  DatePicker,
  Radio,
  message,
  Layout
} from "antd";
import axios from "axios";
import moment from "moment";
import CabinetHeader from "Layout/CabinetHeader";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const title = "Регистрация Налогового заявления";
const form_title =
  "НАЛОГОВОЕ ЗАЯВЛЕНИЕ О ПРИОСТАНОВЛЕНИИ (ПРОДЛЕНИИ, ВОЗОБНОВЛЕНИИ) ПРЕДСТАВЛЕНИЯ НАЛОГОВОЙ ОТЧЕТНОСТИ";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Content } = Layout;
const ogdList = {
  "6202": "6202	",
  "6203": "6203	"
};

const errors_list = ["Заполните ФИО", "Заполните Дату"];

class ZeroZeroOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://10.202.41.203:9020/tax-report/v1/form-postpone-apps"
    };
  }

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  openNotification = (message, description) => {
    notification.open({
      message,
      description
    });
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
  }

  handleSubmit = e => {
    e.preventDefault();

    let currentDate = moment().format("YYYY-MM-DD");

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let temp = values;
        console.log(temp);

        let fio = `${temp.lastname}  ${temp.firstname}  ${
          temp.patronymic ? temp.patronymic : ""
        }`;

        let {
          recommencementDate,
          representativeName,
          taxOrgCode,
          taxArticleId,
          xin
        } = temp;

        let valuesFormatted = {
          xin,
          taxPayerName: fio,
          taxArticleId,
          submissionDate: currentDate,
          inputDate: currentDate,
          recommencementDate,
          representativeName,
          taxOrgCode
        };

        this.postData(valuesFormatted);
      } else {
        message.error("Введите корректные данные");
      }
    });
  };

  cancelCourse = () => {
    console.log("resetting");

    document.getElementById("001-form").reset();
  };

  postData = values => {
    axios
      .post(this.state.url, values)
      .then(response => {
        console.log(response);
        if (response.status == 201) {
          this.openNotification(
            "Успешно",
            "Ваше заявление успешно принято в обработку"
          );
          this.cancelCourse();
        } else {
          this.openNotification("Ошибка", "Что-то пошло не так");
        }
      })
      .catch(error => {
        this.setState({ success: false });
      });
  };

  optionSelect = item => {
    return Object.entries(item).map(([key, value]) => (
      <Option value={key} name={key}>
        {value}
      </Option>
    ));
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const xinError = getFieldError("xin");
    const lastnameError = getFieldError("lastname");
    const firstnameError = getFieldError("firstname");
    const patronymicError = getFieldError("patronymic");
    // Patronymic не у всех есть
    const taxArticleIdError = getFieldError("taxArticleId");
    const postponeDatesError = getFieldError("postponeDates");
    const postponeContinuationDatesError = getFieldError(
      "postponeContinuationDates"
    );
    const recommencementDateError = getFieldError("recommencementDate");
    const OGDError = getFieldError("taxOrgCode");
    const representativeNameError = getFieldError("representativeName");

    return (
      <>
        <CabinetHeader title={title} />
        <Content style={{ margin: "0 16px", padding: "20px 10px" }}>
          <Row gutter={20} className="zero zero one">
            <Alert
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
            <Divider></Divider>
            <Col span={6}>
              <div className="card-wrapper">
                <div className="card">
                  <div className="card-title">
                    <Alert message="Подсказка" type="info" showIcon />
                  </div>
                  <div className="card-desc">
                    <p>
                      Фамилия, имя, отчество (при наличии) руководителя
                      (налогоплательщика, налогового агента), уполномоченного
                      представителя налогоплательщика
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={18}>
              <Form onSubmit={this.handleSubmit} id="001-form">
                <div
                  className="tax form statement-wrapper"
                  style={{
                    width: "21cm",
                    height: "29.7cm",
                    position: "relative"
                  }}
                >
                  <div className="tax form statement">
                    <h5 className="title ta">{form_title}</h5>
                    <Divider style={{ margin: "15px 0 0", height: "2px" }} />
                    <div className="attention">
                      ВНИМАНИЕ! Заполнять шариковой или перьевой ручкой, ЧЕРНЫМИ
                      или СИНИМИ чернилами, ЗАГЛАВНЫМИ ПЕЧАТНЫМИ символами.
                    </div>
                    <Divider style={{ margin: "5px 0", height: "2px" }} />
                    <div className="section header ta">
                      Раздел. Общая информация о налогоплательщике
                    </div>
                    <div className="input group">
                      <div className="box">1</div>
                      <div className="label input">
                        Идентификационный номер налогоплательщика (налогового
                        агента) (ИИН/БИН)
                      </div>
                      <Form.Item
                        validateStatus={xinError ? "error" : ""}
                        help={xinError || ""}
                      >
                        {getFieldDecorator("xin", {
                          rules: [
                            { required: true, message: "Введите ваш ИИН" }
                          ]
                        })(<Input placeholder="ИИН" size="small" />)}
                      </Form.Item>
                    </div>
                    <div className="input group">
                      <div className="box">2</div>
                      <div className="label input">
                        Фамилия, имя, отчество (при наличии) или наименование
                        налогоплательщика (налогового агента)
                      </div>
                      <Form.Item
                        validateStatus={lastnameError ? "error" : ""}
                        help={lastnameError || ""}
                      >
                        {getFieldDecorator("lastname", {
                          rules: [
                            { required: true, message: "Введите вашу фамилию" }
                          ]
                        })(<Input size="small" placeholder="Фамилия" />)}
                      </Form.Item>
                    </div>
                    <div className="input group">
                      <Form.Item
                        validateStatus={firstnameError ? "error" : ""}
                        help={firstnameError || ""}
                      >
                        {getFieldDecorator("firstname", {
                          rules: [
                            { required: true, message: "Введите ваше имя" }
                          ]
                        })(<Input size="small" placeholder="Имя" />)}
                      </Form.Item>
                    </div>
                    <div className="input group">
                      <Form.Item
                        validateStatus={patronymicError ? "error" : ""}
                        help={firstnameError || ""}
                      >
                        {getFieldDecorator("patronymic")(
                          <Input
                            size="small"
                            name="patronymic"
                            placeholder="Отчество"
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div
                      className="section header ta"
                      style={{
                        marginTop: "3px",
                        marginBottom: "10px"
                      }}
                    >
                      Раздел. Информация о приостановлении
                      (продлении/возобновлении) представления налоговой
                      отчетности
                    </div>
                    <div className="input group">
                      <div className="box">3</div>
                      <div className="label input" style={{ maxWidth: "100%" }}>
                        В соответствии со статьей (укажите{" "}
                        <Checkbox disabled checked /> в соответствующей ячейке)
                        213 или 214
                        <Form.Item
                          style={{
                            display: "inline-block",
                            marginLeft: "10px"
                          }}
                          validateStatus={taxArticleIdError ? "error" : ""}
                          help={taxArticleIdError || ""}
                        >
                          {getFieldDecorator("taxArticleId", {
                            rules: [
                              {
                                required: true,
                                message: "Please select time!"
                              }
                            ]
                          })(
                            <Radio.Group>
                              <Radio value="213">213</Radio>
                              <Radio value="214">214</Radio>
                            </Radio.Group>
                          )}
                        </Form.Item>
                        Кодекса Республики Казахстан «О налогах и других
                        обязательных платежах в бюджет» (Налоговый кодекс)
                        прошу:
                      </div>
                    </div>
                    <div
                      className="input group dates"
                      style={{ marginTop: "10px" }}
                    >
                      <div className="box black">A</div>
                      <div className="label input" style={{ maxWidth: "100%" }}>
                        приостановить представление налоговой отчетности
                      </div>
                      <div className="ml-auto">
                        <Form.Item
                          validateStatus={postponeDatesError ? "error" : ""}
                          help={postponeDatesError || ""}
                        >
                          {getFieldDecorator("postponeDates", {
                            rules: [
                              {
                                type: "array",
                                message: "Выберите период"
                              }
                            ]
                          })(<RangePicker size="small" />)}
                        </Form.Item>
                      </div>
                    </div>
                    <div className="input group dates">
                      <div className="box black">B</div>
                      <div className="label input" style={{ maxWidth: "100%" }}>
                        продлить срок приостановления представления налоговой
                        отчетности
                      </div>
                      <div className="ml-auto">
                        <Form.Item
                          validateStatus={
                            postponeContinuationDatesError ? "error" : ""
                          }
                          help={postponeContinuationDatesError || ""}
                        >
                          {getFieldDecorator("postponeContinuationDates", {
                            rules: [
                              {
                                type: "array",
                                message: "Выберите период"
                              }
                            ]
                          })(<RangePicker size="small" />)}
                        </Form.Item>
                      </div>
                    </div>
                    <div className="input group dates">
                      <div className="box black">C</div>
                      <div className="label input" style={{ maxWidth: "100%" }}>
                        продлить срок приостановления представления налоговой
                        отчетности
                      </div>
                      <div className="ml-auto">
                        <Form.Item
                          validateStatus={
                            recommencementDateError ? "error" : ""
                          }
                          help={recommencementDateError || ""}
                        >
                          {getFieldDecorator("recommencementDate", {
                            rules: [
                              {
                                type: "object",
                                message: "Выберите дату"
                              }
                            ]
                          })(
                            <DatePicker
                              size="small"
                              style={{ width: "100%" }}
                            />
                          )}
                        </Form.Item>
                      </div>
                    </div>
                    <div
                      className="section header small ta"
                      style={{
                        marginTop: "20px"
                      }}
                    >
                      Раздел. Уведомление налогоплательщика о прекращении
                      деятельности, в случаях нарушения Налогового
                      законодательства
                    </div>
                    <div className="input group">
                      <div className="box">4</div>
                      <div className="label input" style={{ maxWidth: "95%" }}>
                        Ознакомлен (а) и согласен (а), что при соответствии
                        условиям пункта 2, 5 статьи 67 Налогового кодекса, после
                        окончания срока приостановления деятельности в случае не
                        представления налоговой отчетности в течение шестидесяти
                        календарных дней со дня истечения срока ее
                        представления, установленного Налоговым кодексом, моя
                        деятельность, как индивидуального предпринимателя будет
                        прекращена в упрощенном порядке, установленном Налоговым
                        кодексом.
                      </div>
                    </div>
                    <div
                      className="section header ta"
                      style={{
                        marginTop: "10px"
                      }}
                    >
                      Раздел. Согласие налогоплательщика
                    </div>
                    <div className="input group">
                      <div className="label input" style={{ maxWidth: "95%" }}>
                        Мы (Я) даем (даю) согласие на сбор и обработку
                        персональных данных, необходимых для получения
                        государственной услуги, оказываемой в рамках настоящего
                        налогового заявления.
                      </div>
                    </div>
                    <div
                      className="section header ta"
                      style={{
                        marginTop: "10px"
                      }}
                    >
                      Раздел. Ответственность налогоплательщика
                    </div>
                    <div className="input group">
                      <div
                        className="label input"
                        style={{ maxWidth: "95%", margin: "2px 0" }}
                      >
                        Мы (Я) несем (несу) ответственность в соответствии с
                        законодательными актами Республики Казахстан за
                        достоверность и полноту сведений, приведенных в
                        настоящем налоговом заявлении.
                      </div>
                    </div>
                    <div
                      className="input group"
                      style={{ alignItems: "flex-start" }}
                    >
                      <div
                        style={{
                          width: "60%",
                          marginLeft: "10px",
                          display: "inline-block"
                        }}
                      >
                        <div
                          style={{
                            background: "#fff",
                            border: "1px solid #cecece",
                            marginBottom: "20px"
                          }}
                          className="information"
                        >
                          <div className="warn-title">
                            Не выходить за ограничительную рамку
                          </div>
                          <div
                            className="user responsible-wrapper"
                            style={{ display: "flex" }}
                          >
                            <div className="user fullname">
                              <Form.Item
                                validateStatus={
                                  representativeNameError ? "error" : ""
                                }
                                help={representativeNameError || ""}
                              >
                                {getFieldDecorator("representativeName", {
                                  rules: [
                                    { required: true, message: "Введите ФИО" }
                                  ]
                                })(<Input size="small" placeholder="ФИО" />)}
                              </Form.Item>
                            </div>
                            <div className="user signature">
                              <div></div>
                            </div>
                          </div>
                          <div
                            className="user responsible-wrapper"
                            style={{ display: "flex" }}
                          >
                            <div className="user fullname">
                              <div className="subtitle">
                                Фамилия, имя, отчество (при наличии)
                                руководителя
                              </div>
                            </div>
                            <div className="user signature">
                              <div className="subtitle">Подпись</div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="user responsible-wrapper"
                          style={{ display: "flex" }}
                        >
                          <div
                            className="label input"
                            style={{ maxWidth: "100%" }}
                          >
                            Дата подачи налогового заявления
                          </div>
                          <div className="ml-auto">
                            <DatePicker
                              size="small"
                              value={moment()}
                              format="YYYY-MM-DD"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "39%",
                          height: "60px",
                          marginLeft: "20px",
                          display: "inline-block"
                        }}
                      >
                        <div
                          className="circle"
                          style={{ position: "relative" }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: "25px",
                              right: "50px"
                            }}
                          >
                            {" "}
                            М.П.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="section header ta"
                      style={{
                        marginTop: "60px"
                      }}
                    >
                      Раздел. Отметка государственного органа
                    </div>
                    <div
                      className="input group"
                      style={{ alignItems: "flex-start", marginTop: "10px" }}
                    >
                      <div
                        style={{
                          width: "60%",
                          marginLeft: "10px",
                          display: "inline-block"
                        }}
                      >
                        <div
                          style={{
                            background: "#fff",
                            border: "1px solid #cecece",
                            marginBottom: "5px"
                          }}
                          className="information"
                        >
                          <div className="warn-title">
                            Не выходить за ограничительную рамку
                          </div>
                          <div
                            className="user responsible-wrapper"
                            style={{ display: "flex" }}
                          >
                            <div className="user fullname">
                              <Input size="small" size="small" disabled />
                            </div>
                            <div className="user signature">
                              <div></div>
                            </div>
                          </div>
                          <div
                            className="user responsible-wrapper"
                            style={{ display: "flex" }}
                          >
                            <div className="user fullname">
                              <div className="subtitle">
                                Фамилия, имя, отчество (при наличии)
                                должностного лица, принявшего заявление
                              </div>
                            </div>
                            <div className="user signature">
                              <div className="subtitle">Подпись</div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="user responsible-wrapper"
                          style={{
                            display: "flex",
                            textAlign: "right",
                            fontSize: "8px"
                          }}
                        >
                          <div className="user" style={{ display: "flex" }}>
                            <div
                              className="label input"
                              style={{ maxWidth: "100%" }}
                            >
                              Входящий номер документа
                            </div>
                            <div className="ml-auto">
                              <Input disabled size="small" />
                            </div>
                          </div>
                          <div className="user" style={{ display: "flex" }}>
                            <div
                              className="label input"
                              style={{ maxWidth: "100%" }}
                            >
                              Код органа государственных доходов
                            </div>
                            <div className="ml-auto">
                              <Form.Item
                                validateStatus={OGDError ? "error" : ""}
                                help={OGDError || ""}
                              >
                                {getFieldDecorator("taxOrgCode", {
                                  rules: [
                                    { required: true, message: "Выберите УГД" }
                                  ]
                                })(
                                  <Select
                                    style={{ width: "100px" }}
                                    placeholder="ОГД"
                                    name="state"
                                  >
                                    {this.optionSelect(ogdList)}
                                  </Select>
                                )}
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "39%",
                          height: "60px",
                          marginLeft: "20px",
                          display: "inline-block"
                        }}
                      >
                        <div className="user" style={{ display: "flex" }}>
                          <div
                            className="label input"
                            style={{ maxWidth: "100%" }}
                          >
                            Дата приема налогового заявления
                          </div>
                          <div className="ml-auto">
                            <DatePicker
                              size="small"
                              value={moment()}
                              format="YYYY-MM-DD"
                              disabled
                            />
                          </div>
                        </div>
                        <div
                          className="user"
                          style={{ display: "flex", marginTop: "20px" }}
                        >
                          <div
                            className="label input"
                            style={{ maxWidth: "50%" }}
                          >
                            Дата почтового заявления
                            <span style={{ fontSize: "9px", display: "block" }}>
                              (заполняется в случае представления налогового
                              заявления по почте)
                            </span>
                          </div>
                          <div className="ml-auto">
                            <Input size="small" size="small" disabled />
                          </div>
                        </div>
                        <div className="box-smth">
                          <span
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px"
                            }}
                          >
                            М.Ш
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        fontSize: "10px",
                        marginTop: "45px",
                        marginLeft: "25px"
                      }}
                    >
                      Примечание: <br /> *заявление не представляется при
                      возобновлении деятельности индивидуальными
                      предпринимателями, применяющими специальный налоговый
                      режим для субъектов малого бизнеса на основе патента.
                      Возобновление деятельности такими расчета стоимости
                      патента на предстоящий период. плательщиками
                      осуществляется при подаче в органы государственных доходов
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Отправить
                </Button>
              </Form>
            </Col>
          </Row>
        </Content>
      </>
    );
  }
}

const TaxStatement = Form.create({ name: "001_form" })(ZeroZeroOne);

export default TaxStatement;
