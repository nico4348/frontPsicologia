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
			horario: formData.get('horario') as string
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

			{/* <div>
				<label className="block text-sm font-medium text-gray-700">Horario</label>
				<input
					type="text"
					name="horario"
					defaultValue={practitioner?.horario}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					required
				/>
			</div> */}

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
