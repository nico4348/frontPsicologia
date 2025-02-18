import { useState } from 'react'
import { Building2, Plus } from 'lucide-react'
import type { ConsultingRoom } from '../types'

const sampleRooms: ConsultingRoom[] = [
	{
		idConsultorio: '1',
		nombre: 'Consultorio 101',
		activo: true,
	},
	{
		idConsultorio: '2',
		nombre: 'Consultorio 102',
		activo: true,
	},
	{
		idConsultorio: '3',
		nombre: 'Consultorio 201',
		activo: false,
	},
]

export default function ConsultingRooms() {
	const [rooms] = useState<ConsultingRoom[]>(sampleRooms)

	return (
		<div className="p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Gestión de Consultorios</h1>
					<button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
						<Plus size={20} />
						<span>Nuevo Consultorio</span>
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{rooms.map((room) => (
						<div
							key={room.idConsultorio}
							className="bg-white rounded-2xl shadow-lg overflow-hidden"
						>
							<div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
								<div className="flex items-center space-x-3">
									<div className="bg-white/10 rounded-full p-2">
										<Building2 size={24} className="text-white" />
									</div>
									<h3 className="text-xl font-bold text-white">{room.nombre}</h3>
								</div>
							</div>

							<div className="p-6">
								<div className="flex items-center justify-between mb-6">
									<span className="text-sm text-gray-500">Estado</span>
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
											room.activo
												? 'bg-green-100 text-green-800'
												: 'bg-red-100 text-red-800'
										}`}
									>
										{room.activo ? '● Disponible' : '● No disponible'}
									</span>
								</div>

								<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
									Editar consultorio
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
