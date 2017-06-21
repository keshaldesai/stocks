import React, { Component } from "react";
import Chart from "./Chart";
import StockList from "./StockList";
import Add from "./Add";
import { Container } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <Container className="app">
        <Chart />
        <Add />
        <StockList />
      </Container>
    );
  }
}

export default App;
