package com.example.back_voluntariado.controller;

import com.example.back_voluntariado.model.Voluntario;
import com.example.back_voluntariado.repository.VoluntarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voluntarios")
@CrossOrigin(origins = "*")
public class VoluntarioController {
    private final VoluntarioRepository r;

    public VoluntarioController(VoluntarioRepository r) {
        this.r = r;
    }
    @GetMapping
    public List<Voluntario> listar() {
        return r.findAll();
    }

    @PostMapping
    public Voluntario criar(@RequestBody Voluntario voluntario) {
        return r.save(voluntario);
    }

    @GetMapping("/{id}")
    public Voluntario buscar(@PathVariable Long id) {
        return r.findById(id).orElse(null);
    }
    @PutMapping("/{id}")
    public Voluntario atualizar(@PathVariable Long id, @RequestBody Voluntario dados) {
        Voluntario v = r.findById(id).orElseThrow();
        v.setNome(dados.getNome());
        v.setEmail(dados.getEmail());
        v.setTelefone(dados.getTelefone());
        v.setInteresse(dados.getInteresse());
        return r.save(v);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        r.deleteById(id);
    }

}
