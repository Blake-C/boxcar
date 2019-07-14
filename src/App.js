import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Titlebar from './components/titlebar/titlebar'
import Boards from './components/boards/boards'
import Board from './components/board/board'
import Error404 from './Error404'
import 'normalize.css'

function App() {
	return (
		<div className="app">
			<Router>
				<Titlebar />

				<Switch>
					<Route path="/" exact component={Boards} />
					<Route path="/board/:id" component={Board} />
					<Route component={Error404} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
