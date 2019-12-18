import React from "react";
import { ThemeProvider } from "styled-components";
import MainSider from "Layout/MainSider/index";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import ChatBot from "react-simple-chatbot";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Roboto",
  headerBgColor: "#4561E1",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#4561E1",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a"
};

const steps = [
  {
    id: "1",
    message: "Выберите язык",
    trigger: "2"
  },
  {
    id: "2",
    options: [
      { value: "Русский", label: "Русский", trigger: "3" },
      { value: "Казахский", label: "Казахский", trigger: "4" }
    ]
  },
  {
    id: "3",
    message: "Чем я могу вам помочь?",
    trigger: "5"
  },
  {
    id: "4",
    message: "Сізге қандай көмек көрсете аламын",
    trigger: "6"
  },
  {
    id: "5",
    user: true,
    trigger: "7"
  },
  {
    id: "6",
    user: true,
    trigger: "8"
  },
  {
    id: "7",
    message: "По вашему запросу ничего не найдено",
    trigger: 3
  },
  {
    id: "8",
    message: "Сіздің сұрауыңыз бойынша нәтижелер табылмады.",
    trigger: 4
  }
];
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class MainLayout extends React.Component {
  render() {
    const { component: ComponentLayout, ...rest } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <MainSider />
        <Layout style={{ backgroundColor: "#F0F3F9" }}>
          <ComponentLayout {...rest} />
          <Footer style={{ textAlign: "center" }}>КГД ©2019</Footer>
        </Layout>
        <ThemeProvider theme={theme}>
          <ChatBot floating={true} steps={steps} headerTitle="Умный бот Алибек"/>
        </ThemeProvider>
      </Layout>
    );
  }
}
export default MainLayout;
