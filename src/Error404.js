import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
	return (
		<div className="error404 container fixed">
			<h1>Error 404: No page found</h1>

			<Link className="button" to="/">
				Return Home
			</Link>
		</div>
	)
}

export default Error404
