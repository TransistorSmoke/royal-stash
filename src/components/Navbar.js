import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './Navbar.module.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<nav className={styles.nav}>
			<div className={styles.brand}>Royal Stash</div>
			<ul>
				{!user && (
					<>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/signup'>Signup</Link>
						</li>
					</>
				)}

				{user && (
					<>
						<li>Hello, {user.displayName}</li>
						<li>
							<button className='btn' onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
