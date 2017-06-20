import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

class Cards extends Component {
  renderCards() {
    const { symbols } = this.props;
    if (symbols.length === 0) {
      return <div />;
    }
    return symbols.map(symbol => {
      return (
        <Card
          key={symbol}
          href={`https://www.google.com/finance?q=NASDAQ:${symbol}`}
          target="_blank"
          header={symbol}
          meta="Stock"
        />
      );
    });
  }
  render() {
    return (
      <Card.Group itemsPerRow={4}>
        {this.renderCards()}
      </Card.Group>
    );
  }
}

function mapStateToProps(state) {
  return {
    symbols: state.stocks.symbols
  };
}

export default connect(mapStateToProps)(Cards);
