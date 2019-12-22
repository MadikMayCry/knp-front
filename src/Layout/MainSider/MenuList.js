import React, { Component } from "react";
import { Menu, Tooltip } from "antd";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

const { SubMenu } = Menu;

class MenuList extends Component {
  handler(children) {
    return children.map(subOption => {
      if (!subOption.children) {
        return (
          <Menu.Item key={subOption.name}>
            <Link
              to={subOption.url ? subOption.url : window.location.pathname}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {subOption.img ? <img src={subOption.img} width="35px" /> : ""}
              <span className="no-child">{subOption.name}</span>
            </Link>
          </Menu.Item>
        );
      }
      return (
        <SubMenu
          key={subOption.name}
          title={
            <>
              {subOption.img ? <img src={subOption.img} width="35px" /> : ""}
              <span className="no-child">{subOption.name}</span>
            </>
          }
        >
          {this.handler(subOption.children)}
        </SubMenu>
      );
    });
  }

  render() {
    return <Menu mode="inline">{this.handler(this.props.list.data)}</Menu>;
  }
}

export default MenuList;
