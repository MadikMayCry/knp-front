import React from "react";

import MainSider from "Layout/MainSider/index";

import { Layout, Menu, Breadcrumb, Icon } from "antd";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class MainLayout extends React.Component {
  render() {
    const { component: ComponentLayout, ...rest } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <MainSider />
        <Layout>
          <ComponentLayout {...rest} />
          <Footer style={{ textAlign: "center" }}>
            КГД ©2019
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default MainLayout;
