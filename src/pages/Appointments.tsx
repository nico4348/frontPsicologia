import React, { useState } from 'react'
import { Calendar, Clock, User2, Building2 } from 'lucide-react'
import type { Appointment } from '../types'

const sampleAppointments: Appointment[] = [
	{
		idCita: '1',
		idConsultorio: '1',
		idUsuario: '1',
		idPracticante: '1',
		fechaHora: '2024-03-20 09:00',
		estado: 'pendiente',
		consultorio: { idConsultorio: '1', nombre: 'Consultorio 101', activo: true },
		usuario: {
			idUsuario: '1',
			nombre: 'María',
			apellido: 'González',
			telefonoPersonal: '3001234567',
			tipoDocumento: 'CC',
			testActual: 'ghq12',
			flujo: 'register',
			sesion: 3,
			estado: true,
			disponibilidad: {},
			ayudaPsicologica: 1,
			tratDatos: true,
		},
		practicante: {
			idPracticante: '1',
			numero_documento: '98765432',
			tipo_documento: 'CC',
			nombre: 'Carlos Ramírez',
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
		idUsuario: '2',
		idPracticante: '2',
		fechaHora: '2024-03-20 10:30',
		estado: 'completada',
		consultorio: { idConsultorio: '2', nombre: 'Consultorio 102', activo: true },
		usuario: {
			idUsuario: '2',
			nombre: 'Juan',
			apellido: 'Pérez',
			telefonoPersonal: '3009876543',
			tipoDocumento: 'CC',
			testActual: 'ghq12',
			flujo: 'register',
			sesion: 1,
			estado: true,
			disponibilidad: {},
			ayudaPsicologica: 1,
			tratDatos: true,
		},
		practicante: {
			idPracticante: '2',
			numero_documento: '12345678',
			tipo_documento: 'CC',
			nombre: 'Ana Martínez',
			genero: 'Femenino',
			estrato: '3',
			barrio: 'Laureles',
			localidad: 'Medellín',
			horario: {},
			sesiones: 32,
		},
	},
]

export default function Appointments() {
	const [appointments] = useState<Appointment[]>(sampleAppointments)

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

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat('es-CO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}).format(date)
	}

	return (
		<div className="p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Citas</h1>

				<div className="space-y-6">
					{appointments.map((appointment) => (
						<div
							key={appointment.idCita}
							className="bg-white rounded-2xl shadow-lg overflow-hidden"
						>
							<div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
								<div className="flex items-center space-x-3">
									<div className="bg-white/10 rounded-full p-2">
										<Calendar size={24} className="text-white" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-white">
											Cita #{appointment.idCita}
										</h3>
										<p className="text-purple-200 text-sm">
											{formatDate(appointment.fechaHora)}
										</p>
									</div>
								</div>
							</div>

							<div className="p-6">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="flex items-start space-x-3">
										<User2 className="text-gray-400 mt-1" size={20} />
										<div>
											<p className="text-sm text-gray-500">Paciente</p>
											<p className="font-medium text-gray-900">
												{`${appointment.usuario?.nombre} ${appointment.usuario?.apellido}`}
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-3">
										<Building2 className="text-gray-400 mt-1" size={20} />
										<div>
											<p className="text-sm text-gray-500">Consultorio</p>
											<p className="font-medium text-gray-900">
												{appointment.consultorio?.nombre}
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-3">
										<Clock className="text-gray-400 mt-1" size={20} />
										<div>
											<p className="text-sm text-gray-500">Estado</p>
											<span
												className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
													appointment.estado
												)}`}
											>
												{appointment.estado.charAt(0).toUpperCase() +
													appointment.estado.slice(1)}
											</span>
										</div>
									</div>
								</div>

								<div className="mt-6 pt-6 border-t border-gray-100">
									<div className="flex items-start space-x-3">
										<div className="flex-shrink-0">
											<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
												<User2 className="text-gray-500" size={20} />
											</div>
										</div>
										<div>
											<p className="text-sm text-gray-500">
												Practicante asignado
											</p>
											<p className="font-medium text-gray-900">
												{appointment.practicante?.nombre}
											</p>
											<p className="text-sm text-gray-500 mt-1">
												{appointment.practicante?.sesiones} sesiones
												realizadas
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
