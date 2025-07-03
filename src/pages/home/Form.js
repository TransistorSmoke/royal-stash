import { useState, useEffect } from 'react';
import styles from './Form.module.css';
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';
import { generateUniqueId } from '../../utilities/utilities';

export default function Form({ uid, stashId }) {
	const [name, setName] = useState('');
	const [type, setType] = useState('others');
	const [isReturned, setIsReturned] = useState(false);
	const [error, setError] = useState(null);
	const { addDocument, response, fsTransactionIsPending } = useFirestore('recyclables');
	const { documents, error: errorRecyclables } = useCollection('recyclables');
	// const { stashId, setStashId } = useState('');

	const addItemToStash = async (e) => {
		e.preventDefault();

		/*
    	1. When saving, observe the isReturned field.
    	2. Filter items where isReturned is false.
    	3. If there are items that are not returned yet (isReturned === false), meaning they are not recycled yet,
      	generate a stash ID and assign it to each of them.
  	*/

		if (name.trim() === '') {
			console.log('Please enter a name for the item.');
			setError('Please enter a name for the item.');
			return;
		} else {
			await addDocument({ uid, name, type, isReturned, stashId });
			setError(null);
			setName('');
			setType('others');
		}
	};

	const handleTypeChange = (e) => {
		setType(e.target.value);
	};

	const resetForm = (e) => {
		e.preventDefault();
		setError(null);
		setName('');
		setType('others');
	};

	// Reset the fields when transaction is added successfully
	// Gets any unreturned recyclables at start of mounting
	useEffect(() => {
		if (response.success) {
			setName('');
			setType('others');
		}
	}, [response.success, documents]);

	return (
		<div className={styles['form-save']}>
			<h3 className={styles.title}>Add a new item to recycle</h3>
			<form onSubmit={addItemToStash}>
				<label className={styles['label-input']}>
					<span>Name:</span>
					<input type='text' onChange={(e) => setName(e.target.value)} value={name} />
				</label>
				<label>
					<span>Type:</span>
					<div className={styles['custom-select']}>
						<select value={type} onChange={handleTypeChange}>
							<option value='bottle'>bottle</option>
							<option value='can'>can</option>
							<option value='box'>box</option>
							<option value='others'>others</option>
						</select>
						<div className={styles['select-arrow']}></div>
					</div>
				</label>

				{fsTransactionIsPending ? (
					<>
						<button className='btn' disabled>
							Add to stash
						</button>
						<button className={`btn ${styles.clear}`} onClick={resetForm}>
							Clear
						</button>
					</>
				) : (
					<>
						<button className='btn'>Add to stash</button>
						<button className={`btn ${styles.clear}`} onClick={resetForm}>
							Clear
						</button>
					</>
				)}
				{error && <p className={styles.error}>{error}</p>}
			</form>
		</div>
	);
}
