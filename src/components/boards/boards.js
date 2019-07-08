import React, { useState, useEffect } from 'react'
import Board from './board/board'
import './boards.scss'

function Boards() {
	useEffect(() => {
		fetchBoards()
		document.title = 'Boxcar'
	}, [])

	const fetchBoards = async () => {
		const data = await fetch('http://localhost:3000/data/boards-data.json')
		const boards = await data.json()
		setBoards(boards)
	}

	const [boards, setBoards] = useState([])

	return (
		<div className="boards-list container fixed">
			<Board title="Featured" data={boards} featured={true} />
			<Board title="Boards" data={boards} featured={false} />
		</div>
	)
}

export default Boards
