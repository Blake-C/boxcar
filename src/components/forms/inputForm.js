import React, { useState, useRef, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

function InputForm(props) {
	const newTextareaRef = useRef()
	const newFormRef = React.createRef()

	const [newItemTitle, setNewItemTitle] = useState('')
	const [elementState, setElementState] = useState({
		showFormButton: true,
		showForm: false,
	})

	const disableFormOnSubmit = event => event.preventDefault()

	const addTitleOnChange = event => {
		setNewItemTitle(event.target.value)
	}

	const addItemOnReturn = event => {
		const code = event.keyCode ? event.keyCode : event.which

		// Return
		if (code === 13) {
			event.preventDefault()
			addNewItemOnClick()
		}

		// Escape
		if (code === 27) {
			event.preventDefault()
			setNewItemTitle('')
			setElementState({
				showFormButton: true,
				showForm: false,
			})
		}
	}

	const addNewItemOnClick = () => {
		const newItemTitle = newTextareaRef.current.value

		if (newItemTitle === '') return

		props.setItemState(prevState => [
			...prevState,
			{
				id: Date.now(),
				...props.stateObject,
				title: newItemTitle,
			},
		])

		setTimeout(() => {
			newTextareaRef.current.focus()
		}, 50)

		setNewItemTitle('')
	}

	const cancelItemOnClick = event => {
		setNewItemTitle('')
		event.target.blur()
		setElementState({
			showFormButton: true,
			showForm: false,
		})
	}

	const showFormOnClick = event => {
		event.preventDefault()
		setElementState({
			showFormButton: false,
			showForm: true,
		})
		setTimeout(() => {
			newTextareaRef.current.focus()
		}, 50)
	}

	useEffect(() => {
		if (props.jump !== false) {
			newFormRef.current.scrollIntoView()
		}
	}, [newFormRef, props.jump])

	return (
		<React.Fragment>
			<div className={`input-form-container ${props.className}`}>
				{props.listedData ? props.listedData : ''}

				<form
					onSubmit={disableFormOnSubmit}
					ref={newFormRef}
					autoComplete="off"
					className={`new-item-form ${elementState.showForm ? '' : 'hide'}`}
				>
					<TextareaAutosize
						minRows={props.textareaHeight}
						className="new-item-textarea"
						spellCheck="false"
						placeholder={`Enter ${props.title} title...`}
						value={newItemTitle}
						inputRef={newTextareaRef}
						onChange={addTitleOnChange}
						onKeyDown={addItemOnReturn}
					/>

					<button type="button" className="green" onClick={addNewItemOnClick}>
						Add {props.title}
					</button>

					<button type="button" className="red" onClick={cancelItemOnClick}>
						Cancel
					</button>
				</form>
			</div>

			<button
				className={`show-form-button ${elementState.showFormButton ? '' : 'hide'} ${props.className}`}
				onClick={showFormOnClick}
			>
				+ Add another {props.title}
			</button>
		</React.Fragment>
	)
}

export default InputForm
