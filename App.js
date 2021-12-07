import React from 'react'
import SignInOutContainer from './combine'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';



function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route exact path='/' element={<SignInOutContainer />} />
					<Route path='/home' element={<Dashboard />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
