package com.projet.supadata.Repository;

import com.projet.supadata.Entity.ResponsableEntreprise;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsableEntrepriseRepository extends JpaRepository<ResponsableEntreprise, Long> {


    boolean existsByEmail(String email);

    ResponsableEntreprise findResponsableEntrepriseByEmail(String email);
}
