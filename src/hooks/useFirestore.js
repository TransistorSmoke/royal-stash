import { useReducer, useEffect, useState } from 'react';
import { appFirestore, timestamp } from '../firebase/config';

const initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null
};

const firestoreReducer = (state, action) => {
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

		case 'UPDATED_RECYCLABLES_STATUS':
			return {
				isPending: false,
				document: null,
				success: true,
				error: null
			};

		case 'DELETED_DOCUMENT':
			return {
				isPending: false,
				document: null,
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

	/*
	 * isCancelled
	 * TRUE if component gets destroyed/unmounted i.e. user goes to other route while transaction is currently running.
	 * FALSE if any transaction on a document is currently running.
	 */
	const [isCancelled, setIsCancelled] = useState(false);

	/*
	 * fsTransactionIsPending
	 * TRUE if any transaction starts to run. FALSE if transaction ends - either successfully or not..
	 */
	const [fsTransactionIsPending, setFsTransactionIsPending] = useState(false);
	const collectionRef = appFirestore.collection(collection);
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const addDocument = async (doc) => {
		dispatch({ type: 'IS_PENDING' });
		setFsTransactionIsPending(true);

		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await collectionRef.add({
				...doc,
				createdAt
			});

			// Uncomment prior to building/deployment
			// ---------------------------------------
			dispatchIfNotCancelled({
				type: 'ADD_DOCUMENT',
				payload: addedDocument
			});
			// ---------------------------------------

			setFsTransactionIsPending(false);
		} catch (err) {
			// Uncomment prior to building/deployment
			// ---------------------------------------
			dispatchIfNotCancelled({
				type: 'ERROR',
				payload: err.message
			});
			// ---------------------------------------

			setFsTransactionIsPending(false);
		}
	};

	const updateRecyclablesStatus = async (user) => {
		dispatch({ type: 'IS_PENDING' });
		setFsTransactionIsPending(true);

		try {
			const querySnapshot = await collectionRef
				.where('isReturned', '==', false)
				.where('uid', '==', user.uid)
				.get();
			const batch = appFirestore.batch();

			querySnapshot.forEach((doc) => {
				const docRef = collectionRef.doc(doc.id);
				batch.update(docRef, { isReturned: true });
			});

			await batch.commit();

			// Uncomment prior to building/deployment
			// ---------------------------------------
			dispatchIfNotCancelled({
				type: 'UPDATED_RECYCLABLES_STATUS'
			});
			// ---------------------------------------

			setFsTransactionIsPending(false);
		} catch (err) {
			dispatchIfNotCancelled({
				type: 'ERROR',
				payload: 'Could not update recyclables status'
			});
			setFsTransactionIsPending(false);
		}
	};

	const deleteDocument = async (id) => {
		dispatch({ type: 'IS_PENDING' });
		setFsTransactionIsPending(true);

		try {
			const docRef = collectionRef.doc(id);
			await docRef.delete();

			// Uncomment prior to building/deployment
			// ---------------------------------------
			dispatchIfNotCancelled({
				type: 'DELETED_DOCUMENT'
			});
			// ---------------------------------------

			setFsTransactionIsPending(false);
		} catch (err) {
			console.error('Error deleting document: ', err);
			dispatch({
				type: 'ERROR',
				payload: err.message
			});
			setFsTransactionIsPending(false);
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, deleteDocument, updateRecyclablesStatus, response, fsTransactionIsPending };
};
