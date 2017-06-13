import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Chart from './Chart';

class App extends Component {

	render() {
		return (
			<Container style={{ marginTop: "15px" }} textAlign="center">
				<Chart />
			</Container>
		);
	}
}

export default App;