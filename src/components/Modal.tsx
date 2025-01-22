import React from 'react'
import { X } from 'lucide-react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex min-h-screen items-center justify-center p-4">
				<div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
				<div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-lg">
					<div className="flex items-center justify-between border-b border-gray-200 p-6">
						<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
						<button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
							<X size={20} className="text-gray-500" />
						</button>
					</div>
					<div className="p-6">{children}</div>
				</div>
			</div>
		</div>
	)
}
