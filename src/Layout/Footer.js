import React from "react";
import { Layout, Icon } from "antd";
import RcFooter from "rc-footer";
import "rc-footer/assets/index.css";
const { Footer } = Layout;

const Main = () => (
  <RcFooter
    style={{ margin: 0, textAlign: "left" }}
    // theme="light"
    columns={[
      {
        title: "Дополнительные ресурсы",
        items: [
          {
            icon: (
              <Icon
                type="android"
                theme="filled"
                style={{ color: "#52c41a" }}
              />
            ),
            title: "Скачать приложение Android",
            url: "https://www.google.ru/",
            openExternal: true
          },
          {
            icon: (
              <Icon type="apple" theme="filled" style={{ color: "#1890ff" }} />
            ),
            title: "Скачать приложение iOS",
            url: "https://www.google.ru/",
            openExternal: true
          }
        ]
      },
      {
        title: "Контакты",
        items: [
          {
            icon: (
              <Icon type="phone" theme="filled" style={{ color: "#1DA1F2" }} />
            ),
            title: "8 (7172) 70 14 87 ",
            url: "https://www.google.ru/",
            openExternal: true
          },
          {
            icon: (
              <Icon type="home" theme="filled" style={{ color: "#1DA1F2" }} />
            ),
            title: "просп. Женис 11, Нур-Султан 020000",
            url: "https://www.google.ru/",
            openExternal: true
          }
        ]
      }
    ]}
    bottom="КГД ©2019"
  />
);
export default Main;
