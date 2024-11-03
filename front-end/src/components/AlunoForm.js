import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AlunoForm = () => {
    const { ra } = useParams(); // Obtém o RA da URL para edição
    const navigate = useNavigate();
    const [aluno, setAluno] = useState({
        ra: '',
        nome: '',
        dataNasc: ''

    });

    useEffect(() => {
        if (ra) {
            // Se estamos editando, busca o aluno pelo RA
            const fetchAluno = async () => {
                try {
                    const response = await axios.get(`/alunos/${ra}`);
                    setAluno(response.data);
                } catch (error) {
                    console.error('Erro ao buscar o aluno:', error);
                    alert('Erro ao buscar o aluno');
                }
            };
            fetchAluno();
        }
    }, [ra]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno((prevAluno) => ({
            ...prevAluno,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (ra) {
                // Se estamos editando, fazemos um PUT
                await axios.put(`/alunos/${ra}`, {
                    nome: aluno.nome,
                    dataNasc: aluno.dataNasc
                });
                alert('Aluno atualizado com sucesso!');
            } else {
                // Se estamos cadastrando, fazemos um POST
                await axios.post('/alunos', aluno);
                alert('Aluno cadastrado com sucesso!');
            }
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data === 'RA já cadastrado.') {
                alert('Erro: RA já cadastrado.');
            } else {
                console.error('Erro ao salvar o aluno:', error);
                alert('Erro ao salvar o aluno');
            }
        }
    };    

    return (
        <div className="container">
            <h2>{ra ? 'Editar Aluno' : 'Cadastrar Aluno'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>RA</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ra"
                        value={aluno.ra}
                        onChange={handleChange}
                        required
                        readOnly={!!ra} // Só será readonly se estivermos editando
                    />
                </div>
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={aluno.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Data de Nascimento</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dataNasc"
                        value={aluno.dataNasc}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">
                <i className="bi bi-person-plus-fill"></i> {ra ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
};

export default AlunoForm;
