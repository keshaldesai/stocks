import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import { removeStock } from "../actions";

class Cards extends Component {
  handleClick(e, data) {
    console.log(e.target.value);
  }
  renderCards() {
    const { symbols } = this.props;
    if (symbols.length === 0) {
      return <div />;
    }
    return symbols.map(symbol => {
      return (
        <Card key={symbol}>
          <Card.Content>
            <Card.Description
              href={`https://www.google.com/finance?q=NASDAQ:${symbol}`}
              target="_blank"
            >
              {symbol}
            </Card.Description>
            <Icon
              name="x"
              size="large"
              color="red"
              value={symbol}
              onClick={() => {
                this.props.removeStock(symbol);
              }}
            />
          </Card.Content>
        </Card>
      );
    });
  }
  render() {
    return (
      <div className="cards">
        <Card.Group stackable={true}>
          {this.renderCards()}
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    symbols: state.stocks.symbols
  };
}

export default connect(mapStateToProps, { removeStock })(Cards);
