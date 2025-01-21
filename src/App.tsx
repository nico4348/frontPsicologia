import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Users from './pages/Users'
import Practitioners from './pages/Practitioners'
import ConsultingRooms from './pages/ConsultingRooms'
import Appointments from './pages/Appointments'

function App() {
	return (
		<Router>
			<div className="flex">
				<Sidebar />
				<main className="flex-1 ml-64 bg-gray-50 min-h-screen">
					<Routes>
						<Route path="/" element={<Users />} />
						<Route path="/practicantes" element={<Practitioners />} />
						<Route path="/consultorios" element={<ConsultingRooms />} />
						<Route path="/citas" element={<Appointments />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
