import { useState, useEffect } from 'react';
import { createInstrutor, updateInstrutor } from '../services/instrutorService';
import { getClinicas } from '../services/clinicaService';

export default function InstrutorForm({ selected, onSaved }) {
  const [instrutor, setInstrutor] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    username: '',
    password: '',
    email: '',
    clinicId: ''
  });

  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1) Carrega as clínicas ao montar
  useEffect(() => {
    async function fetchClinicas() {
      try {
        const data = await getClinicas();
        // suporta array simples ou { content: [...] } (Spring pageable)
        //const list = Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
        setClinicas(data.data);
        console.log(data.data);
      } catch (err) {
        console.error('Erro ao carregar clínicas:', err);
        setClinicas([]);
        
      }
    }
    fetchClinicas();
  }, []);

  // 2) Quando o selected muda, preenche o formulário
  useEffect(() => {
    if (selected) {
      setInstrutor({
        id: selected.id ?? null,
        firstName: selected.firstName ?? '',
        lastName: selected.lastName ?? '',
        phoneNumber: selected.phoneNumber ?? '',
        username: selected.username ?? '',
        // por segurança não preencher password do backend; usuário digita se quiser trocar
        password: '',
        email: selected.email ?? '',
        clinicId: selected.clinic?.id ?? ''
      });
    } else {
      // novo cadastro
      setInstrutor({
        id: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        password: '',
        email: '',
        clinicId: ''
      });
    }
  }, [selected]);

  // 3) handleChange genérico
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstrutor(prev => ({ ...prev, [name]: value }));
  };

  // 4) handleSubmit completo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // montar payload no formato que o backend espera
      const payload = {
        firstName: instrutor.firstName,
        lastName: instrutor.lastName,
        phoneNumber: instrutor.phoneNumber,
        username: instrutor.username,
        email: instrutor.email,
        // backend espera um objeto clinic: { id: ... }
        clinic: instrutor.clinicId ? { id: Number(instrutor.clinicId) } : null
      };

      // só enviar senha se foi informada (útil em edição)
      if (instrutor.password && instrutor.password.trim() !== '') {
        payload.password = instrutor.password;
      }

      console.log('📤 Payload enviado ao backend:', payload);

      if (instrutor.id) {
        // edição
        await updateInstrutor(instrutor.id, payload);
      } else {
        // criação
        await createInstrutor(payload);
      }

      // limpar formulário após salvar
      setInstrutor({
        id: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        password: '',
        email: '',
        clinicId: ''
      });

      // notifica o componente pai para recarregar lista, etc.
      if (onSaved) onSaved();
    } catch (err) {
      console.error('Erro ao salvar instrutor:', err);
      // aqui você pode mostrar uma notificação de erro para o usuário
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded">
      <h2 className="text-xl font-bold mb-2">Cadastro de Instrutor</h2>

      <input
        className="border p-2 w-full mb-2"
        name="firstName"
        placeholder="Nome"
        value={instrutor.firstName}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        name="lastName"
        placeholder="Sobrenome"
        value={instrutor.lastName}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        name="email"
        placeholder="E-mail"
        type="email"
        value={instrutor.email}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        name="phoneNumber"
        placeholder="Telefone"
        value={instrutor.phoneNumber}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        name="username"
        placeholder="Username"
        value={instrutor.username}
        onChange={handleChange}
      />

      {/* senha: em edição, deixar em branco para não sobrescrever */}
      <input
        className="border p-2 w-full mb-2"
        name="password"
        placeholder={instrutor.id ? "Digite nova senha (ou deixe em branco)" : "Senha"}
        type="password"
        value={instrutor.password}
        onChange={handleChange}
      />

      <select
        className="border p-2 w-full mb-2"
        name="clinicId"
        value={instrutor.clinicId}
        onChange={handleChange}
      >
        <option value="">Selecione uma clínica</option>
        {Array.isArray(clinicas) && clinicas.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name ?? c.nome ?? `Clínica ${c.id}`}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}
