import styles from './TotalAmount.module.css';

export default function TotalAmount({ amount, children }) {
	return (
		<div className={styles['total-amount-container']}>
			<span>{children}</span>
			<h1 className={styles['total-amount']}>${amount.toFixed(2)}</h1>
		</div>
	);
}
