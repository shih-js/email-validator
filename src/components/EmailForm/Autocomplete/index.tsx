import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleInputValue, selectEmail } from '../emailSlice';

const Autocomplete: React.FC = () => {
	const emailState = useSelector(selectEmail);
	const { showAutocomplete, matches = [], username, selection } = emailState;
	const dispatch = useDispatch();

	return (
		<ul className={`auto-complete ${showAutocomplete ? 'visible' : ''}`}>
			{matches.map((match: string, index: number) => {
				const selected = selection === index + 1 ? true : false;

				return (
					<li
						key={index}
						onClick={(e) => {
							dispatch(
								handleInputValue({
									inputValue: `${username + e.currentTarget.innerText}`,
									showAutocomplete: false,
								})
							);
						}}
						className={selected ? 'selected' : ''}
					>
						{`@${match}`}
					</li>
				);
			})}
		</ul>
	);
};

export default Autocomplete;
