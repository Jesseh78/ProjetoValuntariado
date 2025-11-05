package com.example.back_voluntariado.repository;

import com.example.back_voluntariado.model.Voluntario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoluntarioRepository extends JpaRepository<Voluntario, Long> {
}
