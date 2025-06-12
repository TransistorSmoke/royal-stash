import styles from './Home.module.css';
import Form from './Form';

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles['main-content']}>main content</div>
			<div className={styles.sidebar}>
				<Form />
			</div>
		</div>
	);
}
