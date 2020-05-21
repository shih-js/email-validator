import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	handleInputValue,
	toggleLoading,
	updateResponse,
	updateSelection,
	selectEmail,
	validateEmailAsync,
} from '../../app/slices/email';

import { StyledForm } from './style';
import Results from './Results';
import Autocomplete from './Autocomplete';

const EmailForm: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const emailState = useSelector(selectEmail);
	const { inputValue, isLoading, selection, showAutocomplete, matches, username } = emailState;
	const dispatch = useDispatch();

	// Autofocus on input when component loads.
	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

	// Handles logic for loading, autocompletion and
	// validation when user submits the form.
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let emailResponse: any = {};
		let emailValue: string = '';

		if (showAutocomplete) {
			emailValue = `${username}@${matches[selection - 1]}`;
			dispatch(handleInputValue({ inputValue: emailValue }));
		} else {
			emailValue = inputValue;
		}

		dispatch(toggleLoading());
		emailResponse = await dispatch(validateEmailAsync(emailValue));

		const { reason, didYouMean } = emailResponse.payload;
		dispatch(updateResponse({ reason, didYouMean }));
		dispatch(toggleLoading());
	};

	// Updates the text value as the user types inside input element.
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(handleInputValue({ inputValue: e.currentTarget.value }));
	};

	// Handles selection of autocomplete items
	// when user uses the up and down arrow
	const handleSelection = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		const isKeyDown = key === 'ArrowDown';
		const isKeyUp = key === 'ArrowUp';

		// If the key pressed isnt down or up.
		// Immediately exit function
		if (!isKeyDown && !isKeyUp) return;

		const MIN = 1;
		const MAX = matches?.length || 1;

		if (showAutocomplete) {
			if (isKeyDown && selection < MAX) {
				dispatch(updateSelection({ move: 1 }));
			} else if (isKeyUp && selection > MIN) {
				dispatch(updateSelection({ move: -1 }));
			}
		} else {
			dispatch(updateSelection({ move: 0, reset: true }));
		}
	};

	return (
		<StyledForm onSubmit={(e) => handleSubmit(e)}>
			<Results />
			<input
				ref={inputRef}
				type="text"
				placeholder="email"
				value={inputValue}
				onChange={(e) => handleChange(e)}
				onKeyDown={(e) => handleSelection(e)}
			/>
			<button type="submit">{isLoading ? '...' : 'submit'}</button>
			<Autocomplete />
		</StyledForm>
	);
};

export default EmailForm;
