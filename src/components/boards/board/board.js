import React from 'react'
import { Link } from 'react-router-dom'
import InputForm from '../../forms/inputForm'

function Board(props) {
	const boards_list = props.featured
		? props.data.filter(board => board.featured)
		: props.data.filter(board => !board.featured)

	const boardsStateObject = {
		userId: 1,
		featured: props.featured && 'featured',
	}

	return (
		<React.Fragment>
			<h1>{props.title}</h1>

			<div className={`boards ${props.featured && 'featured'}`}>
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

				<div className="add-new-board">
					<InputForm
						className="master-board-class"
						title="board"
						setItemState={props.setBoardsState}
						stateObject={boardsStateObject}
						textareaHeight={1}
						jump={false}
					/>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Board
