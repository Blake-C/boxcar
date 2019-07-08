import React from 'react'

function Task(props) {
	const { title, id } = props.data

	return (
		<div className={`task-item task-item-${id}`}>
			<h3>{title}</h3>
		</div>
	)
}

export default Task
