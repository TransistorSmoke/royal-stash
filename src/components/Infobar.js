import styles from './Infobar.module.css';
import bottle from '../assets/bottle.png';

export default function InfoBar() {
	return (
		<div className={styles.container}>
			<img src={bottle} alt='bottle for recycling' className={styles.bottle} />
			<div className={styles.info}>
				<p>
					In selected states/teritories here in Australia, a 10c refund is offered for every eligible item
					(drink container, bottle, can, box, etc) dropped at selected return (recycling) points.
				</p>
				<p>
					This app is used to record each item that gets saved and dropped for recycling, calculating the
					amount user gets for recycling effort. It also records the recycling (drop-off) history that the
					user has done over a period of time.
				</p>
			</div>
		</div>
	);
}
