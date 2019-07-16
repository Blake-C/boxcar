import React, { useState, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import List from './list/list'
import './board.scss'

function Board({ match }) {
	const newListRef = useRef()
	const newListFormRef = React.createRef()

	useEffect(() => {
		fetchLists()
		fetchBoards()
	}, [])

	const [lists, setLists] = useState([])
	const [boards, setBoards] = useState([])
	const [newListTitle, setNewListTitle] = useState('')
	const [elementState, setElementState] = useState({
		createTaskButton: true,
		taskForm: false,
	})

	const fetchLists = async () => {
		const data = await fetch('http://localhost:3000/data/lists-data.json')
		const lists = await data.json()
		setLists(lists)
	}

	const fetchBoards = async () => {
		const data = await fetch('http://localhost:3000/data/boards-data.json')
		const boards = await data.json()
		setBoards(boards)
	}

	const updateListTitle = event => {
		const listId = parseInt(event.target.dataset.id)
		const newListTitile = event.target.value
		setLists(prevState => {
			const newState = prevState.map(item => {
				if (item.id === listId) {
					item.title = newListTitile
				}
				return item
			})

			return newState
		})
	}

	const board = boards.find(board => parseInt(board.id) === parseInt(match.params.id))

	const filterLists = lists
		.filter(list => parseInt(list.boardId) === parseInt(match.params.id))
		.sort((a, b) => a.ordinal - b.ordinal)
		.map(list => <List data={list} key={list.id} boardId={match.params.id} updateListTitle={updateListTitle} />)

	useEffect(() => {
		document.title = `Board: ${board === undefined ? '' : board.title}`
		document.body.style.backgroundColor = 'rgb(107, 135, 206)'
		if (undefined !== board && '' !== board.backgroundImageLarge && undefined !== board.backgroundImageLarge) {
			document.body.style.backgroundImage = `url(/assets/images/${board.backgroundImageLarge})`
		}
		document.body.classList.add('cover', 'list-view')

		return () => {
			document.title = ''
			document.body.style.backgroundColor = ''
			document.body.style.backgroundImage = ''
			document.body.classList.remove('cover', 'list-view')
		}
	}, [board])

	const disableFormOnSubmit = event => event.preventDefault()

	const addTaskTitleOnChange = event => {
		setNewListTitle(event.target.value)
	}

	// Add task to state on input return
	const addListOnReturn = event => {
		const code = event.keyCode ? event.keyCode : event.which

		// Return
		if (code === 13) {
			event.preventDefault()
			addNewListOnClick()
		}

		// Escape
		if (code === 27) {
			event.preventDefault()
			setNewListTitle('')
			setElementState({
				createTaskButton: true,
				taskForm: false,
			})
		}
	}

	const addNewListOnClick = () => {
		const newListTitle = newListRef.current.value

		if (newListTitle === '') return

		setLists(prevState => [
			...prevState,
			{
				id: Date.now(),
				userId: 1,
				boardId: match.params.id,
				title: newListTitle,
			},
		])

		setTimeout(() => {
			newListRef.current.focus()
		}, 50)

		setNewListTitle('')
	}

	const resetNewListOnClick = event => {
		setNewListTitle('')
		event.target.blur()
		setElementState({
			createTaskButton: true,
			taskForm: false,
		})
	}

	const showNewListFormOnClick = event => {
		event.preventDefault()
		setElementState({
			createTaskButton: false,
			taskForm: true,
		})
		setTimeout(() => {
			newListRef.current.focus()
		}, 50)
	}

	return (
		<React.Fragment>
			<div className="board-bar">{board === undefined ? '' : <h1>{board.title}</h1>}</div>

			<div className="lists-container">
				{filterLists}

				<form
					onSubmit={disableFormOnSubmit}
					ref={newListFormRef}
					autoComplete="off"
					className={`new-list-form ${elementState.taskForm ? '' : 'hide'}`}
				>
					<TextareaAutosize
						rows={3}
						name="newList"
						className="new-list-textarea"
						spellCheck="false"
						placeholder="Enter list title..."
						value={newListTitle}
						inputRef={newListRef}
						onChange={addTaskTitleOnChange}
						onKeyDown={addListOnReturn}
					/>

					<button type="button" className="green" onClick={addNewListOnClick}>
						Add List
					</button>

					<button type="button" className="red" onClick={resetNewListOnClick}>
						Cancel
					</button>
				</form>

				<button
					className={`add-list-button ${elementState.createTaskButton ? '' : 'hide'}`}
					onClick={showNewListFormOnClick}
				>
					+ Add another list
				</button>
			</div>
		</React.Fragment>
	)
}

export default Board
