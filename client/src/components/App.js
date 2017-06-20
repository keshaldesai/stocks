import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Chart from "./Chart";
import Cards from "./Cards";
import Add from "./Add";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Container>
          <Add />
          <Chart />
          <Cards />
        </Container>
      </div>
    );
  }
}

export default App;
