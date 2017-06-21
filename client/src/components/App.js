import React, { Component } from "react";
import Chart from "./Chart";
import Cards from "./Cards";
import Add from "./Add";
import { Container } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <Container className="app">
        <Chart />
        <Add />
        <Cards />
      </Container>
    );
  }
}

export default App;
