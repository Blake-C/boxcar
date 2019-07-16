import React, { useState, useEffect, useRef } from 'react'
import Task from './task/task'
import TextareaAutosize from 'react-textarea-autosize'

function List(props) {
	// Get board data from props
	const { id: listId, ordinal, title: listTitle } = props.data

	// Create references
	const newTaskRef = useRef()
	const newTaskFormRef = React.createRef()

	// Fetch Tasks
	const [tasks, setTask] = useState([])
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [elementState, setElementState] = useState({
		createTaskButton: true,
		taskForm: false,
	})

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

	// Add new task title to input field state
	const addTaskTitleOnChange = event => {
		setNewTaskTitle(event.target.value)
	}

	// Add task to state on input return
	const addTaskOnReturn = event => {
		const code = event.keyCode ? event.keyCode : event.which

		// Return
		if (code === 13) {
			event.preventDefault()
			addNewTaskOnClick()
		}

		// Escape
		if (code === 27) {
			event.preventDefault()
			setNewTaskTitle('')
			setElementState({
				createTaskButton: true,
				taskForm: false,
			})
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

		setTimeout(() => {
			newTaskRef.current.focus()
		}, 50)

		setNewTaskTitle('')
	}

	const resetNewTaskOnClick = event => {
		setNewTaskTitle('')
		event.target.blur()
		setElementState({
			createTaskButton: true,
			taskForm: false,
		})
	}

	const showNewTaskFormOnClick = event => {
		event.preventDefault()
		setElementState({
			createTaskButton: false,
			taskForm: true,
		})
		setTimeout(() => {
			newTaskRef.current.focus()
		}, 50)
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

			<div className="tasks-container">
				{tasksFiltered}

				<form
					onSubmit={disableFormOnSubmit}
					ref={newTaskFormRef}
					autoComplete="off"
					className={`new-task-form ${elementState.taskForm ? '' : 'hide'}`}
				>
					<TextareaAutosize
						minRows={3}
						name="newTask"
						className="new-task-form-textarea"
						spellCheck="false"
						placeholder="Enter title for this task..."
						value={newTaskTitle}
						inputRef={newTaskRef}
						onChange={addTaskTitleOnChange}
						onKeyDown={addTaskOnReturn}
					/>

					<button type="button" className="green" onClick={addNewTaskOnClick}>
						Add Task
					</button>

					<button type="button" className="red" onClick={resetNewTaskOnClick}>
						Cancel
					</button>
				</form>
			</div>

			<button
				className={`add-task-button ${elementState.createTaskButton ? '' : 'hide'}`}
				onClick={showNewTaskFormOnClick}
			>
				+ Add another task
			</button>
		</div>
	)
}

export default List
