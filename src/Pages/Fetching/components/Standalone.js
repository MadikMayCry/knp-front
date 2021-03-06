// components/Standalone.js
import React, { Component } from "react";
import axios from "axios";
import { Table } from "antd";

const { Column } = Table;

// API END POINT
const POSTS_SERVICE_URL = "https://jsonplaceholder.typicode.com/posts";

class Standalone extends Component {
  state = {
    // Initial state.
    isFetching: false,
    posts: []
  };

  render() {
    const { posts } = this.state;
    return (
      <>
        <Table dataSource={posts}>
          <Column title="Id" dataIndex="id" key="id" />
          <Column title="Title" dataIndex="title" key="title" />
          <Column title="Body" dataIndex="body" key="body" />
        </Table>
        <p>{this.state.isFetching ? "Fetching posts..." : ""}</p>
      </>
    );
  }

  componentDidMount() {
    this.fetchPostsAsync();
  }

  async fetchPostsAsync() {
    try {
      this.setState({ ...this.state, isFetching: true }); // Sets loading state.
      const response = await axios.get(POSTS_SERVICE_URL);
      this.setState({
        ...this.state,
        isFetching: false,
        posts: response.data.slice(0, 5) // Take first 5 posts only
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }
}

export default Standalone;
