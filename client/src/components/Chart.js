import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import * as actions from "../actions";
import { connect } from "react-redux";

const colors = [
  "#F44336",
  "#FFC107",
  "#E91E63",
  "#009688",
  "#9C27B0",
  "#2196F3",
  "#673AB7",
  "#3F51B5"
];

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

class Chart extends Component {
  componentWillMount() {
    this.props.getData().then(() => {
      this.props.connectSocket();
    });
  }
  renderChart() {
    const { data, symbols } = this.props;
    if (!data) {
      return (
        <Segment>No data available, feel free to add a stock above.</Segment>
      );
    }
    let newData = [];
    const obj = {};
    const callback = finalObj => {
      newData = Object.keys(finalObj).sort().map((stockDate, ind, arr) => {
        const monthData = finalObj[stockDate];
        const date = stockDate.split("-");
        const month = months[+date[1] - 1];
        const year = date[0][2] + date[0][3];
        return {
          name: `${month} '${year}`,
          ...monthData
        };
      });
    };
    Object.keys(data).forEach((symbol, outInd, outArr) => {
      Object.keys(data[symbol]).reduce((prev, curr, inInd, inArr) => {
        const dateStamp = inArr[inInd];
        if (!obj[dateStamp]) {
          obj[dateStamp] = {};
        }
        obj[dateStamp][symbol] = +(data[symbol][dateStamp].price /
          data[symbol][dateStamp].count).toFixed(2);
        if (outInd === outArr.length - 1 && inInd === inArr.length - 1) {
          callback(obj);
        }
        return obj;
      }, obj);
    });
    const lines = symbols.map((symbol, ind) => {
      return (
        <Line
          key={symbol}
          type="monotone"
          dataKey={symbol}
          stroke={colors[ind % colors.length]}
        />
      );
    });
    return (
      <div className="chart">
        <LineChart
          width={700}
          height={300}
          data={newData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" stroke="#B9BDBE" />
          <YAxis stroke="#B9BDBE" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {lines}
        </LineChart>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderChart()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.stocks.data,
    symbols: state.stocks.symbols
  };
}

export default connect(mapStateToProps, actions)(Chart);
