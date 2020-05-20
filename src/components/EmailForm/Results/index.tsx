import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleInputValue, selectEmail } from '../emailSlice';

const Result: React.FC = () => {
	const emailState = useSelector(selectEmail);
	const { reason, didYouMean, showResults } = emailState;
	const dispatch = useDispatch();

	const status = reason === 'accepted_email' ? 'success' : 'fail';
	const displayReason = reason?.replace(/_/, ' ');

	return (
		<div className={`result ${showResults ? 'visible' : ''}`}>
			<div className={status}>
				{status === 'success' ? '✅ ' : '❌ '}
				{displayReason}
			</div>
			{didYouMean && (
				<div
					className="did-you-mean"
					onClick={() => {
						dispatch(handleInputValue({ inputValue: didYouMean }));
					}}
				>
					Did you mean: {didYouMean}?
				</div>
			)}
		</div>
	);
};

export default Result;
