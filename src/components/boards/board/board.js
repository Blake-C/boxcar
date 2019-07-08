import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Board extends Component {
	render() {
		const boards = this.props.data

		const boards_list = this.props.featured
			? boards.filter(board => board.featured)
			: boards.filter(board => !board.featured)

		const featuredClass = this.props.featured ? 'featured' : ''

		return (
			<React.Fragment>
				<h1>{this.props.title}</h1>

				<div className={`boards ${featuredClass}`}>
					{boards_list.map(board => {
						const style = {
							backgroundImage: `url(/assets/images/${board.backgroundImage})`,
						}

						const item = (
							<Link>
								<div className="board" key={board.id} style={style}>
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
}

export default Board
