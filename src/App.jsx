import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClinicaPage from './pages/ClinicaPage';
import InstrutorPage from './pages/InstrutorPage';

function App() {
  return (
    <Router>
      {/* Navbar simples */}
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/" className="font-bold hover:underline">Home</Link>
        <Link to="/clinicas" className="hover:underline">Clínicas</Link>
        <Link to="/instrutores" className="hover:underline">Instrutores</Link>
      </nav>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<h1 className="p-6 text-center">Bem-vindo ao Sistema de Pilates 🧘‍♀️</h1>} />
        <Route path="/clinicas" element={<ClinicaPage />} />
        <Route path="/instrutores" element={<InstrutorPage />} />
        <Route path="*" element={<h1 className="p-6 text-center">Bem-vindo ao Sistema de Pilates 🧘‍♀️</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
