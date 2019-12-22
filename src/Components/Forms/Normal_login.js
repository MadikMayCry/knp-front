import React from "react";
import { Form, Icon, Input, Button, Select, Checkbox, message } from "antd";
import { Redirect } from "react-router-dom";
const rules = {
  xin: [{ required: true, message: "Введите ИИН!" }],
  password: [{ required: true, message: "Введите пароль!" }]
};

const userTypes = [
  "Юридическое лицо",
  "Индивидуальные предприниматели",
  "Физические лица",
  "Администратор в процедуре реабилитации и банкротстве",
  "Лица, занимающиеся частной практикой",
  "Уполномоченный/законный представитель"
];

class NormalLoginForm extends React.Component {
  state = {
    redirect: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values.xin == 560319301503 && values.password == "admin") {
        this.setState({
          redirect: true
        });
        return;
      }
      message.error("Неверные данные");
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      console.log("redirecting");

      return <Redirect to="/home" />;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.renderRedirect()}
        <Form.Item>
          {getFieldDecorator("xin", {
            rules: rules.xin
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="ИИН"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: rules.password
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Пароль"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Select placeholder="Выберите роль">
            {userTypes.map(item => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="form-actions d-flex jc-sp-between">
          <Checkbox>Запомнить меня</Checkbox>
          <a
            className="login-form-forgot"
            href=""
            style={{ marginLeft: "auto" }}
          >
            Забыли пароль
          </a>
        </div>
        <div className="form-actions d-flex jc-sp-between">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
          <Button className="teal-btn">Войти по ЭЦП</Button>
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
