# Sistema Acadêmico - API e Interface Web

Este repositório contém o trabalho final da disciplina de Desenvolvimento Web do 2º ano de Engenharia de Software da UEPG, um sistema acadêmico completo, incluindo a API de back-end e a interface de front-end para gerenciar alunos e notas.

# Equipe
- Michel de Lima
- Rafael Elger
- André Pereira Justiniano

## Estrutura do Projeto

- **Back-End-sistema-academico**: API desenvolvida em Java com Spring Boot, usando um banco de dados PostgreSQL.
- **Front-End-sistema-academico**: Interface web desenvolvida em ReactJS com Axios e Bootstrap, para interação com a API.

---

## Funcionalidades

### API - Back-End
- **Cadastro de Alunos**: Permite cadastrar alunos com RA (chave primária), nome e data de nascimento.
- **Lançamento de Notas**: Lança notas e calcula a média e situação (Aprovado/Reprovado).
- **Listagem de Notas**: Lista RA, nome, notas, média e situação de cada aluno.
- **Edição e Exclusão de Alunos**: Edita informações do aluno e exclui alunos cadastrados.

### Interface Web - Front-End
- **Listagem de Alunos**: Exibe uma lista de alunos com opções de editar, deletar e lançar notas.
- **Cadastro de Aluno**: Formulário para adicionar novos alunos com validação de RA único.
- **Lançamento de Notas**: Modal para inserir as notas de um aluno e calcular automaticamente a média e a situação.
- **Listagem de Notas**: Exibe a situação de cada aluno com base em suas notas.

---

## Rotas Principais
- Listar alunos: GET /api/alunos
- Cadastrar aluno: POST /api/alunos
- Editar aluno: PUT /api/alunos/{ra}
- Deletar aluno: DELETE /api/alunos/{ra}
- Lançar notas: PUT /api/alunos/lancar-notas/{ra}

### Frontend
- Listar Alunos: /
- Cadastrar Aluno: /cadastro
- Editar Aluno: /editar/{ra}
- Lançar Notas: /lancar-notas/{ra}
- Listar Notas: /listar-notas

## Pré-requisitos

- **Java 11+** (para a API)
- **Node.js e npm** (para o front-end)
- **PostgreSQL** (para o banco de dados)

---

## Comandos SQL para o banco de dados
```bash
CREATE TABLE aluno (
    ra BIGINT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nasc DATE NOT NULL,
    nota1 DECIMAL,
    nota2 DECIMAL,
    media DECIMAL,
    situacao BOOLEAN
);
