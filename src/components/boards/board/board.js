import React from 'react'
import { Link } from 'react-router-dom'

function Board(props) {
	const boards_list = props.featured
		? props.data.filter(board => board.featured)
		: props.data.filter(board => !board.featured)

	const featuredClass = props.featured ? 'featured' : ''

	return (
		<React.Fragment>
			<h1>{props.title}</h1>

			<div className={`boards ${featuredClass}`}>
				{boards_list.map(board => {
					const style = {
						backgroundImage: `url(/assets/images/${board.backgroundImage})`,
					}

					const item = (
						<Link to={`/board/${board.id}`} key={board.id}>
							<div className="board cover" style={style}>
								<h2>{board.title}</h2>
							</div>
						</Link>
					)

					return item
				})}
			</div>
		</React.Fragment>
	)
}

export default Board
