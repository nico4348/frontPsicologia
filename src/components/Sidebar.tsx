import React from 'react'
import { Users, UserSquare2, Building2, Calendar } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
	{ icon: Users, text: 'Usuarios', path: '/' },
	{ icon: UserSquare2, text: 'Practicantes', path: '/practicantes' },
	{ icon: Building2, text: 'Consultorios', path: '/consultorios' },
	{ icon: Calendar, text: 'Citas', path: '/citas' },
]

export default function Sidebar() {
	const location = useLocation()

	return (
		<div className="h-screen w-64 bg-indigo-800 text-white fixed left-0 top-0">
			<div className="p-4">
				<h1 className="text-xl font-bold mb-8">Consultorio Psicológico</h1>
				<nav>
					{menuItems.map((item) => {
						const Icon = item.icon
						const isActive = location.pathname === item.path
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
									isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
								}`}
							>
								<Icon size={20} />
								<span>{item.text}</span>
							</Link>
						)
					})}
				</nav>
			</div>
		</div>
	)
}
