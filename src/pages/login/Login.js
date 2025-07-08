import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import styles from './login.module.css';
import InfoBar from '../../components/Infobar';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [inputFieldErrors, setInputFieldErrors] = useState('');
	const { login, error, isPending } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setInputFieldErrors('Please fill in your email and password');
		} else {
			login(email, password);
		}
	};

	return (
		<div className={styles.container}>
			<InfoBar />
			<form onSubmit={handleSubmit} className={styles.loginform}>
				<label>
					<span>Email:</span>
					<input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
				</label>
				<label>
					<span>Password:</span>
					<input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
				</label>

				{isPending ? (
					<button className='btn' disabled>
						Logging in...
					</button>
				) : (
					<button className='btn'>Login</button>
				)}

				{error && <p className={styles.error}>ERROR: {error}</p>}
				{inputFieldErrors && <p className={styles.error}>{inputFieldErrors}</p>}
			</form>
		</div>
	);
}
