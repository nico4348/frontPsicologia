import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import UserForm from '../components/UserForm'
import { Phone, Mail, Calendar, User2, UserPlus } from 'lucide-react'
import type { User, Appointment } from '../types'
import axios from 'axios'
import AlertaPersonalizada from '../components/Alert'

export default function Users() {

    const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>('');
    const [tipo, setTipo] = useState<'error' | 'exito' | 'advertencia'>('exito'); // Estado para el tipo de alerta

    const showAlert = (mensaje: string, tipo: 'error' | 'exito' | 'advertencia') => {
        setMensaje(mensaje);
        setTipo(tipo);
        setMostrarAlerta(true);

        setTimeout(() => {
            setMostrarAlerta(false);
        }, 5000);
    }

    const [searchQuery, setSearchQuery] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingNew, setIsAddingNew] = useState(false)

    const queryBd = async (searchQuery: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/v1/front/user/${searchQuery}`)
            return response.data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    const addUser = async (userData: Partial<User>) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/front/addUser', {
                nombre: userData.nombre,
                apellido: userData.apellido,
                correo: userData.correo,
                tipoDocumento: userData.tipoDocumento,
                documento: userData.documento,
                telefonoPersonal: userData.telefonoPersonal
            })

            if (response.data) {
                setUser(response.data)
                if (isAddingNew) {
                    setIsAddingNew(false)
                }
            }

        } catch (error) {
            console.error('Error adding user:', error)
            alert('Error al agregar el usuario')
        }
    }

    const editUser = async (userData: Partial<User>) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/front/editUser', {
                nombre: userData.nombre,
                apellido: userData.apellido,
                correo: userData.correo,
                tipoDocumento: userData.tipoDocumento,
                documento: userData.documento,
                telefonoPersonal: userData.telefonoPersonal
            })

            if (response.data) {
                setUser(response.data)
                setIsEditing(false)
            }

            setUser(response.data)
            showAlert('Usuario Editado exitosamente',"exito")

        } catch (error) {
            console.error('Error editing user:', error)
            alert('Error al editar el usuario')
        }
    }

    const handleSearch = async () => {
        const userData = await queryBd(searchQuery)
        if (userData) {
            setUser(userData)
            setAppointments(appointments)
        } else {
            setUser(null)
            setAppointments([])
        }
    }

    const handleSubmit = (data: Partial<User>) => {
        if (isAddingNew) {
            addUser(data)
        } else {
            editUser(data)
        }
    }

    const openAddUserModal = () => {
        setIsAddingNew(true)
        setUser(null)
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

            <AlertaPersonalizada
                mensaje={mensaje}
                tipo={tipo}
                mostrar={mostrarAlerta}
                cerrarAlerta={() => setMostrarAlerta(false)}
            />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
                    <button
                        onClick={openAddUserModal}
                        className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        <UserPlus size={20} />
                        <span>Nuevo Usuario</span>
                    </button>
                </div>

                <div className="mb-8">
                    <SearchBar
                        placeholder="Buscar por documento de identidad (Prueba: 1234567890)"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSearch={handleSearch}
                    />
                </div>

                {(user || isAddingNew) && (
                    <div className="space-y-6">
                        {(isEditing || isAddingNew) ? (
                            <UserForm
                                user={user || undefined}
                                onSubmit={handleSubmit}
                                onCancel={() => {
                                    setIsEditing(false)
                                    setIsAddingNew(false)
                                }}
                                isNewUser={isAddingNew}
                            />
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-white/10 rounded-full p-3">
                                            <User2 size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{`${user?.nombre || ''} ${user?.apellido || ''}`}</h2>
                                            <p className="text-indigo-200">{`${user?.tipoDocumento || ''}: ${user?.documento || ''}`}</p>
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
                                                        {user?.correo || 'No registrado'}
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
                                                        {user?.telefonoPersonal || ''}
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
                                                        {user?.sesion || ''}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Estado actual
                                                </p>
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user?.estado
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {user?.estado ? '● Activo' : '● Inactivo'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex space-x-4">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                                        >
                                            <span>Editar información</span>
                                        </button>
                                        <button onClick={() => showAlert("Checkout Realizado", "exito")} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                                            <span>Realizar Checkout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Historial de citas */}
                        {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    )
}