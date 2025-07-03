import { useState } from 'react';
import styles from './Signup.module.css';
import { useSignup } from '../../hooks/useSignup';
import InfoBar from '../../components/Infobar';

export default function Signup() {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isPending, error, signup } = useSignup();
	const [inputFieldError, setInputFieldError] = useState('');

	const handleSignup = (e) => {
		e.preventDefault();
		console.log(displayName, email, password);

		if (email === '' || password === '' || displayName === '') {
			setInputFieldError('Please fill in your email, password and display name');
		} else {
			signup(email, password, displayName);
		}
	};

	return (
		<div className={styles.container}>
			<InfoBar />
			<form onSubmit={handleSignup} className={styles.signupForm}>
				<label>
					<span>Display Name:</span>
					<input type='text' onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
				</label>
				<label>
					<span>Email:</span>
					<input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
				</label>
				<label>
					<span>Password:</span>
					<input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
				</label>
				<button className='btn btn-signup'>Sign up</button>

				{error && <p className={styles.error}>{error}</p>}
				{inputFieldError && <p className={styles.error}>{inputFieldError}</p>}
			</form>
		</div>
	);
}
