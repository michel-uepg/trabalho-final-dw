import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const LancarNotas = () => {
    const { ra } = useParams(); // Pegando o RA da URL
    const [aluno, setAluno] = useState({});
    const [nota1, setNota1] = useState('');
    const [nota2, setNota2] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAluno();
    }, []);

    const fetchAluno = async () => {
        try {
            const response = await axios.get(`/alunos/${ra}`);
            setAluno(response.data);
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/alunos/lancar-notas/${ra}`, { nota1, nota2 });
            alert('Notas lançadas com sucesso');
            navigate('/');
        } catch (error) {
            console.error("Erro ao lançar as notas:", error);
        }
    };

    return (
        <div className="container">
            <h2>Lançar Notas</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>RA</label>
                    <input type="text" className="form-control" value={aluno.ra} readOnly />
                </div>
                <div className="form-group">
                    <label>Nome</label>
                    <input type="text" className="form-control" value={aluno.nome} readOnly />
                </div>
                <div className="form-group">
                    <label>Data de Nascimento</label>
                    <input type="text" className="form-control" value={aluno.dataNasc} readOnly />
                </div>
                <div className="form-group">
                    <label>Nota 1</label>
                    <input type="number" className="form-control" value={nota1} onChange={(e) => setNota1(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Nota 2</label>
                    <input type="number" className="form-control" value={nota2} onChange={(e) => setNota2(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3"><i className="bi bi-file-earmark-plus"></i> Salvar Notas</button>
            </form>
        </div>
    );
};

export default LancarNotas;
