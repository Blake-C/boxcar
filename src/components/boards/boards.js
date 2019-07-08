import React, { Component } from 'react'
import Board from './board/board'
import data from './boards-data'
import './boards.scss'

class Boards extends Component {
	render() {
		return (
			<div className="boards-list">
				<Board title="Featured" data={data} featured={true} />
				<Board title="Boards" data={data} featured={false} />
			</div>
		)
	}
}

export default Boards
