import { useState, useEffect, useRef, useMemo } from 'react';
import { appFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy = null) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

	/*
		_query (and _orderBy) is recreated every render, causing the trigger of use effect (as _query/_orderBy is a dependency array).

		Both _query and _orderBy ar arrays and are 'different' with every render.

		It causes infinite re-rendering.
		With useRef, we can 'place this _query in a "box"', and and save it to a variable `query`, which we now use as a dependency array.

		So although _query gets recreated every render, 'query' effectively does not, fixing the infinite rerendering problem.

	*/

	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	if (collection === 'recyclables') {
		console.log('order  by - recyclables: ', orderBy);
	} else {
		console.log('order  by - stash: ', orderBy);
	}

	useEffect(() => {
		let ref = appFirestore.collection(collection);

		if (query) {
			ref = ref.where(...query);
		}

		if (orderBy) {
			ref = ref.orderBy(...orderBy);
		}

		// onSnapshot - listens for real-time updates to the collection
		// 'snapshop' is a snapshot of the collection at the time of the call
		const unsubscribe = ref.onSnapshot(
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id });
				});

				setDocuments(results);
				setError(null);
			},
			(err) => {
				console.log(err);
				setError(`'Could not fetch data from ${collection} collection'`);
			}
		);

		//Unsubscribe
		return () => unsubscribe();
	}, [collection, query, orderBy]);

	return { documents, error };
};
