import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import api from '../utils/api'

import { ThreeDots } from 'react-loader-spinner'

const ShopItems = () => {
	const [shopItems, setShopItems] = useState([])
	const [selectedItem, setSelectedItem] = useState(null)
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		iconUrl: null,
		iconPubId: null,
	})

	const fetchShopItems = async () => {
		try {
			const res = await api.get('/api/shop-items')
			setShopItems(res.data)
			console.log(res.data)
			console.log('fetch shop items')
		} catch (error) {
			console.error('Error fetching shop items:', error)
		}
	}

	useEffect(() => {
		fetchShopItems()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData()
		for (const key in form) {
			formData.append(key, form[key])
		}

		const formDataObj = Object.fromEntries(formData.entries())
		console.log(formDataObj)

		try {
			if (selectedItem) {
				const res = await api.put(`/api/shop-items/${selectedItem._id}`, formDataObj)
				console.log('selectedItem', res)
			} else {
				const res = await api.post('/api/shop-items', formDataObj)

				if (res.data) {
					alert('Item added successfully')
				} else {
					alert('Error adding item')
				}
			}
			fetchShopItems()
			setSelectedItem(null)
			setForm({ name: '', description: '', price: '', category: '', iconUrl: null, iconPubId: null })
		} catch (error) {
			console.error('Error submitting form:', error)
		}
	}

	const handleDelete = async (id) => {
		try {
			await api.delete(`/api/shop-items/${id}`)
			fetchShopItems()
		} catch (error) {
			console.error('Error deleting shop item:', error)
		}
	}

	const handleEdit = (item) => {
		setSelectedItem(item)
		setForm({ ...item, iconUrl: item.iconUrl, iconPubId: item.iconPubId })
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setForm({ ...form, [name]: value })
	}

	const handleFileChange = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'i0b6ixhf')

		if (file) {
			setLoading(true)
		}

		try {
			const res = await axios.post(`https://api.cloudinary.com/v1_1/bilal-cloud/image/upload`, formData)
			if (res.data.secure_url !== '') {
				setForm({ ...form, iconUrl: res.data.secure_url, iconPubId: res.data.public_id })
				setLoading(false)
			}
		} catch (error) {
			console.error(error)
			alert('Error uploading image:', error)
		}
	}

	return (
		<div className="shop-itmes">
			<h2>Shop Items</h2>
			<div className="container">
				<form className="form" onSubmit={handleSubmit}>
					<div className="input-container">
						<label htmlFor="">Item Name</label>
						<input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="">Item Description</label>
						<textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
					</div>

					<div className="input-container">
						<label htmlFor="">Item Price</label>
						<input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="">Item Category</label>
						<input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="">Item Icon</label>
						<input name="iconImage" type="file" accept="image/*" onChange={handleFileChange} />
						{loading ? (
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
						) : (
							form.iconUrl && (
								<div className="img-container">
									<Image className="img" cloudName="bilal-cloud" publicId={form.iconPubId} />
								</div>
							)
						)}
					</div>

					<button type="submit">{selectedItem ? 'Update' : 'Add'} Item</button>
				</form>
			</div>

			<ul className="items_list">
				{shopItems.map((item) => (
					<li key={item._id}>
						<h3>{item.name}</h3>
						<h4>{item.description}</h4>
						<p>Price: {item.price}</p>
						<p>Category: {item.category}</p>
						<div className="img-container">
							<Image className="img" cloudName="bilal-cloud" publicId={item.iconPubId} />
						</div>

						<div className="btns">
							<button onClick={() => handleEdit(item)}>Edit</button>
							<button onClick={() => handleDelete(item._id)}>Delete</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ShopItems
