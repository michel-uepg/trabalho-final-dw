package com.trabalhodev.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Aluno {

    @Id
    private Long ra;

    private String nome;
    private String dataNasc;
    private Double nota1;
    private Double nota2;
    private Double media;
    private String situacao;

    // Construtor vazio
    public Aluno() {}

    // Getters e Setters
    public Long getRa() {
        return ra;
    }

    public void setRa(Long ra) {
        this.ra = ra;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(String dataNasc) {
        this.dataNasc = dataNasc;
    }

    public Double getNota1() {
        return nota1;
    }

    public void setNota1(Double nota1) {
        this.nota1 = nota1;
        calcularMediaESituacao();
    }

    public Double getNota2() {
        return nota2;
    }

    public void setNota2(Double nota2) {
        this.nota2 = nota2;
        calcularMediaESituacao();
    }

    public Double getMedia() {
        return media;
    }

    public String getSituacao() {
        return situacao;
    }

    // Método para calcular a média e situação
    private void calcularMediaESituacao() {
        if (this.nota1 != null && this.nota2 != null) {
            this.media = (this.nota1 + this.nota2) / 2;
            this.situacao = this.media >= 7 ? "Aprovado" : "Reprovado";
        }
    }
}
