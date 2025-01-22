import React from 'react'
import type { Practitioner } from '../types'

interface PractitionerFormProps {
	practitioner?: Practitioner
	onSubmit: (data: Partial<Practitioner>) => void
	onCancel: () => void
}

export default function PractitionerForm({
	practitioner,
	onSubmit,
	onCancel,
}: PractitionerFormProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const data: Partial<Practitioner> = {
			nombre: formData.get('nombre') as string,
			numero_documento: formData.get('numero_documento') as string,
			tipo_documento: formData.get('tipo_documento') as string,
			genero: formData.get('genero') as string,
			estrato: formData.get('estrato') as string,
			barrio: formData.get('barrio') as string,
			localidad: formData.get('localidad') as string,
			horario: {
				lunes: formData.getAll('horario_lunes'),
				martes: formData.getAll('horario_martes'),
				miércoles: formData.getAll('horario_miercoles'),
				jueves: formData.getAll('horario_jueves'),
				viernes: formData.getAll('horario_viernes'),
			},
		}
		onSubmit(data)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700">Nombre completo</label>
				<input
					type="text"
					name="nombre"
					defaultValue={practitioner?.nombre}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					required
				/>
			</div>

			<div className="grid grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Tipo de documento
					</label>
					<select
						name="tipo_documento"
						defaultValue={practitioner?.tipo_documento}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					>
						<option value="CC">Cédula de Ciudadanía</option>
						<option value="CE">Cédula de Extranjería</option>
						<option value="TI">Tarjeta de Identidad</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Número de documento
					</label>
					<input
						type="text"
						name="numero_documento"
						defaultValue={practitioner?.numero_documento}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700">Género</label>
					<select
						name="genero"
						defaultValue={practitioner?.genero}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					>
						<option value="Masculino">Masculino</option>
						<option value="Femenino">Femenino</option>
						<option value="Otro">Otro</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Estrato</label>
					<select
						name="estrato"
						defaultValue={practitioner?.estrato}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					>
						{[1, 2, 3, 4, 5, 6].map((estrato) => (
							<option key={estrato} value={estrato.toString()}>
								{estrato}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Barrio</label>
				<input
					type="text"
					name="barrio"
					defaultValue={practitioner?.barrio}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Localidad</label>
				<input
					type="text"
					name="localidad"
					defaultValue={practitioner?.localidad}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					required
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Horario disponible
				</label>
				<div className="space-y-4">
					{['lunes', 'martes', 'miércoles', 'jueves', 'viernes'].map((dia) => (
						<div key={dia} className="flex items-center space-x-4">
							<span className="w-24 text-sm font-medium text-gray-700 capitalize">
								{dia}
							</span>
							<div className="flex-1 grid grid-cols-2 gap-4">
								<input
									type="text"
									name={`horario_${dia}`}
									placeholder="8:00-12:00"
									defaultValue={practitioner?.horario?.[dia]?.[0]}
									className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
								/>
								<input
									type="text"
									name={`horario_${dia}`}
									placeholder="14:00-18:00"
									defaultValue={practitioner?.horario?.[dia]?.[1]}
									className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-end space-x-4">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Cancelar
				</button>
				<button
					type="submit"
					className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
				>
					{practitioner ? 'Guardar cambios' : 'Crear practicante'}
				</button>
			</div>
		</form>
	)
}
