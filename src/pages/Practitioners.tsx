import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { UserPlus, Briefcase, MapPin, Users, Calendar } from 'lucide-react'
import type { Practitioner, Appointment } from '../types'
import axios from 'axios'


export default function Practitioners() {
	const [searchQuery, setSearchQuery] = useState('')
	const [practitioner, setPractitioner] = useState<Practitioner | null>(null)
	const [appointments, setAppointments] = useState<Appointment[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const formatHorario = (horario: Record<string, string[]>) => {
		const daysMapping: Record<string, string> = {
			'lunes': 'lun',
			'martes': 'mar',
			'miércoles': 'mie',
			'jueves': 'jue',
			'viernes': 'vie'
		}

		return Object.entries(horario).reduce((acc, [day, hours]) => {
			const shortDay = daysMapping[day]
			if (shortDay && hours.length > 0) {
				acc[shortDay] = hours
			}
			return acc
		}, {} as Record<string, string[]>)
	}

	const [formData, setFormData] = useState<Partial<Practitioner>>({
		nombre: '',
		numero_documento: '',
		tipo_documento: '',
		genero: '',
		estrato: '',
		barrio: '',
		localidad: '',
		horario: '',
	});


	const queryBd = async (searchQuery: string) => {
		try {
			const response = await axios.get(
				`http://localhost:3000/v1/front/practicante/${searchQuery}`
			)
			return response.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	const addPractitioner = async () => {
		try {
			const response = await axios.post('http://localhost:3000/v1/front/addPracticante', {
				nombre: formData.nombre,
				documento: formData.numero_documento,
				tipoDocumento: formData.tipo_documento,
				genero: formData.genero,
				estrato: formData.estrato,
				barrio: formData.barrio,
				localidad: formData.localidad,
				horario: formatHorario(formData.horario)
			})

			if (response.data) {
				setIsModalOpen(false)
				setPractitioner(response.data)
			}
		} catch (error) {
			console.error('Error adding practitioner:', error)
			alert('Error al agregar el practicante')
		}
	}

	const editPractitioner = async () => {
		try {
			const response = await axios.post('http://localhost:3000/v1/front/editPracticante', {
				nombre: formData.nombre,
				documento: formData.numero_documento,
				tipoDocumento: formData.tipo_documento,
				genero: formData.genero,
				estrato: formData.estrato,
				barrio: formData.barrio,
				localidad: formData.localidad,
				horario: formatHorario(formData.horario || {})
			})

			if (response.data) {
				setIsModalOpen(false)
				setPractitioner(response.data)
			}
		} catch (error) {
			console.error('Error editing practitioner:', error)
			alert('Error al editar el practicante')
		}
	}

	const handleSearch = async () => {
		console.log(searchQuery)
		const practitionerData = await queryBd(searchQuery)
		if (practitionerData) {
			setPractitioner(practitionerData)
			setAppointments(appointments)
		} else {
			setPractitioner(null)
			setAppointments([])
		}
	}

	const openAddModal = () => {
		setIsEditing(false)
		setFormData({
			nombre: '',
			numero_documento: '',
			tipo_documento: '',
			genero: '',
			estrato: '',
			barrio: '',
			localidad: '',
			horario: {
				lunes: [],
				martes: [],
				miércoles: [],
				jueves: [],
				viernes: []
			}
		})
		setIsModalOpen(true)
	}

	const openEditModal = () => {
		if (practitioner) {
			setIsEditing(true)
			setFormData({ ...practitioner })
			setIsModalOpen(true)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}


	const handleSubmit = () => {
		if (isEditing) {
			editPractitioner()
		} else {
			addPractitioner()
		}
	}

	
	return (
		<div className="p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Gestión de Practicantes</h1>
					<button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
						<UserPlus size={20} />
						<span>Nuevo Practicante</span>
					</button>
				</div>

				<div className="mb-8">
					<SearchBar
						placeholder="Buscar por documento de identidad (Prueba: 98765432)"
						value={searchQuery}
						onChange={setSearchQuery}
						onSearch={handleSearch}
					/>
				</div>

				{practitioner && (
					<div className="space-y-6">
						<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
							<div className="bg-gradient-to-r from-green-600 to-green-800 px-8 py-6">
								<div className="flex items-center space-x-4">
									<div className="bg-white/10 rounded-full p-3">
										<Briefcase size={32} className="text-white" />
									</div>
									<div>
										<h2 className="text-2xl font-bold text-white">
											{practitioner.nombre}
										</h2>
										<p className="text-green-200">{practitioner.tipo_documento}: {practitioner.numero_documento}</p>
									</div>
								</div>
							</div>

							<div className="p-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-6">
										<div className="flex items-center space-x-3">
											<MapPin className="text-gray-400" size={20} />
											<div>
												<p className="text-sm text-gray-500">Ubicación</p>
												<p className="font-medium text-gray-900">{practitioner.barrio}, {practitioner.localidad}</p>
											</div>
										</div>

										<div className="flex items-center space-x-3">
											<Users className="text-gray-400" size={20} />
											<div>
												<p className="text-sm text-gray-500">
													Sesiones realizadas
												</p>
												<p className="font-medium text-gray-900">
													{practitioner.sesiones}
												</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-lg font-semibold text-gray-900 mb-4">
											Horario disponible
										</h3>
										<div className="bg-gray-50 rounded-xl p-4 space-y-3">
											{Object.entries(practitioner.horario).map(
												([day, hours]) => (
													<div key={day} className="flex items-start">
														<span className="text-sm font-medium text-gray-600 w-24">
															{day}
														</span>
														<div className="flex flex-wrap gap-2">
															{(hours as string[]).map((hour: string, index: number) => (
																<span
																	key={index}
																	className="text-sm bg-white px-3 py-1 rounded-full border border-gray-200"
																>
																	{hour}
																</span>
															))}
														</div>
													</div>
												)
											)}
										</div>
									</div>
								</div>

								{/* Últimas sesiones */}
								<div className="mt-8 pt-6 border-t border-gray-100">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">
										Últimas sesiones
									</h3>
									<div className="space-y-4">
										{appointments.map((appointment) => (
											<div
												key={appointment.idCita}
												className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
											>
												<div className="flex items-center space-x-4">
													<Calendar className="text-gray-400" size={20} />
													<div>
														<p className="font-medium text-gray-900">
															{new Date(appointment.fechaHora).toLocaleDateString()}
														</p>
														<p className="text-sm text-gray-500">
															{appointment.usuario?.nombre}{' '}
															{appointment.usuario?.apellido} -{' '}
															{appointment.consultorio?.nombre}
														</p>
													</div>
												</div>
												<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
													Completada
												</span>
											</div>
										))}
									</div>
								</div>

								<div className="mt-8">
									<button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
										<span>Editar información</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)

}