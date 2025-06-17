import { useState, useEffect } from 'react';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			await appAuth.signOut();

			// if (!isCancelled) {
			// 	dispatch({ type: 'LOGOUT' });
			// 	setIsPending(false);
			// 	setError(null);
			// }
			dispatch({ type: 'LOGOUT' });
			setIsPending(false);
			setError(null);
		} catch (err) {
			// if (!isCancelled) {
			// 	console.log(err.message);
			// 	setError(err.message);
			// 	setIsPending(false);
			// }
			console.log(err.message);
			setError(err.message);
			setIsPending(false);
		}
	};

	// useEffect(() => {
	// 	return () => setIsCancelled(true);
	// }, []);

	return { logout, error, isPending };
};
