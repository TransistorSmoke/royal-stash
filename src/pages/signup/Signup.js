import { useState } from 'react';
import styles from './Signup.module.css';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isPending, error, signup } = useSignup();

	const handleSignup = (e) => {
		e.preventDefault();
		console.log(displayName, email, password);
		signup(email, password, displayName);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSignup} className={styles.signupForm}>
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
				<button className='btn btn-signup'>Sign up</button>
			</form>
		</div>
	);
}
