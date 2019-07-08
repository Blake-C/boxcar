import React, { useState, useEffect } from 'react'
import Task from './task/task'

function List(props) {
	const { id, title, ordinal } = props.data

	useEffect(() => {
		fetchTask()
	}, [])

	const fetchTask = async () => {
		const data = await fetch('http://localhost:3000/data/tasks-data.json')
		const tasks = await data.json()
		setTask(tasks)
	}
	const [tasks, setTask] = useState([])

	const tasksFiltered = tasks
		.filter(task => parseInt(task.listId) === parseInt(id))
		.filter(task => task.status !== 'archived')
		.sort((a, b) => a.ordinal - b.ordinal)
		.map(task => <Task data={task} key={task.id} />)

	return (
		<div className={`list-item item-${ordinal}`}>
			<h2>{title}</h2>

			{tasksFiltered}
		</div>
	)
}

export default List
