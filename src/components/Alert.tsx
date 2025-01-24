import React from 'react';

interface AlertaProps {
  mensaje: string;
  tipo: 'error' | 'exito' | 'advertencia';
  mostrar: boolean;
  cerrarAlerta: () => void;
}

const AlertaPersonalizada: React.FC<AlertaProps> = ({ mensaje, tipo, mostrar, cerrarAlerta }) => {
  if (!mostrar) return null; // Si no se debe mostrar, no renderiza nada

  return (
    <div className={`p-4 mb-4 rounded-md flex justify-between items-center text-white ${tipo === 'error' ? 'bg-red-500' : tipo === 'exito' ? 'bg-green-500' : 'bg-yellow-500'}`}>
      <span>{mensaje}</span>
      <button onClick={cerrarAlerta} className="bg-transparent text-white font-bold p-1 ml-4 rounded-md hover:bg-white hover:text-black">
        X
      </button>
    </div>
  );
};

export default AlertaPersonalizada;
