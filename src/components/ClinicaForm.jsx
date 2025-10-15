import { useState, useEffect } from 'react';
import { createClinica, updateClinica } from '../services/clinicaService';

export default function ClinicaForm({ selected, onSaved }) {
  const [clinica, setClinica] = useState({ name: '', address: '', phoneNumber: '' });

  useEffect(() => {
    setClinica(selected ?? { name: '', address: '', phoneNumber: '' });
  }, [selected]);

  const handleChange = (e) => {
    setClinica({ ...clinica, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clinica.id) {
      await updateClinica(clinica.id, clinica);
    } else {
      await createClinica(clinica);
    }
    setClinica({ name: '', address: '' , phoneNumber: ''});
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded">
      <h2 className="text-xl font-bold mb-2">Cadastro de Clínica</h2>
      <input
        className="border p-2 w-full mb-2"
        name="name"
        placeholder="Nome"
        value={clinica.name}
        onChange={handleChange}
      />
      <input
        className="border p-2 w-full mb-2"
        name="address"
        placeholder="Endereço"
        value={clinica.address}
        onChange={handleChange}
      />
      <input
        className="border p-2 w-full mb-2"
        name="phoneNumber"
        placeholder="Contato"
        value={clinica.phoneNumber}
        onChange={handleChange}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}
