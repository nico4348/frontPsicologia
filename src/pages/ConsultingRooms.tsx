import { useState, useEffect } from 'react'
import { Building2, Plus } from 'lucide-react'
import type { ConsultingRoom } from '../types'
import axios from 'axios'
import AlertaPersonalizada from '../components/Alert'

export default function ConsultingRooms() {
    const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>('');
    const [tipo, setTipo] = useState<'error' | 'exito' | 'advertencia'>('exito');

    const [rooms, setRooms] = useState<ConsultingRoom[]>([])
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<ConsultingRoom | null>(null)

    const showAlert = (mensaje: string, tipo: 'error' | 'exito' | 'advertencia') => {
        setMensaje(mensaje);
        setTipo(tipo);
        setMostrarAlerta(true);

        setTimeout(() => {
            setMostrarAlerta(false);
        }, 5000);
    }

    const fetchConsultorios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/v1/front/consultorios')
            setRooms(response.data)
        } catch (error) {
            console.error('Error al obtener los consultorios:', error)
            showAlert('Error al obtener los consultorios', 'error')
        }
    }

    const addConsultorio = async (consultorioData: Partial<ConsultingRoom>) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/front/addConsultorio', {
                nombre: consultorioData.nombre,
                activo: consultorioData.activo
            })

            if (response.data) {
                showAlert('Consultorio agregado exitosamente', 'exito')
                fetchConsultorios()
                setIsAddingNew(false)
            }
        } catch (error) {
            console.error('Error adding consultorio:', error)
            showAlert('Error al agregar el consultorio', 'error')
        }
    }

    const editConsultorio = async (consultorioData: Partial<ConsultingRoom>) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/front/editConsultorio', {
                idConsultorio: selectedRoom?.idConsultorio,
                nombre: consultorioData.nombre,
                activo: consultorioData.activo
            })

            if (response.data) {
                showAlert('Consultorio editado exitosamente', 'exito')
                fetchConsultorios()
                setIsEditing(false)
                setSelectedRoom(null)
            }
        } catch (error) {
            console.error('Error editing consultorio:', error)
            showAlert('Error al editar el consultorio', 'error')
        }
    }

    useEffect(() => {
        fetchConsultorios()
    }, [])

    const openAddConsultorioModal = () => {
        setIsAddingNew(true)
        setSelectedRoom(null)
    }

    const openEditConsultorioModal = (room: ConsultingRoom) => {
        setIsEditing(true)
        setSelectedRoom(room)
    }

    const handleSubmit = (data: Partial<ConsultingRoom>) => {
        if (isAddingNew) {
            addConsultorio(data)
        } else {
            editConsultorio(data)
        }
    }

    return (
        <div className="p-8">
            <AlertaPersonalizada
                mensaje={mensaje}
                tipo={tipo}
                mostrar={mostrarAlerta}
                cerrarAlerta={() => setMostrarAlerta(false)}
            />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Consultorios</h1>
                    <button 
                        onClick={openAddConsultorioModal}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <Plus size={20} />
                        <span>Nuevo Consultorio</span>
                    </button>
                </div>

                {/* Consultorio Form (similar to previous forms) would be added here */}
                {(isAddingNew || isEditing) && (
                    <ConsultorioForm
                        consultorio={selectedRoom || undefined}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setIsAddingNew(false)
                            setIsEditing(false)
                            setSelectedRoom(null)
                        }}
                    />
                )}

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

                                {/* <button 
                                    onClick={() => openEditConsultorioModal(room)}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Editar consultorio
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}