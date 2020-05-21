import styled, { createGlobalStyle } from 'styled-components';

export const cssVar = {
	primary: '#FF5722',
	background: '#E9EBEE',
	text: '#3C382E',
	error: '#F30F0F',
	success: '#22CC31',
};

export const Container = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100vh;
	max-width: 40rem;
	margin: 0 auto;
	padding: 0 2rem;
`;

export const GlobalStyle = createGlobalStyle`
	*, *:before, *:after {
		box-sizing: border-box !important;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
		padding: 0;
	}
	::selection {
		color: white;
		background: ${cssVar.primary};
	}
	::placeholder {
		user-select: none;
	}
	html {
		font-size: 10px;
		overflow: scroll;
	}
	body {
		background: ${cssVar.background};
		color: ${cssVar.text};
		font-size: 1.3rem;
	}
`;
