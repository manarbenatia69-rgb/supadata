package com.projet.supadata.Repository;

import com.projet.supadata.Entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployerRepository extends JpaRepository<Employer, Long > {

    Employer findEmployerByEmail(String email);

    boolean existsByEmail(String email);

    List<Employer> findByResponsableEntrepriseId(Long id);
}
