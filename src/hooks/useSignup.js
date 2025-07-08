import { useState, useEffect } from 'react';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName) => {
		setError(null);
		setIsPending(true);

		try {
			const response = await appAuth.createUserWithEmailAndPassword(email, password);

			if (!response) {
				throw new Error('Could not complete signup process');
			}

			await response.user.updateProfile({ displayName });
			dispatch({ type: 'LOGIN', payload: response.user });
			setIsPending(false);
			setError(null);
		} catch (err) {
			if (!isCancelled) {
				const e = JSON.parse(err.message);
				setError(e.message);
				setIsPending(false);
			}
		}
	};

	// Cancels state change when attempting to move to another route while sign up is in process
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { error, isPending, signup };
};
