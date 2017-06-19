import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";

class Cards extends Component {
  renderCards() {
    return this.props.symbols.map(symbol => {
      return (
        <Card
          key={symbol}
          href={`https://www.google.com/finance?q=NASDAQ:${symbol}`}
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
        <Card
          onClick={() => {
            console.log("clicked");
          }}
        >
          <Icon name="home" size="massive" />
        </Card>
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
