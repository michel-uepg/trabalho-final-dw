package com.trabalhodev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trabalhodev.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
