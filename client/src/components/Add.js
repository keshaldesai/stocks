import React, { Component } from "react";
import { Form, Message, Grid } from "semantic-ui-react";
import { addStock } from "../actions";
import { connect } from "react-redux";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "",
      error: ""
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { symbol } = this.state;
    const cleanSymbol = symbol.trim().toUpperCase();
    const checkSymbol = this.props.symbols.find(one => {
      return cleanSymbol === one;
    });
    if (checkSymbol) {
      return this.setState({
        symbolError: "Symbol already added"
      });
    } else {
      this.setState({
        symbolError: ""
      });
      return this.props.addStock(cleanSymbol);
    }
  };

  render() {
    const { symbol, symbolError } = this.state;
    const { errorData } = this.props;
    return (
      <div className="add">
        <Grid columns={16}>
          <Grid.Column width={5} />
          <Grid.Column width={6}>
            <Form
              onSubmit={this.handleSubmit}
              error={symbolError || errorData ? true : false}
            >
              <Form.Group>
                <Form.Input
                  placeholder="Stock ticker"
                  name="symbol"
                  onChange={this.handleChange}
                  value={symbol}
                  width="10"
                />
                <Form.Button content="Add stock" width="6" />
              </Form.Group>
              <Message error content={symbolError || errorData} />
            </Form>
          </Grid.Column>
          <Grid.Column width={5} />
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorData: state.stocks.error,
    symbols: state.stocks.symbols
  };
}

export default connect(mapStateToProps, { addStock })(Add);
