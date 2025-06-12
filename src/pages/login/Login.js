import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import styles from './login.module.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [inputFieldErrors, setInputFieldErrors] = useState('');
	const { login, error, isPending } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(error);

		if (email === '' || password === '') {
			setInputFieldErrors('Please fill in your email and password');
		} else {
			login(email, password);
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
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

				{isPending ? (
					<button className='btn' disabled>
						Login
					</button>
				) : (
					<button className='btn'>Login</button>
				)}

				{error && <p className={styles.error}>ERROR: {error}</p>}
				{inputFieldErrors && (
					<p className={styles.error}>{inputFieldErrors}</p>
				)}
			</form>
		</div>
	);
}
