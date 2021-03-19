import React from "react";

class Test extends React.Component {
  state = {
    name: "bo",
  };
  render() {
    return <h1>{this.state.name}</h1>;
  }
}

export default Test;
