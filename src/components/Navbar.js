import styles from './Navbar.module.css';

export default function Navbar() {
	return (
		<nav className={styles.nav}>
			<div className={styles.brand}>Royal Stash</div>
			<ul>
				<li>Login</li>
				<li>Signup</li>
				<li>Logout</li>
			</ul>
		</nav>
	);
}
