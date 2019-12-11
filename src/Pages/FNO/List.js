import React, { useEffect, useState } from "react";
import axios from "axios";
import UseDataApi from "hooks/UseDataApi";
import Table from "./Table";
// import { useSignUpForm } from "./CustomHooks";

import {
  Row,
  Col,
  DatePicker,
  Form,
  Button,
  Input,
  Icon,
  Alert,
  Breadcrumb,
  Layout
} from "antd";

import CabinetHeader from "Layout/CabinetHeader";

const { Content } = Layout;
const title = "Фурнал форм КНП";
const POSTS_SERVICE_URL = "https://jsonplaceholder.typicode.com/posts";

function List() {
  const [data, setData] = useState({
    posts: [],
    isFetching: false
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ ...data, isFetching: true });
        const response = await axios.get(POSTS_SERVICE_URL);
        setData({
          ...data,
          posts: response.data.slice(0, 5),
          isFetching: false
        });
      } catch (e) {
        console.log(e);
        setData({ ...data, isFetching: false });
      }
    };
    // fetchUsers();
  }, []);

  return (
    <>
      <CabinetHeader title={title} />
      <Content style={{ margin: "0 16px", padding: "20px 10px" }}>
        <Row gutter={20}>
          <Alert
            className="breadcrumb-title"
            message={
              <>
                <Breadcrumb>
                  <Breadcrumb.Item href="">
                    <Icon type="home" />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Журнал форм КНП</Breadcrumb.Item>
                </Breadcrumb>
              </>
            }
            type="info"
          ></Alert>
        </Row>
        <Row
          gutter={20}
          style={{
            margin: 20
          }}
        >
          <Form
          //  onSubmit={handleSubmit()}
          >
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              required
            />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row gutter={20}>
          <Table data={data.posts} isFetching={data.isFetching} />
        </Row>
      </Content>
    </>
  );
}

export default List;
