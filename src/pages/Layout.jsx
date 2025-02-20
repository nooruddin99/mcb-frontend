import { Link, Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate('/login')
	}

	return (
		<div className="layout">
			<div className="header">
				<h2>Dashboard</h2>

				<ul>
					<li>
						<Link className="link" to="/settings">
							Game Settings
						</Link>
					</li>
					<li>
						<Link className="link" to="/shop-items">
							Shop Items
						</Link>
					</li>
				</ul>

				<button onClick={handleLogout}>Logout</button>
			</div>

			<Outlet />
		</div>
	)
}

export default Layout
