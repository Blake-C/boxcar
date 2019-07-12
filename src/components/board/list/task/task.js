import React from 'react'
import { format, isToday, isTomorrow, isPast } from 'date-fns'

function getMonthAbbr(month) {
	let monthAbbreviation = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	return monthAbbreviation[month]
}

function getDateStatus(date) {
	if (isPast(date)) {
		return 'past-due'
	} else if (isToday(date)) {
		return 'due'
	} else if (isTomorrow(date)) {
		return 'coming-up'
	} else {
		return ''
	}
}

function Dates(props) {
	if (props.date === null || !props.date) {
		return ''
	}

	const dateFormatted = new Date(format(props.date))
	const today = new Date()
	const dateStatus = props.status ? getDateStatus(dateFormatted) : ''
	const monthAbbr = getMonthAbbr(dateFormatted.getMonth())
	const dayPadded = String(dateFormatted.getDate()).padStart(2, '0')
	const taskYear = dateFormatted.getFullYear()
	let yearAbbr = ''

	if (taskYear > today.getFullYear()) {
		yearAbbr = ", '" + taskYear.toString().substr(2, 2)
	}

	return (
		<p className={`date ${dateStatus}`}>
			{monthAbbr} {dayPadded} {yearAbbr}
		</p>
	)
}

Dates.defaultProps = {
	status: true,
}

function Task(props) {
	const { title, id, dueDate, startDate } = props.data
	let dates = ''

	if (startDate || dueDate) {
		dates = (
			<div className="date-container">
				<Dates date={startDate} status={false} />
				<Dates date={dueDate} />
			</div>
		)
	}

	return (
		<div className={`task-item task-item-${id} clearfix`}>
			<h3>{title}</h3>
			{dates}
		</div>
	)
}

export default Task
