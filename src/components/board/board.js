import React, { useState, useEffect } from 'react'
import List from './list/list'
import './board.scss'

function Board({ match }) {
	useEffect(() => {
		fetchLists()
		fetcBoards()
	}, [])

	const [lists, setLists] = useState([])
	const [boards, setBoards] = useState([])

	const fetchLists = async () => {
		const data = await fetch('http://localhost:3000/data/lists-data.json')
		const lists = await data.json()
		setLists(lists)
	}

	const fetcBoards = async () => {
		const data = await fetch('http://localhost:3000/data/boards-data.json')
		const boards = await data.json()
		setBoards(boards)
	}

	const board = boards.find(board => parseInt(board.id) === parseInt(match.params.id))

	const filterLists = lists
		.filter(list => parseInt(list.boardId) === parseInt(match.params.id))
		.sort((a, b) => a.ordinal - b.ordinal)
		.map(list => <List data={list} key={list.id} />)

	useEffect(() => {
		document.title = `Board: ${board === undefined ? '' : board.title}`
		document.body.style.backgroundColor = 'rgb(107, 135, 206)'
		if (undefined !== board && '' !== board.backgroundImageLarge && undefined !== board.backgroundImageLarge) {
			document.body.style.backgroundImage = `url(/assets/images/${board.backgroundImageLarge})`
		}
		document.body.classList.add('cover')

		return () => {
			document.title = ''
			document.body.style.backgroundColor = ''
			document.body.style.backgroundImage = ''
			document.body.classList.remove('cover')
		}
	}, [board])

	return (
		<React.Fragment>
			<div className="board-bar">{board === undefined ? '' : <h1>{board.title}</h1>}</div>

			<div className="lists-container container">{filterLists}</div>
		</React.Fragment>
	)
}

export default Board
