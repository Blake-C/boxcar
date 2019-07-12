import React, { useState, useEffect } from 'react'
import Task from './task/task'

function List(props) {
	const { id, ordinal, title } = props.data
	const listTitle = React.createRef()

	// Fetch Tasks
	const [tasks, setTask] = useState([])

	useEffect(() => {
		fetchTask()
	}, [])

	const fetchTask = async () => {
		const data = await fetch('http://localhost:3000/data/tasks-data.json')
		const tasks = await data.json()
		setTask(tasks)
	}

	const tasksFiltered = tasks
		.filter(task => parseInt(task.listId) === parseInt(id))
		.filter(task => task.status !== 'archived')
		.sort((a, b) => a.ordinal - b.ordinal)
		.map(task => <Task data={task} key={task.id} />)

	const titleOnFocus = event => listTitle.current.setSelectionRange(0, 9999)

	const disableFormOnSubmit = event => event.preventDefault()

	const titleOnKeyPress = event => {
		const code = event.keyCode ? event.keyCode : event.which

		if (code === 13) {
			event.target.blur()
		}
	}

	return (
		<div className={`list-item item-${ordinal}`}>
			<h2 className="sr">{title}</h2>

			<form onSubmit={disableFormOnSubmit} autoComplete="off">
				<input
					type="text"
					name="title"
					spellCheck="false"
					ref={listTitle}
					value={title}
					data-id={id}
					onFocus={titleOnFocus}
					onChange={props.updateListTitle}
					onKeyPress={titleOnKeyPress}
				/>
			</form>

			<div className="tasks-container">{tasksFiltered}</div>

			<a href="/" className="add-task-button">
				+ Add another task
			</a>
		</div>
	)
}

export default List
