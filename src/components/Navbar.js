import './Navbar.css';

export default function Navbar() {
	return (
		<nav className='nav'>
			<div className='brand'>Royal Stash</div>
			<ul>
				<li>Login</li>
				<li>Signup</li>
				<li>Logout</li>
			</ul>
		</nav>
	);
}
