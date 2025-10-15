import { useState } from 'react';
import InstrutorForm from '../components/InstrutorForm';
import InstrutorList from '../components/InstrutorList';

export default function InstrutorPage() {
  const [selected, setSelected] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSaved = () => {
    setSelected(null);
    setReload(!reload);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <InstrutorForm selected={selected} onSaved={handleSaved} />
      <InstrutorList key={reload} onEdit={setSelected} />
    </div>
  );
}
