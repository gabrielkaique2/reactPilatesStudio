import { useEffect, useState } from 'react';
import { getClinicas, deleteClinica } from '../services/clinicaService';

export default function ClinicaList({ onEdit }) {
  const [clinicas, setClinicas] = useState([]);

  useEffect(() => {
    loadClinicas();
  }, []);

  const loadClinicas = async () => {
    const { data } = await getClinicas();
    setClinicas(data);
  };

  const handleDelete = async (id) => {
    await deleteClinica(id);
    loadClinicas();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Lista de Clínicas</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Endereço</th>
            <th className='p-2 border'>Telefone</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clinicas.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.id}</td>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.address}</td>
              <td className="p-2 border">{c.phoneNumber}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => onEdit(c)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(c.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
