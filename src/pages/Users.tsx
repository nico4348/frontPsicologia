import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import UserForm from '../components/UserForm'
import { Phone, Mail, Calendar, User2, Clock } from 'lucide-react'
import type { User, Appointment } from '../types'
import axios from 'axios'

// const sampleUser: User = {
// 	idUsuario: '1',
// 	nombre: 'María',
// 	apellido: 'González',
// 	correo: 'maria.gonzalez@email.com',
// 	telefonoPersonal: '3001234567',
// 	documento: '1234567890',
// 	tipoDocumento: 'CC',
// 	testActual: 'ghq12',
// 	motivo: 'Ansiedad y estrés laboral',
// 	ayudaPsicologica: 1,
// 	tratDatos: true,
// 	flujo: 'register',
// 	sesion: 3,
// 	estado: true,
// 	disponibilidad: {},
// }

const sampleAppointments: Appointment[] = [
	{
		idCita: '1',
		idConsultorio: '1',
		idUsuario: '1',
		idPracticante: '1',
		fechaHora: '2024-03-20 09:00',
		estado: 'completada',
		consultorio: { idConsultorio: '1', nombre: 'Consultorio 101', activo: true },
		practicante: {
			idPracticante: '1',
			nombre: 'Carlos Ramírez',
			numero_documento: '98765432',
			tipo_documento: 'CC',
			genero: 'Masculino',
			estrato: '4',
			barrio: 'El Poblado',
			localidad: 'Medellín',
			horario: {},
			sesiones: 45,
		},
	},
	{
		idCita: '2',
		idConsultorio: '2',
		idUsuario: '1',
		idPracticante: '1',
		fechaHora: '2024-03-25 10:30',
		estado: 'pendiente',
		consultorio: { idConsultorio: '2', nombre: 'Consultorio 102', activo: true },
		practicante: {
			idPracticante: '1',
			nombre: 'Carlos Ramírez',
			numero_documento: '98765432',
			tipo_documento: 'CC',
			genero: 'Masculino',
			estrato: '4',
			barrio: 'El Poblado',
			localidad: 'Medellín',
			horario: {},
			sesiones: 45,
		},
	},
]

export default function Users() {
	const [searchQuery, setSearchQuery] = useState('')
	const [user, setUser] = useState<User | null>(null)
	const [appointments, setAppointments] = useState<Appointment[]>([])
	const [isEditing, setIsEditing] = useState(false)

	const queryBd = async (searchQuery: string) => {
		try {
			const response = await axios.get(`http://localhost:3000/v1/front/user/${searchQuery}`)
			return response.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	const handleSearch = async () => {
		const userData = await queryBd(searchQuery)
		if (userData) {
			setUser(userData)
			setAppointments(sampleAppointments)
		} else {
			setUser(null)
			setAppointments([])
		}
	}

	const handleEditUser = (data: Partial<User>) => {
		setUser((prev) => ({ ...prev, ...data }))
		setIsEditing(false)
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat('es-CO', {
			day: 'numeric',
			month: 'long',
			hour: 'numeric',
			minute: 'numeric',
		}).format(date)
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pendiente':
				return 'bg-yellow-100 text-yellow-800'
			case 'completada':
				return 'bg-green-100 text-green-800'
			case 'cancelada':
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<div className="p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Usuarios</h1>

				<div className="mb-8">
					<SearchBar
						placeholder="Buscar por documento de identidad (Prueba: 1234567890)"
						value={searchQuery}
						onChange={setSearchQuery}
						onSearch={handleSearch}
					/>
				</div>

				{user && (
					<div className="space-y-6">
						{isEditing ? (
							<UserForm
								user={user}
								onSubmit={handleEditUser}
								onCancel={() => setIsEditing(false)}
							/>
						) : (
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
								<div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-6">
									<div className="flex items-center space-x-4">
										<div className="bg-white/10 rounded-full p-3">
											<User2 size={32} className="text-white" />
										</div>
										<div>
											<h2 className="text-2xl font-bold text-white">{`${user.nombre} ${user.apellido}`}</h2>
											<p className="text-indigo-200">{`${user.tipoDocumento}: ${user.documento}`}</p>
										</div>
									</div>
								</div>

								<div className="p-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="space-y-6">
											<div className="flex items-center space-x-3">
												<Mail className="text-gray-400" size={20} />
												<div>
													<p className="text-sm text-gray-500">
														Correo electrónico
													</p>
													<p className="font-medium text-gray-900">
														{user.correo || 'No registrado'}
													</p>
												</div>
											</div>

											<div className="flex items-center space-x-3">
												<Phone className="text-gray-400" size={20} />
												<div>
													<p className="text-sm text-gray-500">
														Teléfono
													</p>
													<p className="font-medium text-gray-900">
														{user.telefonoPersonal}
													</p>
												</div>
											</div>
										</div>

										<div className="space-y-6">
											<div className="flex items-center space-x-3">
												<Calendar className="text-gray-400" size={20} />
												<div>
													<p className="text-sm text-gray-500">
														Sesiones completadas
													</p>
													<p className="font-medium text-gray-900">
														{user.sesion}
													</p>
												</div>
											</div>

											<div>
												<p className="text-sm text-gray-500 mb-2">
													Estado actual
												</p>
												<span
													className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
														user.estado
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'
													}`}
												>
													{user.estado ? '● Activo' : '● Inactivo'}
												</span>
											</div>
										</div>
									</div>

									<div className="mt-8 pt-6 border-t border-gray-100">
										<h3 className="text-lg font-semibold text-gray-900 mb-4">
											Información adicional
										</h3>
										<div className="bg-gray-50 rounded-xl p-4">
											<p className="text-sm text-gray-600 mb-2">
												Motivo de consulta
											</p>
											<p className="text-gray-900">
												{user.motivo || 'No especificado'}
											</p>
										</div>
									</div>

									<div className="mt-8 flex space-x-4">
										<button
											onClick={() => setIsEditing(true)}
											className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
										>
											<span>Editar información</span>
										</button>
										<button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
											<span>Realizar Checkout</span>
										</button>
									</div>
								</div>
							</div>
						)}

						{/* Historial de citas */}
						<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-6">
									Historial de Citas
								</h3>
								<div className="space-y-4">
									{appointments.map((appointment) => (
										<div
											key={appointment.idCita}
											className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
										>
											<div className="flex items-center space-x-4">
												<Clock className="text-gray-400" size={20} />
												<div>
													<p className="font-medium text-gray-900">
														{formatDate(appointment.fechaHora)}
													</p>
													<p className="text-sm text-gray-500">
														{appointment.consultorio?.nombre} - Dr.{' '}
														{appointment.practicante?.nombre}
													</p>
												</div>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
													appointment.estado
												)}`}
											>
												{appointment.estado.charAt(0).toUpperCase() +
													appointment.estado.slice(1)}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
