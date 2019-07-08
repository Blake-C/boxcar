import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './titlebar.scss'

class Titlebar extends Component {
	render() {
		return (
			<div className="titlebar">
				<div className="left-titlebar">
					<ul>
						<li>
							<Link className="button" to="/">
								Home
							</Link>
						</li>
						<li>
							<a className="button" href="/">
								Boards
							</a>
						</li>
						<li>
							<form action="">
								<label htmlFor="primary_search" className="sr">
									Search
								</label>
								<input type="text" id="primary_search" placeholder="Search" />
							</form>
						</li>
					</ul>
				</div>

				<div className="center-titlebar">
					<h1>
						<Link to="/">Boxcar</Link>
					</h1>
				</div>

				<div className="right-titlebar">
					<p>Placeholder</p>
				</div>
			</div>
		)
	}
}

export default Titlebar
