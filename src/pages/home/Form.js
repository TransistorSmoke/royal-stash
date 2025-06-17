import { useState, useEffect } from 'react';
import styles from './Form.module.css';
import { useFirestore } from '../../hooks/useFirestore';

export default function Form({ uid }) {
	const [name, setName] = useState('');
	const [type, setType] = useState('others');
	const [error, setError] = useState(null);
	const { addDocument, response, fsTransactionIsPending } =
		useFirestore('recyclables');

	const addItemToStash = async (e) => {
		e.preventDefault();
		if (name.trim() === '') {
			console.log('Please enter a name for the item.');
			setError('Please enter a name for the item.');
			return;
		} else {
			await addDocument({ uid, name, type });
			setError(null);
			setName('');
			setType('others');
		}
	};

	const handleTypeChange = (e) => {
		setType(e.target.value);
	};

	console.log('fsTransactionIsPending: ', fsTransactionIsPending);
	// reset the fields when transaction is added successfully
	useEffect(() => {
		if (response.success) {
			setName('');
			setType('others');
		}
	}, [response.success]);

	return (
		<div className={styles['form-save']}>
			<h3 className={styles.title}>Add a new item to recycle</h3>
			<form onSubmit={addItemToStash}>
				<label className={styles['label-input']}>
					<span>Name:</span>
					<input
						type='text'
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
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
					<button className={styles['btn-save']} disabled>
						Add to stash
					</button>
				) : (
					<button className={styles['btn-save']}>Add to stash</button>
				)}

				{error && <p className={styles.error}>{error}</p>}
			</form>
		</div>
	);
}
