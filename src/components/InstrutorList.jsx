import { useEffect, useState } from 'react';
import { getInstrutores, deleteInstrutor } from '../services/instrutorService';

export default function InstrutorList({ onEdit }) {
  const [instrutores, setInstrutores] = useState([]);

  useEffect(() => {
    loadInstrutores();
  }, []);

  const loadInstrutores = async () => {
    const { data } = await getInstrutores();
    setInstrutores(data);
  };

  const handleDelete = async (id) => {
    await deleteInstrutor(id);
    loadInstrutores();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Lista de Instrutores</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Telefone</th>
            <th className="p-2 border">Ações</th>
            <th className="p-2 border">Clinica</th>
          </tr>
        </thead>
        <tbody>
          {instrutores.map((i) => (
            <tr key={i.id}>
              <td className="p-2 border">{i.id}</td>
              <td className="p-2 border">{i.firstName + " " +i.lastName}</td>
              <td className="p-2 border">{i.phoneNumber}</td>
              <td className="p-2 border">{i.clinica?.name}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => onEdit(i)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(i.id)}
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
