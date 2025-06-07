import { useState } from 'react';
import styles from './login.module.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleLogin}>
				<label>
					<span>Email:</span>
					<input
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</label>
				<label>
					<span>Password:</span>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</label>
				<button className='btn'>Login</button>
			</form>
		</div>
	);
}
