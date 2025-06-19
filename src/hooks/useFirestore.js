import { useReducer, useEffect, useState } from 'react';
import { appFirestore, timestamp } from '../firebase/config';

const initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null
};

const firestoreReducer = (state, action) => {
	console.log('action passed: ', action);
	switch (action.type) {
		case 'IS_PENDING':
			return {
				isPending: true,
				document: null,
				success: false,
				error: null
			};
		case 'ADD_DOCUMENT':
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null
			};
		case 'ERROR':
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);
	const [fsTransactionIsPending, setFsTransactionIsPending] = useState(false);
	const collectionRef = appFirestore.collection(collection);
	const dispatchIfNotCancelled = (action) => {
		console.log('isCancelled', isCancelled);
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const addDocument = async (doc) => {
		// dispatch({ type: 'IS_PENDING' });
		console.log('addDocument called with doc: ', doc);
		setFsTransactionIsPending(true);

		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await collectionRef.add({
				...doc,
				createdAt
			});

			console.log('addedDocument: ', addedDocument);
			// Uncomment prior to building/deployment
			// ---------------------------------------
			// dispatchIfNotCancelled({
			// 	type: 'ADD_DOCUMENT',
			// 	payload: addedDocument
			// });
			// ---------------------------------------

			// Remove prior to building/deployment
			// ---------------------------------------
			dispatch({
				type: 'ADD_DOCUMENT',
				payload: addedDocument
			});
			setFsTransactionIsPending(false);
			// ---------------------------------------
		} catch (err) {
			// Uncomment prior to building/deployment
			// ---------------------------------------
			// dispatchIfNotCancelled({
			// 	type: 'ERROR',
			// 	payload: err.message
			// });
			// ---------------------------------------

			// Remove prior to building/deployment
			// ---------------------------------------
			dispatch({
				type: 'ERROR',
				payload: err.message
			});
			setFsTransactionIsPending(false);
			// ---------------------------------------
		}
	};

	// useEffect(() => {
	// 	return () => setIsCancelled(true);
	// }, []);

	return { addDocument, response, fsTransactionIsPending };
};
