import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Titlebar from './components/titlebar/titlebar'
import Boards from './components/boards/boards'
import 'normalize.css'

function App() {
	return (
		<div className="App">
			<Router>
				<Titlebar />

				<Route path="/" exact component={Boards} />
			</Router>
		</div>
	)
}

export default App
