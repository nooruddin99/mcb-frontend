const Instructions = ({ newSettings, setNewSettings }) => {
	const handleAddInstruction = () => {
		setNewSettings((prevSettings) => ({
			...prevSettings,
			instructionMessages: [
				...newSettings.instructionMessages,
				{ id: newSettings.instructionMessages.length + 1, text: `Instruction ${newSettings.instructionMessages.length + 1}` },
			],
		}))
	}

	const handleDeleteInstruction = (id) => {
		setNewSettings((prevSettings) => ({
			...prevSettings,
			instructionMessages: [...newSettings.instructionMessages.filter((instruction) => instruction.id !== id)],
		}))
	}

	const handleEditInstruction = (id, text) => {
		setNewSettings((prevSettings) => ({
			...prevSettings,
			instructionMessages: [
				...newSettings.instructionMessages.map((instruction) => (instruction.id === id ? { ...instruction, text } : instruction)),
			],
		}))
	}

	return (
		<div className="instruction-messages">
			<div className="heading">
				<h3>Instruction messages</h3>
				<button onClick={handleAddInstruction}>Add New Instruction</button>
			</div>
			<ul>
				{newSettings.instructionMessages.map((instruction) => (
					<li key={instruction.id}>
						<textarea type="text" value={instruction.text} onChange={(e) => handleEditInstruction(instruction.id, e.target.value)} />
						<button onClick={() => handleDeleteInstruction(instruction.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Instructions
