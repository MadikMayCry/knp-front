import React from "react";

import { Layout } from "antd";
import "antd/dist/antd.css";

const { Content } = Layout;

class ARMLayout extends React.Component {
  render() {
    const { component: ComponentLayout, ...rest } = this.props;
    return (
      <Layout>
        <Content className="mainContent">
          <ComponentLayout {...rest} />
        </Content>
      </Layout>
    );
  }
}

export default ARMLayout;
