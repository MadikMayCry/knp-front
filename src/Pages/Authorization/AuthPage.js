import React, { Component } from "react";
import { Layout, Col, Row, Tabs, Button, Select, Divider } from "antd";

// Images
import logo from "./blank_logo.png";
import bg from "./BG.jpg";
import gov from "./gov.png";
import egov from "./egov.png";
import kgd from "./kgd.png";

// Forms
import NormalLoginForm from "Components/Forms/Normal_login";

const { Option } = Select;

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const language_list = {
  english: "Английский",
  russian: "Русский",
  kazakh: "Казахский"
};

const { Header, Content } = Layout;

class AuthPage extends Component {
  handleChange = value => {
    console.log(`selected ${value}`);
  };

  optionSelect = item => {
    return Object.entries(item).map(([key, value]) => (
      <Option value={key} name={key}>
        {value}
      </Option>
    ));
  };

  optionFieldsJson = item => {
    return Object.entries(item).map(([key, value]) => (
      <Option value={key}>{value}</Option>
    ));
  };

  render() {
    return (
      <Layout
        className="asd"
        style={{
          background: "#F0F3F9",
          height: "100vh"
        }}
      >
        <Content>
          <Row
            style={{
              height: "100%"
            }}
          >
            <Col span={8}>
              <div className="side-bar">
                <div className="logo-title-wrapper">
                  <img
                    src={logo}
                    style={{
                      height: "75px"
                    }}
                  />
                  <div className="logo-title">
                    <div style={{}} className="title">
                      КАБИНЕТ НАЛОГОПЛАТЕЛЬЩИКА
                    </div>
                    <div className="sub-title">
                      Комитет государственных доходов Министерства финансов
                      Республики Казахстан
                    </div>
                  </div>
                </div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="Авторизация" className="tab-title" key="1">
                    <NormalLoginForm />
                  </TabPane>
                </Tabs>
              </div>
            </Col>
            <Col
              span={16}
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                height: "100%"
              }}
            >
              <Header
                style={{ backgroundColor: "initial", padding: "40px" }}
                className="auth-header d-flex jc-fl-end"
              >
                <Select
                  style={{ width: 120, marginRight: "auto" }}
                  onChange={this.handleChange}
                  className="language-select"
                  defaultValue={language_list.russian}
                >
                  {this.optionSelect(language_list)}
                </Select>
                <Button type="link" icon="mail">
                  Служба поддержки
                </Button>
                <Button type="link" icon="question-circle">
                  Справка
                </Button>
              </Header>
              <div
                className="intro-text-wrapper"
                style={{
                  margin: "0 auto",
                  marginTop: "100px",
                  width: "50%",
                  color: "#fff"
                }}
              >
                <div
                  classNam="intro-text-title"
                  style={{
                    fontSize: "48px",
                    lineHeight: "68px",
                    fontWeight: "bold"
                  }}
                >
                  Добро пожаловать в кабинет налогоплательщика.
                </div>
                <div
                  classNam="intro-text-desc"
                  style={{
                    fontSize: "14px",
                    lineHeight: "34px",
                    marginTop: "20px"
                  }}
                >
                  Получайте актуальную информацию об объектах имущества и
                  транспортных средствах, о суммах начисленных и уплаченных
                  налоговых платежей, о наличии переплат, о задолженности по
                  налогам перед бюджетом.
                </div>
              </div>
              <div className="bottom-links">
                <Divider />
                <Row>
                  <Col span={6} className="bottom-card">
                    <div
                      className="logo-title-wrapper"
                      style={{ marginBottom: 0 }}
                    >
                      <img src={gov} style={{}} />
                      <div className="logo-title">
                        <div className="sub-title">Сайт первого президента</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={6} className="bottom-card">
                    <div
                      className="logo-title-wrapper"
                      style={{ marginBottom: 0 }}
                    >
                      <img src={gov} style={{}} />
                      <div className="logo-title">
                        <div className="sub-title">Сайт Правительства</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={6} className="bottom-card">
                    <div
                      className="logo-title-wrapper"
                      style={{ marginBottom: 0 }}
                    >
                      <img src={egov} style={{}} />
                      <div className="logo-title">
                        <div className="sub-title">
                          Сайт Электронного правительства
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={6} className="bottom-card">
                    <div
                      className="logo-title-wrapper"
                      style={{ marginBottom: 0 }}
                    >
                      <img src={kgd} />
                      <div className="logo-title">
                        <div className="sub-title">
                          Сайт Комитета гос. доходов
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default AuthPage;
