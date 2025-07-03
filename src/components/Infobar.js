import styles from './Infobar.module.css';
import bottle from '../assets/bottle.png';

export default function InfoBar() {
	return (
		<div className={styles.container}>
			<img src={bottle} alt='bottle for recycling' className={styles.bottle} />
			<p className={styles.info}>
				Here in NSW, a 10c refund is offered for every eligible item (drink container, bottle, can, box, etc)
				dropped at selected return (recycling) points. This app is used to record each item that gets saved and
				dropped for recycling, calculating the amount you will get for your recycling effort.
			</p>
		</div>
	);
}
