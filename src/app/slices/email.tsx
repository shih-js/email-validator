import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IEmailState {
	inputValue: string;
	reason: string;
	didYouMean: string;
	showResults: boolean;
	showAutocomplete: boolean;
	matches: string[];
	username: string;
	domain: string;
	isLoading: boolean;
	suggestions: string[];
	selection: number;
}

const initialState: IEmailState = {
	inputValue: '',
	reason: '',
	didYouMean: '',
	showResults: false,
	showAutocomplete: false,
	matches: [],
	username: '',
	domain: '',
	isLoading: false,
	suggestions: ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'aol.com'],
	selection: 1,
};

export const emailSlice = createSlice({
	name: 'email',
	initialState,
	reducers: {
		handleInputValue: (state, action: PayloadAction<{ inputValue: string }>) => {
			const { inputValue } = action.payload;

			state.username = inputValue.split('@')[0];
			state.domain = inputValue.split('@')[1];
			state.selection = 1;
			state.inputValue = inputValue;
			state.showResults = false;
			state.showAutocomplete = false;
			state.matches = state.suggestions;

			if (state.domain !== '') {
				state.matches = state.suggestions?.filter((provider) => {
					const regex = new RegExp(`^${state.domain}`);
					return provider.match(regex);
				});
			}

			const hasAmpersand = inputValue.indexOf('@') > 0;
			const hasMatch = state?.matches?.length !== 0;
			const exactMatch = state.matches && state.domain === state.matches[0];

			if (hasAmpersand && hasMatch && !exactMatch) {
				state.showAutocomplete = true;
			}
		},
		toggleLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		updateResponse: (state, action: PayloadAction<{ reason: string; didYouMean: string }>) => {
			const { reason, didYouMean } = action.payload;
			state.reason = reason;
			state.didYouMean = didYouMean;
			state.showResults = true;
		},
		updateSelection: (state, action: PayloadAction<{ move: number; reset?: boolean }>) => {
			const { move, reset } = action.payload;
			reset ? (state.selection = 0) : (state.selection += move);
		},
	},
});

export const {
	handleInputValue,
	toggleLoading,
	updateResponse,
	updateSelection,
} = emailSlice.actions;

export const validateEmailAsync = createAsyncThunk(
	'email/validateEmailAsync',
	async (email: string, thunkAPI) => {
		const response = await fetch('http://localhost:3030/validate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email }),
		})
			.then((response) => response.json())
			.then((data) => {
				const { reason, did_you_mean } = data;
				return { reason, didYouMean: did_you_mean };
			});
		return response;
	}
);

export const selectEmail = (state: RootState) => state.email;

export default emailSlice.reducer;
