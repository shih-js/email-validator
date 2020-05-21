import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleInputValue, selectEmail } from '../../../app/slices/email';

const Autocomplete: React.FC = () => {
	const emailState = useSelector(selectEmail);
	const { showAutocomplete, matches = [], username, selection } = emailState;
	const dispatch = useDispatch();

	return (
		<ul className={`auto-complete ${showAutocomplete ? 'visible' : ''}`}>
			{matches.map((match: string, index: number) => {
				const isSelected = selection === index + 1 ? true : false;

				return (
					<li
						key={index}
						onClick={(e) => {
							const inputValue = `${username + e.currentTarget.innerText}`;
							dispatch(handleInputValue({ inputValue }));
						}}
						className={isSelected ? 'selected' : ''}
					>
						{`@${match}`}
					</li>
				);
			})}
		</ul>
	);
};

export default Autocomplete;
