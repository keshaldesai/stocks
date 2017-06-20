import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import { addStock } from "../actions";
import { connect } from "react-redux";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: ""
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { symbol } = this.state;
    this.props.addStock(symbol);
  };

  render() {
    const { symbol, error } = this.state;
    const errorTest = error ? { error: true } : { error: false };
    return (
      <div className="add">
        <Form onSubmit={this.handleSubmit} {...errorTest}>
          <Form.Group>
            <Form.Input
              placeholder="Stock ticker"
              name="symbol"
              onChange={this.handleChange}
              value={symbol}
            />
            <Message error content={error} />
            <Form.Button content="Add new stock" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default connect(null, { addStock })(Add);
