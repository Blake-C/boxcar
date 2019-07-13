import React, { useState, useEffect } from 'react'
import Task from './task/task'

function List(props) {
	// Get board data from props
	const { id: listId, ordinal, title: listTitle } = props.data

	// Create references
	const listTitleRef = React.createRef()
	const newTaskRef = React.createRef()
	const newTaskFormRef = React.createRef()
	const showNewTaskFormButtonRef = React.createRef()
	const tasksContainerRef = React.createRef()

	// Fetch Tasks
	const [tasks, setTask] = useState([])
	const [newTaskTitle, setNewTaskTitle] = useState([])

	useEffect(() => {
		fetchTask()
	}, [])

	const fetchTask = async () => {
		const data = await fetch('http://localhost:3000/data/tasks-data.json')
		const tasks = await data.json()
		setTask(tasks)
	}

	const tasksFiltered = tasks
		.filter(task => parseInt(task.listId) === parseInt(listId))
		.filter(task => task.status !== 'archived')
		.sort((a, b) => a.ordinal - b.ordinal)
		.map(task => <Task data={task} key={task.id} />)

	// Auto select list title on focus
	const titleOnFocus = () => listTitleRef.current.setSelectionRange(0, 9999)

	// Leave input field on return
	const leaveInputOnReturn = event => {
		const code = event.keyCode ? event.keyCode : event.which

		if (code === 13) {
			event.target.blur()
		}
	}

	// Disable form submission
	const disableFormOnSubmit = event => event.preventDefault()

	// Add new task title to input field state
	const addTaskTitleOnChange = event => {
		setNewTaskTitle(event.target.value)
	}

	// Add task to state on input return
	const addTaskOnReturn = event => {
		const code = event.keyCode ? event.keyCode : event.which

		if (code === 13) {
			event.preventDefault()
			addNewTaskOnClick()
		}

		if (code === 27) {
			event.preventDefault()
			setNewTaskTitle([])
			newTaskFormRef.current.classList.toggle('hide')
			showNewTaskFormButtonRef.current.classList.remove('hide')
			tasksContainerRef.current.classList.add('bumper')
		}
	}

	useEffect(() => {
		newTaskFormRef.current.scrollIntoView()
	}, [newTaskFormRef])

	const addNewTaskOnClick = () => {
		const newTaskTitle = newTaskRef.current.value

		if (newTaskTitle === '') return

		setTask(prevState => [
			...prevState,
			{
				id: Date.now(),
				userId: 1,
				boardId: props.boardId,
				listId: listId,
				status: 'active',
				title: newTaskTitle,
			},
		])

		setNewTaskTitle([])
	}

	const resetNewTaskOnClick = event => {
		setNewTaskTitle([])
		event.target.blur()
		newTaskFormRef.current.classList.toggle('hide')
		showNewTaskFormButtonRef.current.classList.remove('hide')
		tasksContainerRef.current.classList.add('bumper')
	}

	const showNewTaskFormOnClick = event => {
		event.preventDefault()
		showNewTaskFormButtonRef.current.classList.add('hide')
		newTaskFormRef.current.classList.remove('hide')
		newTaskFormRef.current.scrollIntoView()
		newTaskRef.current.focus()
		tasksContainerRef.current.classList.remove('bumper')
	}

	return (
		<div className={`list-item item-${ordinal}`}>
			<h2 className="sr">{listTitle}</h2>

			<form onSubmit={disableFormOnSubmit} autoComplete="off">
				<input
					type="text"
					name="title"
					className="list-title-input"
					spellCheck="false"
					ref={listTitleRef}
					value={listTitle}
					data-id={listId}
					onFocus={titleOnFocus}
					onChange={props.updateListTitle}
					onKeyDown={leaveInputOnReturn}
				/>
			</form>

			<div className="tasks-container bumper" ref={tasksContainerRef}>
				{tasksFiltered}

				<form
					onSubmit={disableFormOnSubmit}
					ref={newTaskFormRef}
					autoComplete="off"
					className="new-task-form hide"
				>
					<textarea
						rows="3"
						name="newTask"
						spellCheck="false"
						placeholder="Enter title for this task..."
						value={newTaskTitle}
						ref={newTaskRef}
						onChange={addTaskTitleOnChange}
						onKeyDown={addTaskOnReturn}
						className="new-task-form-textarea"
					/>

					<button type="button" className="green" onClick={addNewTaskOnClick}>
						Add Task
					</button>

					<button type="button" className="red" onClick={resetNewTaskOnClick}>
						Cancel
					</button>
				</form>
			</div>

			<button className="add-task-button" onClick={showNewTaskFormOnClick} ref={showNewTaskFormButtonRef}>
				+ Add another task
			</button>
		</div>
	)
}

export default List
