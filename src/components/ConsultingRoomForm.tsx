import React from 'react'
import type { ConsultingRoom } from '../types'

interface ConsultingRoomFormProps {
	room?: ConsultingRoom
	onSubmit: (data: Partial<ConsultingRoom>) => void
	onCancel: () => void
}

export default function ConsultingRoomForm({ room, onSubmit, onCancel }: ConsultingRoomFormProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const data: Partial<ConsultingRoom> = {
			nombre: formData.get('nombre') as string,
			activo: formData.get('activo') === 'true',
		}
		onSubmit(data)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Nombre del consultorio
				</label>
				<input
					type="text"
					name="nombre"
					defaultValue={room?.nombre}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					required
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Estado</label>
				<select
					name="activo"
					defaultValue={room?.activo?.toString()}
					className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				>
					<option value="true">Disponible</option>
					<option value="false">No disponible</option>
				</select>
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
					className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
				>
					{room ? 'Guardar cambios' : 'Crear consultorio'}
				</button>
			</div>
		</form>
	)
}
