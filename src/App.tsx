import React from 'react';
import { GlobalStyle, Container } from './style';
import EmailForm from './components/EmailForm';

function App() {
	return (
		<>
			<GlobalStyle />
			<Container>
				<EmailForm />
			</Container>
		</>
	);
}

export default App;
