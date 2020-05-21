import styled from 'styled-components';
import { cssVar } from '../../style';

export const StyledForm = styled.form`
	display: block;
	position: relative;
	border: none;
	border-radius: 0.5rem;
	width: 100%;
	input {
		position: relative;
		background: white;
		padding: 1rem 1rem 1rem 1.5rem;
		font-size: 1.3rem;
		border: none;
		border-radius: 0.5rem 0 0 0.5rem;
		text-align: center;
		/* 7.5rem fixed width to offset button */
		width: calc(100% - 7.5rem);
		outline: 0;
		transition: 200ms all ease;
		box-shadow: inset 0 0 0 0.1rem ${cssVar.primary};
		z-index: 3;
	}
	button {
		display: inline-block;
		position: absolute;
		right: 0;
		top: 0;
		width: 7.5rem;
		border-radius: 0 0.5rem 0.5rem 0;
		border: none;
		font-size: 1.3rem;
		padding: 1rem 1.5rem;
		background: ${cssVar.primary};
		color: white;
		text-align: center;
		user-select: none;
		box-shadow: none;
		transition: 200ms all ease;
		z-index: 3;
		&:hover {
			background: #ff8033;
			cursor: pointer;
		}
	}
	.result {
		position: absolute;
		transition: 200ms all ease;
		/* 7.5rem fixed width to offset button */
		width: calc(100% - 7.5rem);
		height: 2rem;
		left: 0;
		padding: 0 2rem;
		text-align: center;
		z-index: 1;
		.success {
			color: ${cssVar.success};
		}
		.fail {
			color: ${cssVar.error};
		}
	}
	.result {
		transform: translate3d(0, 0, 0);
		text-transform: capitalize;
		&.visible {
			transform: translate3d(0, -4rem, 0);
			.did-you-mean {
				text-transform: none;
				transform: translate3d(0, 8rem, 0);
				&:hover {
					cursor: pointer;
				}
			}
		}
	}
	.auto-complete {
		display: none;
		position: absolute;
		border-radius: 0 0 0.5rem 0.5rem;
		width: calc(100% - 7.5rem);
		left: 0;
		top: 0;
		background: white;
		transform: translate3d(0, 3.2rem, 0);
		opacity: 0;
		z-index: 2;
		&.visible {
			display: block;
			opacity: 1;
		}
		li {
			text-align: center;
			height: 3.6rem;
			line-height: 3.6rem;
			width: 100%;
			list-style: none;
			&:first-child {
				height: 4rem;
				padding-top: 0.4rem;
			}
			&:last-child {
				border-radius: 0 0 0.5rem 0.5rem;
			}
			&:hover {
				color: white;
				background: ${cssVar.primary};
				cursor: pointer;
			}
			&.selected {
				color: white;
				background: ${cssVar.primary};
			}
		}
	}
`;
