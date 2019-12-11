import { Component } from "react";
import axios from "axios";

const POSTS_SERVICE_URL = "https://jsonplaceholder.typicode.com/posts";

class RenderProps extends Component {
  state = {
    isFetching: false,
    data: []
  };

  render = () => this.props.children(this.state);

  componentDidMount() {
    this.fetchPosts();
  }

  async fetchPostsAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const response = await axios.get(POSTS_SERVICE_URL);
      this.setState({
        ...this.state,
        isFetching: false,
        data: response.data.slice(0, 5)
      }); // Take first 5 posts only
      console.log(this.state);
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }

  fetchPosts = this.fetchPostsAsync;
}

export default RenderProps;
