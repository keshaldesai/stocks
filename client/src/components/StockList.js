import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
import { removeStock } from "../actions";

class StockList extends Component {
  renderCards() {
    const { symbols } = this.props;
    if (symbols.length === 0) {
      return <div />;
    }
    return symbols.map(symbol => {
      return (
        <List.Item key={symbol}>
          <List.Content
            href={`https://www.google.com/finance?q=NASDAQ:${symbol}`}
            target="_blank"
            style={{ color: "white" }}
          >
            {symbol}
          </List.Content>
          <List.Icon
            name="x"
            size="large"
            color="red"
            value={symbol}
            onClick={() => {
              this.props.removeStock(symbol);
            }}
            style={{ cursor: "pointer", padding: "0px 8px" }}
          />
        </List.Item>
      );
    });
  }
  render() {
    return (
      <div className="stocklist">
        <List inverted size="big" horizontal={true}>
          {this.renderCards()}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    symbols: state.stocks.symbols
  };
}

export default connect(mapStateToProps, { removeStock })(StockList);
