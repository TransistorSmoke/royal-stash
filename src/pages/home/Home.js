import styles from './Home.module.css';
import Form from './Form';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import Recyclables from './Recyclables';
import Stash from './Stash';

export default function Home() {
	const { user } = useAuthContext();
	const { documents: recyclables, error: errorRecyclables } = useCollection('recyclables');
	const { documents: stash, error: errorStash } = useCollection('stash');
	const {
		addDocument: addStash,
		response: responseStash,
		fsTransactionIsPending: fsTransactionIsPendingStash
	} = useFirestore('stash');
	const {
		addDocument: addRecyclables,
		updateRecyclablesStatus,
		response: responseRecyclables,
		fsTransactionIsPending: fsTransactionIsPendingRecyclables
	} = useFirestore('recyclables');

	const [totalAmount, setTotalAmount] = useState(0);

	const calculateTotalAmount = (items) => {
		if (!items) {
			setTotalAmount(0);
			return;
		}

		const amount = items.length * 0.1;
		setTotalAmount(amount);
		return amount;
	};

	const saveRecyclablesAsGroup = async (items) => {
		const itemsGroup = items?.map((item) => ({
			id: item.id,
			name: item.name
		}));

		const totalAmt = calculateTotalAmount(itemsGroup)?.toFixed(2);

		if (itemsGroup && itemsGroup.length > 0) {
			try {
				await updateRecyclablesStatus();
				await addStash({
					uid: user.uid,
					item: itemsGroup,
					totalAmt
				});
			} catch (err) {
				console.error('Error saving recyclables as group:', err);
			}
		}
	};

	useEffect(() => {
		calculateTotalAmount(recyclables);
	}, [recyclables]);

	return (
		<div className={styles.container}>
			<div className={styles['main-content']}>
				{errorRecyclables && <p>{errorRecyclables}</p>}

				{recyclables && (
					<>
						<h1 className={styles['title-current-stash']}>Current Recyclable Stash</h1>
						<Recyclables items={recyclables} />
						<div className={styles.action}>
							<button
								className={`btn ${styles['btn-drop']}`}
								onClick={() => saveRecyclablesAsGroup(recyclables)}
							>
								Drop For Recycling
							</button>
						</div>
					</>
				)}
			</div>
			<div className={styles.sidebar}>
				<div className={styles['total-amount']}>
					<h2>Total Amount</h2>
					<h1>${totalAmount.toFixed(2)}</h1>
					<p className={styles['']}>Total refund for all items in current recyclable group</p>
				</div>
				<div className={styles.divider}></div>
				<Form uid={user.uid} />
			</div>
			<div className={styles['sub-content']}>
				<Stash stash={stash} user={user.displayName} />
			</div>
		</div>
	);
}
