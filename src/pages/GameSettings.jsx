import { useState, useEffect } from 'react'
import Switch from 'react-switch'
import api from './../utils/api'

import Instructions from '../components/Instructions'
import ScreenQuestions from '../components/ScreenQuestions'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import ScreenUrls from '../components/ScreenUrls'

const GameSettings = () => {
	const userId = localStorage.getItem('userId')

	const [newSettings, setNewSettings] = useState({
		avatarToggler: false,
		instructionMessages: [],
		soundFile: '',
		screenQuestions: [],
		coinEarnings: 0,
		playLimit: 0,
		screenUrls: {},
		date: '',
	})

	const [loading, setLoading] = useState(false);
	const [settingsUrls, setSettingsUrls] = useState({})

	const handleAvatarToggler = (checked) => {
		setNewSettings((prevSettings) => ({ ...prevSettings, avatarToggler: checked }))
	}

	const handleBgSound = async (e) => {
		e.preventDefault()

		const file = e.target.files[0]

		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'i0b6ixhf')
		formData.append('resource_type', 'video') // Audio files are considered 'video' in Cloudinary

		if (file) {
			setLoading(true)
		}

		try {
			const res = await axios.post(`https://api.cloudinary.com/v1_1/bilal-cloud/upload`, formData)
			console.log('res', res.data.secure_url)

			if (res.data.secure_url !== '') {
				setNewSettings((prevSettings) => ({ ...prevSettings, soundFile: res.data.secure_url }))
				setLoading(false)
				alert('Sound file uploaded successfully')
			}
		} catch (error) {
			console.error(error)
			alert('Error uploading image:', error)
		}
	}

	const handleSettings = async () => {
		if (!newSettings.soundFile) {
			alert('Please upload a sound file')
		}

		const formData = new FormData()
		formData.append('avatarToggler', newSettings.avatarToggler)
		formData.append('instructionMessages', JSON.stringify(newSettings.instructionMessages))
		formData.append('soundFile', newSettings.soundFile)
		formData.append('screenQuestions', JSON.stringify(newSettings.screenQuestions))
		formData.append('coinEarnings', newSettings.coinEarnings)
		formData.append('playLimit', newSettings.playLimit)
		formData.append('screenUrls', JSON.stringify(newSettings.screenUrls))
		formData.append('date', newSettings.date)

		const formDataObj = Object.fromEntries(formData.entries())
		console.log('formDataObj', formDataObj)

		try {
			const res = await api.post('/api/settings', formDataObj)
			if (res.data) {
				alert('Settings Saved Successfully')
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	console.log(' setting values : ', newSettings)

	const fetchSettings = async () => {
		const res = await api.get(`/api/settings`)
		console.log('res.data : ', res.data);
		const settingsData = res.data;
		if(settingsData) {
			setNewSettings({
				avatarToggler: settingsData.avatarToggler,
				instructionMessages: settingsData.instructionMessages,
				soundFile: settingsData.soundFile,
				screenQuestions: settingsData.screenQuestions,
				coinEarnings: settingsData.coinEarnings,
				playLimit: settingsData.playLimit,
				screenUrls: settingsData.screenUrls,
				date: settingsData.date,
			});
			setSettingsUrls (settingsData.screenUrls)
		}
	}

	useEffect(() => {
		fetchSettings()
	}, [])

	return (
		<div className="settings">
			<h2>Game Settings</h2>

			{/* Avatar Option */}
			<div className="avatar-option">
				{/* Avatar Option Settings */}
				<h3>Can user customize the Avatar?</h3>
				<Switch
					onChange={handleAvatarToggler}
					checked={newSettings.avatarToggler}
					offColor="#ccc"
					onColor="#2196f3"
					onHandleColor="#fff"
					offHandleColor="#fff"
					height={24}
					width={48}
					uncheckedIcon={false}
					checkedIcon={false}
				/>
			</div>

			{/* Instruction Messages */}
			<Instructions newSettings={newSettings} setNewSettings={setNewSettings} />

			{/* Background Sound */}
			<div className="bg-sound">
				<h3>Upload Background Sound</h3>
				<input type="file" onChange={handleBgSound} accept="audio/*" />
				{loading && (
					<div className="loader">
						<ThreeDots
							height="80"
							width="80"
							radius="9"
							color="#4fa94d"
							ariaLabel="three-dots-loading"
							wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
							wrapperClassName=""
							visible={true}
						/>
					</div>
				)}
			</div>

			{/* Setting what should be Seen on the screen */}
			<div className="screen-settings">
				<h3>What should be seen on the screen?</h3>
				<ScreenQuestions newSettings={newSettings} setNewSettings={setNewSettings} />
			</div>

			{/* Amount of Coins User Can Earn */}
			<div className="coins">
				<h3>Amount of Coins User Can Earn?</h3>
				<input
					type="number"
					value={newSettings.coinEarnings}
					onChange={(e) => setNewSettings((prevSettings) => ({ ...prevSettings, coinEarnings: e.target.value }))}
				/>
			</div>

			{/*Number of times user can play the game*/}
			<div className="game-play">
				<h3>Number of times user can play the game?</h3>
				<input
					type="number"
					value={newSettings.playLimit}
					onChange={(e) => setNewSettings((prevSettings) => ({ ...prevSettings, playLimit: e.target.value }))}
				/>
			</div>

			{/* URLS */}
			<div className="urls">
				<h3>Add URLS for different screens</h3>
				<ScreenUrls newSettings={newSettings} setNewSettings={setNewSettings} settingsUrls ={settingsUrls}/>
			</div>

			{/* Showcase date */}
			<div className="date">
				<h3>Date</h3>
				<input
					type="date"
					value={newSettings.date}
					onChange={(e) => setNewSettings((prevSettings) => ({ ...prevSettings, date: e.target.value }))}
				/>
			</div>

			<button className="submit_settings_btn" onClick={handleSettings}>
				Save Settings
			</button>
		</div>
	)
}

export default GameSettings
