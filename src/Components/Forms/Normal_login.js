import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const rules = {
  xin: [{ required: true, message: "Введите ИИН!" }],
  password: [{ required: true, message: "Введите пароль!" }]
};

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          <Button
            className="yellow-btn"
          >
            Войти по ЭЦП
          </Button>
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
