import { forwardRef } from 'react';
import styles from './Dialog.module.css';
import deleteIcon from '../assets/delete-orange.png';

const Dialog = forwardRef(function Dialog(props, ref) {
	return (
		<dialog ref={ref}>
			<div className={styles.content}>
				<p className={styles.message}>
					<img src={deleteIcon} alt='orange garbage bin' className={styles.icon} />
					Are you sure you want to delete this entry?
				</p>
				<br />
				<form method='dialog'>
					<button className={`btn ${styles['btn-dialog']}`}>Close</button>
				</form>
			</div>
		</dialog>
	);
});

export default Dialog;
