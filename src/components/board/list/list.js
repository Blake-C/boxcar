import React from 'react'

function List(props) {
	const { id, title, ordinal } = props.data

	return (
		<div className={`list-item item-${ordinal}`} key={id}>
			<h2>{title}</h2>
		</div>
	)
}

export default List
