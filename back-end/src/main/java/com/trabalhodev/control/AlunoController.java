package com.trabalhodev.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabalhodev.model.Aluno;
import com.trabalhodev.repository.AlunoRepository;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    // Listar todos os alunos
    @GetMapping
    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }

    // Buscar um aluno pelo RA
    @GetMapping("/{ra}")
    public ResponseEntity<Aluno> buscarPorRa(@PathVariable Long ra) {
        return alunoRepository.findById(ra)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar um novo aluno
    @PostMapping
    public ResponseEntity<?> criarAluno(@RequestBody Aluno aluno) {
        if (alunoRepository.existsById(aluno.getRa())) {
        return ResponseEntity.badRequest().body("RA já cadastrado.");
        }
    Aluno novoAluno = alunoRepository.save(aluno);
    return ResponseEntity.ok(novoAluno);
}


    // Atualizar os dados de um aluno pelo RA
    @PutMapping("/{ra}")
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable Long ra, @RequestBody Aluno alunoAtualizado) {
        return alunoRepository.findById(ra)
                .map(aluno -> {
                    aluno.setNome(alunoAtualizado.getNome());
                    aluno.setDataNasc(alunoAtualizado.getDataNasc());
                    return ResponseEntity.ok(alunoRepository.save(aluno));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar um aluno pelo RA
    @DeleteMapping("/{ra}")
    public ResponseEntity<?> deletarAluno(@PathVariable Long ra) {
    return alunoRepository.findById(ra)
            .map(aluno -> {
                alunoRepository.delete(aluno);
                return ResponseEntity.ok().body("{ \"status\": \"Aluno deletado com sucesso.\" }");
            })
            .orElse(ResponseEntity.notFound().build());
}


    // Lógica para lançar notas
    @PutMapping("/lancar-notas/{ra}")
    public ResponseEntity<Aluno> lancarNotas(@PathVariable Long ra, @RequestBody Aluno alunoComNotas) {
        return alunoRepository.findById(ra)
                .map(aluno -> {
                    aluno.setNota1(alunoComNotas.getNota1());
                    aluno.setNota2(alunoComNotas.getNota2());
                    // A média e situação são calculadas automaticamente
                    return ResponseEntity.ok(alunoRepository.save(aluno));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
