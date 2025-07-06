import { forwardRef, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import styles from './Dialog.module.css';
import deleteIcon from '../assets/delete-orange.png';

const Dialog = forwardRef(function Dialog({ item, processCompleteHandler }, ref) {
	const { deleteDocument } = useFirestore('recyclables');
	const [isSuccess, setIsSuccess] = useState(false);

	const confirmDelete = () => {
		console.log(item.name, item.id);

		try {
			if (item && item.id) {
				setIsSuccess(true);
				deleteDocument(item.id);
				console.log('setting isSuccess: ', isSuccess);
				processCompleteHandler(isSuccess);
			}
		} catch (err) {
			setIsSuccess(false);
			processCompleteHandler(isSuccess);
		}
	};

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
					<button
						className={`${styles['btn-dialog']} ${styles.confirm}`}
						value='confirm'
						onClick={confirmDelete}
					>
						Confirm
					</button>
				</form>
			</div>
		</dialog>
	);
});

export default Dialog;
