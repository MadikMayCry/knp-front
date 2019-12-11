import React from "react";
import { Table } from "antd";

const { Column } = Table;

const PostsList = props => {
  return (
    <>
      <Table dataSource={props.data}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Body" dataIndex="body" key="body" />
      </Table>
      <p>{props.isFetching ? "Fetching posts..." : ""}</p>
    </>
  );
};
export default PostsList;
