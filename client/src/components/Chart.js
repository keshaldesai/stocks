import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as actions from '../actions';
import { connect } from 'react-redux';

const colors = ['#F44336', '#FFC107', '#E91E63', '#009688', '#9C27B0', '#2196F3', '#673AB7', '#3F51B5'];

function convertMonth(monthNum) {
	var month = [
		"JAN", "FEB", "MAR", "APR", "MAY", "JUN",
		"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
	];
	return month[parseInt(monthNum, 10) - 1];
}

class Chart extends Component {
	componentWillMount() {
		this.props.getData().then(() => {
		});
	}
	renderChart() {
		const { data, symbols } = this.props;
		if (!data) {
			return <Loader active />
		}
		let newData = [];
		Object.keys(data).forEach((time, outInd, outArr) => {
			const dateInfo = time.split('-');
			const name = `${convertMonth(dateInfo[1])} '${dateInfo[0][2]}${dateInfo[0][3]}`;
			const obj = { name };
			Object.keys(data[time]).forEach((symbol, inInd, inArr) => {
				obj[symbol] = parseFloat((data[time][symbol].price / data[time][symbol].count).toFixed(2));
				if (outInd === outArr.length - 1 && inInd === inArr.length - 1) {
					newData.push(obj);
				}
			});
			newData.push(obj);
		});
		const lines = symbols.map((symbol, ind) => {
			return <Line key={symbol} type="monotone" dataKey={symbol} stroke={colors[ind % colors.length]} />
		});
		return (
			<LineChart width={700} height={300} data={newData}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<XAxis dataKey="name" stroke="#B9BDBE" />
				<YAxis stroke="#B9BDBE" />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Legend />
				{lines}
			</LineChart>
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
	}
}

export default connect(mapStateToProps, actions)(Chart);