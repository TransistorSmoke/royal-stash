import { useReducer, useEffect, useState } from 'react';
import { appFirestore, timestamp } from '../firebase/config';

const initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null
};

const firestoreReducer = (state, action) => {
	// console.log('action passed: ', action);
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
	const [isCancelled, setIsCancelled] = useState(false);
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

	const updateRecyclablesStatus = async () => {
		try {
			const querySnapshot = await collectionRef.where('isReturned', '==', false).get();
			const batch = appFirestore.batch();

			querySnapshot.forEach((doc) => {
				const docRef = collectionRef.doc(doc.id);
				batch.update(docRef, { isReturned: true });
			});

			await batch.commit();

			// Uncomment prior to building/deployment
			// ---------------------------------------
			// dispatchIfNotCancelled({
			// 	type: 'UPDATED_RECYCLABLES_STATUS',
			// });
			// ---------------------------------------

			// Remove prior to building/deployment
			// ---------------------------------------
			dispatch({ type: 'UPDATED_RECYCLABLES_STATUS' });
			// ---------------------------------------
		} catch (err) {
			console.log(err);
			dispatchIfNotCancelled({
				type: 'ERROR',
				payload: 'Could not update recyclables status'
			});
		}
	};

	const deleteDocument = async (id) => {
		dispatch({ type: 'IS_PENDING' });
		try {
			console.log('Ready to delete document with id: ', id);
			const docRef = collectionRef.doc(id);
			await docRef.delete();

			// Uncomment prior to building/deployment
			// ---------------------------------------
			// dispatchIfNotCancelled({
			// 	type: 'DELETED_DOCUMENT'
			// });
			// ---------------------------------------

			// Remove prior to building/deployment
			// ---------------------------------------
			dispatch({ type: 'DELETED_DOCUMENT' });
			// ---------------------------------------
			console.log('Document deleted successfully');
		} catch (err) {
			console.error('Error deleting document: ', err);
		}
	};

	// -----------------

	// useEffect(() => {
	// 	return () => setIsCancelled(true);
	// }, []);

	return { addDocument, deleteDocument, updateRecyclablesStatus, response, fsTransactionIsPending };
};
