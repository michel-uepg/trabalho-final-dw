import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-book-fill"></i> Sistema Acadêmico {/* Ícone de livro */}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="bi bi-list"></i> Listar Alunos {/* Ícone de lista */}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cadastro">
                                <i className="bi bi-person-plus-fill"></i> Cadastrar Aluno {/* Ícone de adicionar aluno */}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/listar-notas">
                                <i className="bi bi-file-earmark-bar-graph"></i> Listar Notas {/* Ícone de gráfico */}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
