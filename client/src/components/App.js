import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Chart from './Chart';
import Cards from './Cards';

class App extends Component {

	render() {
		return (
			<Container textAlign="center" style={{ maxWidth: "900px" }}>
				<Chart />
				<Cards />
			</Container>
		);
	}
}

export default App;