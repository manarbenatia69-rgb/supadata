package com.projet.supadata.Service;

import com.projet.supadata.Entity.Employer;
import com.projet.supadata.Entity.ResponsableEntreprise;

import java.util.List;
import java.util.Optional;

public interface ResponsableEntrepriseService {

    ResponsableEntreprise AjouterResponsableEntreprise( ResponsableEntreprise responsableEntreprise);

    ResponsableEntreprise Modifier ( ResponsableEntreprise responsableEntreprise);

    List<ResponsableEntreprise> AfficherResponsableEntreprise();

    void supprimerResponsableEntreprise(Long id);

    Optional<ResponsableEntreprise> AfficherResponsableEntrepriseById(Long id);
}
