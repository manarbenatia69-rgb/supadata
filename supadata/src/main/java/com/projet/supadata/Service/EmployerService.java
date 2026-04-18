package com.projet.supadata.Service;
import com.projet.supadata.Entity.Employer;

import java.util.List;
import java.util.Optional;

public interface EmployerService {

    Employer AjouterEmployer(Employer employer);

    Employer Modifier ( Employer employer);

    List< Employer> AfficherEmployer();

    void supprimerEmployer(Long id);

    Optional<Employer> AfficherEmployerById(Long id);

    List<Employer> getEmployersByEntreprise(Long id);
}
