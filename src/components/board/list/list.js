import React, { useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Task from './task/task'
import InputForm from '../../forms/inputForm'

function List(props) {
	// Get board data from props
	const { id: listId, ordinal, title: listTitle } = props.data

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
		.filter(task => parseInt(task.listId) === parseInt(listId))
		.filter(task => task.status !== 'archived')
		.sort((a, b) => a.ordinal - b.ordinal)
		.map(task => <Task data={task} key={task.id} />)

	// Auto select list title on focus
	const titleOnFocus = event => event.target.setSelectionRange(0, 9999)

	// Leave input field on return
	const leaveInputOnReturn = event => {
		const code = event.keyCode ? event.keyCode : event.which

		// Return
		if (code === 13) {
			event.preventDefault()
			event.target.blur()
		}
	}

	// Disable form submission
	const disableFormOnSubmit = event => event.preventDefault()

	const taskStateObject = {
		userId: 1,
		boardId: props.boardId,
		listId: listId,
		status: 'active',
	}

	return (
		<div className={`list-item item-${ordinal}`}>
			<form onSubmit={disableFormOnSubmit} autoComplete="off" className="list-title-form">
				<TextareaAutosize
					rows={1}
					name="title"
					className="list-title-input"
					spellCheck="false"
					value={listTitle}
					data-id={listId}
					onFocus={titleOnFocus}
					onChange={props.updateListTitle}
					onKeyDown={leaveInputOnReturn}
				/>
			</form>

			<InputForm
				className="master-task-class"
				title="task"
				setItemState={setTask}
				stateObject={taskStateObject}
				listedData={tasksFiltered}
				textareaHeight={3}
			/>
		</div>
	)
}

export default List
