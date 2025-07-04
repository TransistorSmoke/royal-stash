import loading from '../assets/loading.gif';
import styles from './Loading.module.css';

export default function Loading() {
	return <img src={loading} alt='loading content' className={styles.loading} />;
}
