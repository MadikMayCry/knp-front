import React from "react";

import Standalone from "./components/Standalone";
import RenderProps from "./components/RenderProps";
import HOC from "./components/HOC";
import WithHooks from "./components/WithHooks";
// import WithCustomHook from "./components/WithCustomHook";
// import WithCustomMiddleware from "./components/WithCustomMiddleware";
import PostsList from "./components/PostsList";

function Fetching() {
  return (
    <div className="App">
      <h3>Standalone</h3>
      <Standalone />
      <h3>HOC</h3>
      <HOC />
      <h3>Render Props</h3>
      <RenderProps children={PostsList} />
      <h3>WithHooks</h3>
      <WithHooks />
      {/*<h3>With Custom Hook</h3>
      <WithCustomHook />
      
      <h3>With Custom Middleware</h3>
      <WithCustomMiddleware /> */}
    </div>
  );
}

export default Fetching;
