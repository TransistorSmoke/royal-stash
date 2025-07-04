import { forwardRef } from 'react';
import styles from './Dialog.module.css';
import deleteIcon from '../assets/delete-orange.png';

const Dialog = forwardRef(function Dialog({ item }, ref) {
	return (
		<dialog ref={ref}>
			<div className={styles.content}>
				<p className={styles.message}>
					<img src={deleteIcon} alt='orange garbage bin' className={styles.icon} />
					<strong>
						{item.id} - {item.name}
					</strong>
				</p>
				<p>Are you sure you want to delete this item?</p>
				<br />
				<form method='dialog'>
					<button className={`${styles['btn-dialog']} ${styles.close}`}>Close</button>
					<button className={`${styles['btn-dialog']} ${styles.confirm}`} value='confirm'>
						Confirm
					</button>
				</form>
			</div>
		</dialog>
	);
});

export default Dialog;
