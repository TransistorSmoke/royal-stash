import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';
import Footer from './components/Footer';

function App() {
	const { authIsReady, user } = useAuthContext();
	return (
		<div className='App'>
			{authIsReady && (
				<BrowserRouter>
					<Navbar />
					<main>
						<Switch>
							<Route exact path='/'>
								{!user && <Redirect to='/login' />}
								{user && <Home />}
							</Route>
							<Route path='/login'>
								{user && <Redirect to='/' />}
								{!user && <Login />}
							</Route>
							<Route path='/signup'>
								{user && <Redirect to='/' />}
								{!user && <Signup />}
							</Route>
							<Route path='*'>
								<Redirect to='/' />
							</Route>
						</Switch>
					</main>
					<Footer />
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
