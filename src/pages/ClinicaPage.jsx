import { useState } from 'react';
import ClinicaForm from '../components/ClinicaForm';
import ClinicaList from '../components/ClinicaList';

export default function ClinicaPage() {
  const [selected, setSelected] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSaved = () => {
    setSelected(null);
    setReload(!reload);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <ClinicaForm selected={selected} onSaved={handleSaved} />
      <ClinicaList key={reload} onEdit={setSelected} />
    </div>
  );
}
