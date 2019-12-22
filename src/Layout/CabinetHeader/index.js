import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Menu,
  Dropdown,
  Icon,
  message,
  Layout,
  Button,
  Select,
  Input,
  Row,
  Divider,
  Tooltip,
  List,
  Avatar
} from "antd";
import Calendar from "./Calendar";
import bg from "./bg.png";

const { Option } = Select;
const { Header, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      Ссылка на первый ресурс
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      Ссылка на второй ресурс
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="user" />
      Ссылка на третий ресурс
    </Menu.Item>
  </Menu>
);

class CabinetHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  handleSearch = e => {
    if (e) {
      this.setState({
        redirect: true
      });
    }

    // this.router.push(`'/search//some-action'`);
    // if (this.state.redirect) {
    //   console.log("redirecting");

    // }
  };

  renderRedirect = () => {
    if (this.state.redirect) {

      return <Redirect to="/search-results" />;
    }
  };
  render() {
    const { title } = this.props;
    return (
      <>
        {this.renderRedirect()}
        <Header
          style={{ background: "#F0F3F9", margin: "0px 16px", padding: 0 }}
          className="cabinet-header d-flex jc-fl-end"
        >
          {/* <h1 className="page-title" style={{ marginRight: "auto" }}>
            {title}
          </h1> */}
          <Input.Search
            placeholder="Введите запрос"
            enterButton="Поиск"
            style={{width: 350, marginRight: "auto"}}
            onSearch={this.handleSearch}

          />
          <img style={{ height: "30px", marginRight: 10 }} src={bg} />
          <Dropdown overlay={menu}>
            <Button>
              <Icon type="link" />
              Полезные ссылки <Icon type="down" />
            </Button>
          </Dropdown>
          <div className="logo-title-wrapper" style={{ margin: "0 10px" }}>
            <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
            <div className="logo-title">
              <div className="title">Бердибаев М.Е.</div>
              <div className="sub-title">ИИН 560319301503</div>
            </div>
          </div>
          <Button type="link">
            <Icon type="logout" />
          </Button>
        </Header>
        <Content style={{ margin: "0 16px", padding: "10px", flex: "initial" }}>
          <Calendar />
        </Content>
      </>
    );
  }
}

export default CabinetHeader;
