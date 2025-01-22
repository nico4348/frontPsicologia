import React from 'react'
import type { User } from '../types'

interface UserFormProps {
	user?: User
	onSubmit: (data: Partial<User>) => void
	onCancel: () => void
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const data: Partial<User> = {
			nombre: formData.get('nombre') as string,
			apellido: formData.get('apellido') as string,
			correo: formData.get('correo') as string,
			telefonoPersonal: formData.get('telefonoPersonal') as string,
			documento: formData.get('documento') as string,
			tipoDocumento: formData.get('tipoDocumento') as string,
			motivo: formData.get('motivo') as string,
		}
		onSubmit(data)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700">Nombre</label>
					<input
						type="text"
						name="nombre"
						defaultValue={user?.nombre}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Apellido</label>
					<input
						type="text"
						name="apellido"
						defaultValue={user?.apellido}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Correo electrónico
				</label>
				<input
					type="email"
					name="correo"
					defaultValue={user?.correo}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>

			<div className="grid grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700">Teléfono</label>
					<input
						type="tel"
						name="telefonoPersonal"
						defaultValue={user?.telefonoPersonal}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Tipo de documento
					</label>
					<select
						name="tipoDocumento"
						defaultValue={user?.tipoDocumento}
						className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						required
					>
						<option value="CC">Cédula de Ciudadanía</option>
						<option value="CE">Cédula de Extranjería</option>
						<option value="TI">Tarjeta de Identidad</option>
					</select>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Documento</label>
				<input
					type="text"
					name="documento"
					defaultValue={user?.documento}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					required
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Motivo de consulta
				</label>
				<textarea
					name="motivo"
					defaultValue={user?.motivo}
					rows={3}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				></textarea>
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
					className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
				>
					Guardar cambios
				</button>
			</div>
		</form>
	)
}
