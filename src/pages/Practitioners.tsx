import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import PractitionerForm from '../components/PractitionerForm'
import { UserPlus, Briefcase, MapPin, Users, Calendar } from 'lucide-react'
import type { Practitioner, Appointment } from '../types'
import axios from 'axios'
import AlertaPersonalizada from '../components/Alert'

export default function Practitioners() {
    const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>('');
    const [tipo, setTipo] = useState<'error' | 'exito' | 'advertencia'>('exito');

    const showAlert = (mensaje: string, tipo: 'error' | 'exito' | 'advertencia') => {
        setMensaje(mensaje);
        setTipo(tipo);
        setMostrarAlerta(true);

        setTimeout(() => {
            setMostrarAlerta(false);
        }, 5000);
    }

    const [searchQuery, setSearchQuery] = useState('')
    const [practitioner, setPractitioner] = useState<Practitioner | null>(null)
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingNew, setIsAddingNew] = useState(false)

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

    const queryBd = async (searchQuery: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/v1/front/practicante/${searchQuery}`)
            return response.data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    const addPractitioner = async (data: Partial<Practitioner>) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/front/addPracticante', {
                nombre: data.nombre,
                documento: data.numero_documento,
                tipoDocumento: data.tipo_documento,
                genero: data.genero,
                estrato: data.estrato,
                barrio: data.barrio,
                localidad: data.localidad,
                horario: formatHorario(JSON.parse(data.horario || '{}'))
            })

            if (response.data) {
                setPractitioner(response.data)
                showAlert('Practicante agregado exitosamente', 'exito')
                setIsAddingNew(false)
            }
        } catch (error) {
            console.error('Error adding practitioner:', error)
            showAlert('Error al agregar el practicante', 'error')
        }
    }

    const editPractitioner = async (data: Partial<Practitioner>) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/front/editPracticante', {
                nombre: data.nombre,
                documento: data.numero_documento,
                tipoDocumento: data.tipo_documento,
                genero: data.genero,
                estrato: data.estrato,
                barrio: data.barrio,
                localidad: data.localidad,
                horario: formatHorario(JSON.parse(data.horario || '{}'))
            })

            if (response.data) {
                setPractitioner(response.data)
                showAlert('Practicante editado exitosamente', 'exito')
                setIsEditing(false)
            }
        } catch (error) {
            console.error('Error editing practitioner:', error)
            showAlert('Error al editar el practicante', 'error')
        }
    }

    const handleSearch = async () => {
        const practitionerData = await queryBd(searchQuery)
        if (practitionerData) {
            setPractitioner(practitionerData)
            setAppointments(appointments)
        } else {
            setPractitioner(null)
            setAppointments([])
        }
    }

    const openAddPractitionerModal = () => {
        setIsAddingNew(true)
        setIsEditing(false)
        setPractitioner(null)
    }

    const handleSubmit = (data: Partial<Practitioner>) => {
        if (isAddingNew) {
            addPractitioner(data)
        } else {
            editPractitioner(data)
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
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Practicantes</h1>
                    <button 
                        onClick={openAddPractitionerModal}
                        className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
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

                {(practitioner || isAddingNew) && (
                    <div className="space-y-6">
                        {(isEditing || isAddingNew) ? (
                            <PractitionerForm
                                practitioner={practitioner || undefined}
                                onSubmit={handleSubmit}
                                onCancel={() => {
                                    setIsEditing(false)
                                    setIsAddingNew(false)
                                }}
                            />
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-600 to-green-800 px-8 py-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-white/10 rounded-full p-3">
                                            <Briefcase size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">
                                                {practitioner?.nombre}
                                            </h2>
                                            <p className="text-green-200">
                                                {practitioner?.tipo_documento}: {practitioner?.numero_documento}
                                            </p>
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
                                                    <p className="font-medium text-gray-900">
                                                        {practitioner?.barrio}, {practitioner?.localidad}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <Users className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-sm text-gray-500">Sesiones realizadas</p>
                                                    <p className="font-medium text-gray-900">
                                                        {practitioner?.sesiones || ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Horario disponible
                                            </h3>
                                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                                {practitioner?.horario && Object.entries(practitioner.horario).map(
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

                                    <div className="mt-8 flex space-x-4">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                                        >
                                            <span>Editar información</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}