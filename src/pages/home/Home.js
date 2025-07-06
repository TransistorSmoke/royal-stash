import styles from './Home.module.css';
import Form from './Form';
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import TotalAmount from './TotalAmount';
import Recyclables from './Recyclables';
import Loading from '../../components/Loading';
import Stash from './Stash';
import Dialog from '../../components/Dialog';
import { generateUniqueId, deleteToastSettings as settings } from '../../utilities/utilities';
import emptyRecycling from '../../assets/bottle-plastic-recycling.png';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
	const { user } = useAuthContext();
	const { documents: recyclables, error: errorRecyclables } = useCollection(
		'recyclables',
		['uid', '==', user.uid],
		['createdAt', 'desc']
	);
	const { documents: stash, error: errorStash } = useCollection('stash', ['uid', '==', user.uid]);
	const {
		addDocument: addStash,
		response: responseStash,
		fsTransactionIsPending: fsTransactionIsPendingStash
	} = useFirestore('stash');
	const {
		updateRecyclablesStatus,
		response: responseRecyclables,
		fsTransactionIsPending: fsTransactionIsPendingRecyclables
	} = useFirestore('recyclables');
	const [totalAmount, setTotalAmount] = useState(0);
	const [unrecycledItems, setUnrecycledItems] = useState([]);
	const [stashId, setStashId] = useState(null);
	const [totalStashRefundAmount, setTotalStashRefundAmount] = useState(0);
	const [dgPropItemToDelete, setDgPropItemToDelete] = useState({});

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
					totalAmt,
					stashId
				});
			} catch (err) {
				console.error('Error saving recyclables as group:', err);
			}
		}
	};

	const dialogRef = useRef(null);
	const showDeleteDialogHandler = (arg) => {
		console.log('Invoked from Home component: ', arg);
		if (dialogRef.current && !dialogRef.current.open) {
			dialogRef.current.showModal();
			setDgPropItemToDelete(arg);
		}
	};

	const showDialogProcessCompleteToast = (isSuccess) => {
		console.log('is success: ', isSuccess);

		if (isSuccess) {
			toast.success('Item deleted successfully!', settings);
		} else {
			toast.error('Error deleting item', settings);
		}
	};

	/*
	 * HOME component on mount/re-render logic
	 * ----------------------------------------
	 */
	useEffect(() => {
		const unreturnedForRecycling = recyclables?.filter((item) => !item.isReturned);
		setUnrecycledItems(unreturnedForRecycling);
		calculateTotalAmount(unreturnedForRecycling);

		if (unreturnedForRecycling && unreturnedForRecycling.length === 0) {
			setStashId(generateUniqueId());
		} else {
			const itemWithId = unrecycledItems?.find((item) => item.stashId);
			setStashId(itemWithId?.stashId);
		}

		const totalRefundedAmount = stash?.reduce((sum, item) => sum + parseFloat(item.totalAmt), 0);
		setTotalStashRefundAmount(totalRefundedAmount);

		/*
		-------
		PROCESS
		-------
		- If forRecycling is not empty (there are items in it!), check if there is stash ID for each of item.
			- If any one of them has a stash ID, use it as stash ID for the current item.

			- If there are items that have no stash ID:
				- Group each of these by their RETURN/DROP OFF DATE.
				- Add a stash ID to each item of these groups.

		- Else
			- If there is no unreturned recyclables, we have a new batch of recyclables.
			- Therefore, generate a new unique stash ID for a new group of items.
		*/
	}, [recyclables, totalAmount, stash]);
	/* -------End of mounting/rerender logic ----------------- */

	return (
		<div className={styles.container}>
			<Dialog ref={dialogRef} item={dgPropItemToDelete} toastMessageHandler={showDialogProcessCompleteToast} />
			<div className={styles['main-content']}>
				{errorRecyclables && <p>{errorRecyclables}</p>}

				<div className={styles.header}>
					<h1 className={styles['title-current-stash']}>Current Recyclable Stash</h1>
					<span className={styles.groupNum}>
						<p>
							STASH# <span className={styles.id}>{stashId}</span>
						</p>
					</span>
				</div>

				{!recyclables && (
					<div className={styles['loading-section']}>
						<Loading />
					</div>
				)}

				{recyclables && !errorRecyclables && (
					<>
						{unrecycledItems && unrecycledItems.length > 0 ? (
							<>
								<Recyclables items={unrecycledItems} dialogHandler={showDeleteDialogHandler} />
								<div className={styles.action}>
									<button
										className={`btn ${styles['btn-drop']}`}
										onClick={() => saveRecyclablesAsGroup(unrecycledItems)}
									>
										Drop For Recycling
									</button>
								</div>
							</>
						) : (
							<div className={styles.notification}>
								<h3>You do not have any item to recycle. Start collecting now.</h3>
							</div>
						)}
					</>
				)}
			</div>

			{/* <div className={styles.sidebar}> */}
			<div className={`sidebar ${styles.sidebar}`}>
				<div className={styles.amount}>
					<h2>Total Amount</h2>
					<TotalAmount amount={totalAmount} />
					<p className={styles['']}>Total refund for all items in current recyclable group</p>
				</div>
				<div className={styles.divider}></div>
				<Form uid={user.uid} stashId={stashId} />
			</div>

			<div className={styles['sub-content']}>
				<div className={styles['stash-header']}>
					<h1>Recycling History</h1>
				</div>

				{!stash && (
					<div className={styles['loading-section']}>
						<Loading />
					</div>
				)}

				{stash && totalStashRefundAmount > 0 && (
					<div className={styles['section-refund']}>
						<p className={styles['refund-notification']}>
							Congratulations! You earned a total of
							<span className={styles.total}>${totalStashRefundAmount.toFixed(2)}</span> from recycling.
						</p>
					</div>
				)}

				{stash ? (
					stash.length > 0 ? (
						<Stash stash={stash} user={user.displayName} />
					) : (
						<div className={styles['notif-empty']}>
							<img src={emptyRecycling} alt='pplstic bottle recycling' />
							<h3>You have not dropped any group of recyclables to a recycling kiosk.</h3>
						</div>
					)
				) : (
					''
				)}
			</div>
			<ToastContainer transition={Bounce} />
		</div>
	);
}
