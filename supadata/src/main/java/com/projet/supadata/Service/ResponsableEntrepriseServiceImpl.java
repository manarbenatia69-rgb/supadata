package com.projet.supadata.Service;

import com.projet.supadata.Entity.ResponsableEntreprise;
import com.projet.supadata.Repository.ResponsableEntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResponsableEntrepriseServiceImpl implements ResponsableEntrepriseService{

    @Autowired
    ResponsableEntrepriseRepository responsableEntrepriseRepository;

    @Override
    public ResponsableEntreprise AjouterResponsableEntreprise(ResponsableEntreprise responsableEntreprise) {
        return responsableEntrepriseRepository.save(responsableEntreprise);
    }

    @Override
    public ResponsableEntreprise Modifier(ResponsableEntreprise responsableEntreprise) {
        return responsableEntrepriseRepository.save(responsableEntreprise);
    }

    @Override
    public List<ResponsableEntreprise> AfficherResponsableEntreprise() {
        return responsableEntrepriseRepository.findAll();
    }

    @Override
    public void supprimerResponsableEntreprise(Long id) {
           responsableEntrepriseRepository.deleteById(id);
    }

    @Override
    public Optional<ResponsableEntreprise> AfficherResponsableEntrepriseById(Long id) {
        return responsableEntrepriseRepository.findById(id);
    }
}
