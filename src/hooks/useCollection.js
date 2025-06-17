import { useState, useEffect } from 'react';
import { appFirestore } from '../firebase/config';

export const useCollection = (collection) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let ref = appFirestore.collection(collection);
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
				setError(
					`'Could not fetch data from ${collection} collection'`
				);
			}
		);

		//Unsubscribe
		return () => unsubscribe();
	}, [collection]);

	return { documents, error };
};
