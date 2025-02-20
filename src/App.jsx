import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ProtectedRoute } from './components/PrivateRoute'
import Layout from './pages/Layout'
import GameSettings from './pages/GameSettings'
import ShopItems from './pages/ShopItems'

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />

					<Route
						path=""
						element={
							<ProtectedRoute>
								<Layout />
							</ProtectedRoute>
						}
					>
						<Route index element={<GameSettings />} />
						<Route path="/settings" element={<GameSettings />} />
						<Route path="/shop-items" element={<ShopItems />} />
					</Route>

					<Route path="*" element={<div>404 Not Found</div>} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
