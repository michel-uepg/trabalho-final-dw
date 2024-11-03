import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const ListarNotas = () => {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        fetchAlunos();
    }, []);

    const fetchAlunos = async () => {
        try {
            const response = await axios.get('/alunos');
            const alunosComMedia = response.data.map((aluno) => {
                const media = (aluno.nota1 + aluno.nota2) / 2;
                const situacao = media >= 7 ? 'Aprovado' : 'Reprovado';
                return { ...aluno, media, situacao };
            });
            setAlunos(alunosComMedia);
        } catch (error) {
            console.error('Erro ao buscar as notas:', error);
            alert('Erro ao buscar as notas');
        }
    };

    return (
        <div className="container">
            <h2>Listagem de Notas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>RA</th>
                        <th>Nome</th>
                        <th>Nota 1</th>
                        <th>Nota 2</th>
                        <th>Média</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.ra}>
                            <td>{aluno.ra}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.nota1}</td>
                            <td>{aluno.nota2}</td>
                            <td>{aluno.media.toFixed(2)}</td>
                            <td>{aluno.situacao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarNotas;
