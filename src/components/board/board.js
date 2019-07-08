import React, { useState, useEffect } from 'react'
import List from './list/list'
import './board.scss'

function Board({ match }) {
	useEffect(() => {
		fetchLists()
		fetcBoards()
	}, [])

	const fetchLists = async () => {
		const data = await fetch('http://localhost:3000/data/lists-data.json')
		const lists = await data.json()
		setLists(lists)
	}
	const [lists, setLists] = useState([])

	const fetcBoards = async () => {
		const data = await fetch('http://localhost:3000/data/boards-data.json')
		const boards = await data.json()
		setBoards(boards)
	}
	const [boards, setBoards] = useState([])

	const board = boards.find(board => parseInt(board.id) === parseInt(match.params.id))

	const filterLists = lists
		.filter(list => parseInt(list.boardId) === parseInt(match.params.id))
		.sort((a, b) => a.ordinal - b.ordinal)
		.map(list => <List data={list} key={list.id} />)

	return (
		<React.Fragment>
			<div className="board-bar">{board === undefined ? '' : <h1>{board.title}</h1>}</div>

			<div className="lists-list container">{filterLists}</div>
		</React.Fragment>
	)
}

export default Board
