import { useState, useEffect, useRef } from 'react';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setIsPending(true);

		try {
			const res = await appAuth.signInWithEmailAndPassword(
				email,
				password
			);

			/*
			 *
			 * Uncomment commented sections before building/deployment and remove the lines of codes after the commented ones
			 *
			 */

			// if (!isCancelled) {
			// 	dispatch({ type: 'LOGIN', payload: res.user });
			// 	setError(null);
			// 	setIsPending(false);
			// 	// dispatch the logain action
			// }
			dispatch({ type: 'LOGIN', payload: res.user });
			setError(null);
			setIsPending(false);
		} catch (err) {
			// if (!isCancelled) {
			// 	console.log(err.message);
			// 	setError(err.message);
			// 	setIsPending(false);
			// }

			const e = JSON.parse(err.message);

			if (e.error.message === 'INVALID_LOGIN_CREDENTIALS') {
				setError('Invalid login credentials');
			} else {
				setError(e.error.message);
			}
			setIsPending(false);
		}
	};

	// useEffect(() => {
	// 	return () => setIsCancelled(true);
	// }, []);

	return { login, error, isPending };
};
