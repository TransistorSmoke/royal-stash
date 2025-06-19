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
	const { documents, error } = useCollection('recyclables');
	const { addDocument, response, fsTransactionIsPending } = useFirestore('stash');
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

	const saveRecyclesAsGroup = async (items) => {
		const itemsGroup = items?.map((item) => ({
			id: item.id,
			name: item.name
		}));

		const totalAmt = calculateTotalAmount(itemsGroup)?.toFixed(2);

		if (itemsGroup && itemsGroup.length > 0) {
			await addDocument({
				uid: user.uid,
				item: itemsGroup,
				totalAmt
			});
		}
	};

	useEffect(() => {
		calculateTotalAmount(documents);
	}, [documents]);

	return (
		<div className={styles.container}>
			<div className={styles['main-content']}>
				{error && <p>{error}</p>}

				{documents && (
					<>
						<h1 className={styles['title-current-stash']}>Current Recyclable Stash</h1>
						<Recyclables items={documents} />
						<div className={styles.action}>
							<button
								className={`btn ${styles['btn-drop']}`}
								onClick={() => saveRecyclesAsGroup(documents)}
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
				<Stash />
			</div>
		</div>
	);
}
