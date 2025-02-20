import React, { useState } from 'react'

const ScreenQuestions = ({ newSettings, setNewSettings }) => {
	const [question, setQuestion] = useState('')
	const [optionA, setOptionA] = useState('')
	const [optionB, setOptionB] = useState('')
	const [editing, setEditing] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(null)

	const handleAddQuestion = () => {
		if (editing) {
			const newQuestions = [...newSettings.screenQuestions]
			newQuestions[currentIndex] = { question, optionA, optionB }
			setNewSettings((prevSettings) => ({
				...prevSettings,
				screenQuestions: newQuestions,
			}))
			setEditing(false)
		} else {
			if (!question || !optionA || !optionB) return alert('Please fill all the fields')

			setNewSettings((prevSettings) => ({
				...prevSettings,
				screenQuestions: [...newSettings.screenQuestions, { question, optionA, optionB }],
			}))
		}

		setQuestion('')
		setOptionA('')
		setOptionB('')
	}

	const handleDeleteQuestion = (index) => {
		const newQuestions = [...newSettings.screenQuestions]
		newQuestions.splice(index, 1)
		setNewSettings((prevSettings) => ({ ...prevSettings, screenQuestions: newQuestions }))
	}

	const handleEditQuestion = (index) => {
		setQuestion(newSettings.screenQuestions[index].question)
		setOptionA(newSettings.screenQuestions[index].optionA)
		setOptionB(newSettings.screenQuestions[index].optionB)
		setEditing(true)
		setCurrentIndex(index)
	}

	return (
		<div className="screen-questions">
			<div className="form">
				<div className="input-container">
					<label htmlFor="question">Question:</label>
					<input type="text" id="question" value={question} onChange={(event) => setQuestion(event.target.value)} />
				</div>
				<div className="input-container">
					<label htmlFor="optionA">Option A:</label>
					<input type="text" id="optionA" value={optionA} onChange={(event) => setOptionA(event.target.value)} />
				</div>
				<div className="input-container">
					<label htmlFor="optionB">Option B:</label>
					<input type="text" id="optionB" value={optionB} onChange={(event) => setOptionB(event.target.value)} />
				</div>
				<button className="add-question__btn" onClick={handleAddQuestion}>
					{editing ? 'Update Question' : 'Add Question'}
				</button>
			</div>

			<h4>Questions List</h4>
			<ul className="questions-list">
				{newSettings.screenQuestions.map((q, index) => (
					<li key={index}>
						<div className="list-container">
							<div className="question-container">
								<div className="question">{q.question}</div>
								<div className="options">
									<h5>Options:</h5>
									<div className="options-container">
										<span>{q.optionA}</span> /<span>{q.optionB}</span>
									</div>
								</div>
							</div>
							<div className="btns">
								<button onClick={() => handleEditQuestion(index)}>Edit</button>
								<button onClick={() => handleDeleteQuestion(index)}>Delete</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ScreenQuestions
