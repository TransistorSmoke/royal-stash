import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './Navbar.module.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<nav className={styles.nav}>
			<div className={styles.brand}>
				<Link to='/'>
					<img src={logo} alt='logo of royal stash' className={styles.logo} />
				</Link>
			</div>
			<ul>
				{!user && (
					<>
						<li>
							<span className={styles.navlink}>
								<Link to='/login'>Login</Link>
							</span>
						</li>
						<li>
							<span className={styles.navlink}>
								<Link to='/signup'>Signup</Link>
							</span>
						</li>
					</>
				)}

				{user && (
					<>
						<li className={styles.greeting}>
							<p className={styles.text}>
								Welcome, <span className={styles.name}>{user.displayName}</span>!
							</p>
						</li>
						<li>
							<button className={`btn ${styles.logout}`} onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
