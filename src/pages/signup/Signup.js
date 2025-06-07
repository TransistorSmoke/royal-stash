import { useState } from 'react';
import styles from './Signup.module.css';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');

	const hadnleSignup = (e) => {
		e.preventDefault();
	};

	return (
		<div className={styles.container}>
			<form onSubmit={hadnleSignup}>
				<label>
					<span>Display Name:</span>
					<input
						type='text'
						onChange={(e) => setDisplayName(e.target.value)}
						value={displayName}
					/>
				</label>
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
				<button className='btn'>Sign up</button>
			</form>
		</div>
	);
}
