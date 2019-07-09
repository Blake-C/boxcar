import React from 'react'

function getMonth(month) {
	let monthAbbreviation = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	return monthAbbreviation[month]
}

function getDateStatus(date) {
	const dueDate = date.setHours(12, 0, 0, 0)
	let today = new Date()
	let tomorrow = new Date()

	tomorrow.setDate(today.getDate() + 1)
	tomorrow.setHours(12, 0, 0, 0)
	today = today.setHours(12, 0, 0, 0)

	// console.log(dueDate, today, tomorrow)

	if (dueDate < today) {
		return 'past-due'
	} else if (dueDate < tomorrow || dueDate < today) {
		return 'due'
	} else if (dueDate <= tomorrow) {
		return 'coming-up'
	} else {
		return ''
	}
}

function Dates(props) {
	if (props.date === null || !props.date) {
		return ''
	}

	const dateFormatted = new Date(props.date)
	const today = new Date()
	const dateClass = props.status ? getDateStatus(dateFormatted) : ''

	return (
		<p className={`date ${dateClass}`}>
			{getMonth(dateFormatted.getMonth())} {String(dateFormatted.getDate()).padStart(2, '0')}
			{dateFormatted.getFullYear() > today.getFullYear()
				? `, '${dateFormatted
						.getFullYear()
						.toString()
						.substr(2, 2)}`
				: ''}
		</p>
	)
}

Dates.defaultProps = {
	status: true,
}

function Task(props) {
	const { title, id, dueDate, startDate } = props.data

	return (
		<div className={`task-item task-item-${id} clearfix`}>
			<div className="date-container">
				<Dates date={startDate} status={false} />
				<Dates date={dueDate} />
			</div>

			<h3>{title}</h3>
		</div>
	)
}

export default Task
