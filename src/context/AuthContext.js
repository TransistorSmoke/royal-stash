import { createContext, useEffect, useReducer } from 'react';
import { appAuth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };

		case 'LOGOUT':
			return { ...state, user: null };

		case 'AUTH_IS_READY':
			return { ...state, user: action.payload, authIsReady: true };

		// case 'STASH_ID_GENERATED':
		// 	return { ...state, stashId: action.payload };

		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false
		// stashId: null
	});

	// Fires when the app first load to check if user is logged in or not
	useEffect(() => {
		const unsub = appAuth.onAuthStateChanged((user) => {
			dispatch({ type: 'AUTH_IS_READY', payload: user });

			unsub();
		});

		// if (!state.stashId) {
		// 	// Generate a unique ID for new recyclables group and use it as stash ID
		// 	const stashId = generateUniqueId();
		// 	dispatch({ type: 'STASH_ID_GENERATED', payload: stashId });
		// }
	}, []);

	console.log('AuthContext state: ', state);

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
