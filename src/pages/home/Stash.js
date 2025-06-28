import { useState } from 'react';
import { formatDate } from '../../utilities/utilities';
import styles from './Stash.module.css';

export default function RecyclableStash({ stash, user }) {
	/*
    -----------------------
    4. For next feature, for those returned items (isReturned === true), map them by group (by their return dates),
      and assign a stash ID for each of them. And save.
      4.1. Add a button in the Stashs section in the Home page.
    -----------------------

  */

	return (
		<>
			{stash?.map((item) => (
				<div className={styles.stash} key={item?.id}>
					<div className={styles['stash-id']}>GROUP ID: --ID HERE--</div>
					<div className={styles.user}>
						<p>
							Dropped for recycling by <span className={styles.emphasis}>{user}</span> on{' '}
							<span className={styles.emphasis}>{formatDate(item?.createdAt)}</span>
						</p>
					</div>
					<div className={styles.amount}>
						<p>
							<span className={`${styles.emphasis} ${styles['amount-highlight']}`}>
								${item?.totalAmt}
							</span>{' '}
							REFUNDED
						</p>
					</div>
				</div>
			))}
		</>
	);
}
