import { formatDate } from '../../utilities/utilities';
import styles from './Stash.module.css';

export default function RecyclableStash({ stash, user }) {
	return (
		<>
			{stash?.map((item) => (
				<div className={styles.stash} key={item?.id}>
					<div className={styles['stash-id']}>
						<p className={styles['weight-strong']}>
							Stash #
							{item && item.stashId && (
								<span className={`${styles.emphasis} ${styles.highlight}`}>
									{item?.stashId ? item.stashId : ''}
								</span>
							)}
						</p>
					</div>
					<div className={styles.user}>
						<p>
							Dropped for recycling by <span className={styles.emphasis}>{user}</span> on{' '}
							<span className={styles.emphasis}>{formatDate(item?.createdAt)}</span>
						</p>
					</div>
					<div className={styles.amount}>
						<p>
							<span className={`${styles.emphasis} ${styles.highlight}`}>${item?.totalAmt}</span> REFUNDED
						</p>
					</div>
				</div>
			))}
		</>
	);
}
