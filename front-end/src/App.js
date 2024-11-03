import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AlunoList from './components/AlunoList';
import AlunoForm from './components/AlunoForm';
import LancarNotas from './components/LancarNotas';
import Navbar from './components/Navbar';
import ListarNotas from './components/ListarNotas';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<AlunoList />} />
                    <Route path="/cadastro" element={<AlunoForm />} />
                    <Route path="/editar/:ra" element={<AlunoForm />} />
                    <Route path="/lancar-notas/:ra" element={<LancarNotas />} />
                    <Route path="/listar-notas" element={<ListarNotas />} /> {/* Nova rota para listar notas */}
                </Routes>
            </div>
        </div>
    );
}

export default App;
