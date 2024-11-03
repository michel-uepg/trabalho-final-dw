import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AlunoList = () => {
    const [alunos, setAlunos] = useState([]);
    const [raBusca, setRaBusca] = useState(''); // Estado para o campo de busca por RA
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlunos();
    }, []);

    const fetchAlunos = async () => {
        try {
            const response = await axios.get('/alunos');
            setAlunos(response.data);
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
        }
    };

    const handleDelete = async (ra) => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este aluno?');
        if (confirmDelete) {
            try {
                await axios.delete(`/alunos/${ra}`);
                fetchAlunos();
                alert('Aluno deletado com sucesso!');
            } catch (error) {
                console.error("Erro ao deletar o aluno:", error);
                alert('Erro ao deletar o aluno.');
            }
        }
    };

    const handleLancarNotas = (ra) => {
        navigate(`/lancar-notas/${ra}`);
    };

    const handleSearch = async () => {
        if (raBusca) {
            try {
                const response = await axios.get(`/alunos/${raBusca}`);
                setAlunos([response.data]); // Exibe apenas o aluno buscado
            } catch (error) {
                console.error("Erro ao buscar aluno:", error);
                alert('Aluno não encontrado.');
            }
        } else {
            fetchAlunos(); // Recarrega todos os alunos se o campo de busca estiver vazio
        }
    };

    // Função para formatar a data de nascimento
    const formatarData = (data) => {
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className="container">
            <h2>Lista de Alunos</h2>

            {/* Campo de busca por RA */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por RA"
                    value={raBusca}
                    onChange={(e) => setRaBusca(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    <i className="bi bi-search"></i> Buscar
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>RA</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map(aluno => (
                        <tr key={aluno.ra}>
                            <td>{aluno.ra}</td>
                            <td>{aluno.nome}</td>
                            <td>{formatarData(aluno.dataNasc)}</td>
                            <td>
                                <Link to={`/editar/${aluno.ra}`} className="btn btn-warning btn-sm me-2">
                                    <i className="bi bi-pencil-fill"></i> Editar
                                </Link>
                                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(aluno.ra)}>
                                    <i className="bi bi-trash-fill"></i> Deletar
                                </button>
                                <button className="btn btn-info btn-sm" onClick={() => handleLancarNotas(aluno.ra)}>
                                    <i className="bi bi-journal"></i> Lançar Notas
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlunoList;
