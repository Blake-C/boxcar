import React, { useState, useEffect } from 'react'
import Task from './task/task'

function List(props) {
	const { id, ordinal, title } = props.data

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

	const selectOnFocus = event => event.target.select()

	const disableForm = event => event.preventDefault()

	return (
		<div className={`list-item item-${ordinal}`}>
			<form onSubmit={disableForm}>
				<input
					type="text"
					name="title"
					value={title}
					id={id}
					onChange={props.updateListTitle}
					onFocus={selectOnFocus}
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
