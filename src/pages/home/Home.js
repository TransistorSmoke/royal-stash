import styles from './Home.module.css';
import Form from './Form';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import Recyclables from './Recyclables';

export default function Home() {
	const { user } = useAuthContext();
	const { documents, error } = useCollection('recyclables');
	const [totalAmount, setTotalAmount] = useState(0);

	const calculateTotalAmount = (items) => {
		if (!items) {
			setTotalAmount(0);
			return;
		}

		const amount = items.length * 0.1;
		setTotalAmount(amount);
	};

	useEffect(() => {
		calculateTotalAmount(documents);
	}, [documents]);

	return (
		<div className={styles.container}>
			<div className={styles['main-content']}>
				{error && <p>{error}</p>}

				{documents && <Recyclables items={documents} />}
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
			<div className={styles['sub-content']}>This is this the group of recycled items.</div>
		</div>
	);
}
