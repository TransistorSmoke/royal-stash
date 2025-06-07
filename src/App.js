import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/signup'>
						<Signup />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
