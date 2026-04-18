package com.projet.supadata.Service;

import com.projet.supadata.Entity.Employer;
import com.projet.supadata.Repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerServiceImpl implements EmployerService{

    @Autowired
    EmployerRepository employerRepository;

    @Override
    public Employer AjouterEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    @Override
    public Employer Modifier(Employer employer) {
        return employerRepository.save(employer);
    }

    @Override
    public List<Employer> AfficherEmployer() {
        return employerRepository.findAll();
    }

    @Override
    public void supprimerEmployer(Long id) {
         employerRepository.deleteById(id);
    }

    @Override
    public Optional<Employer> AfficherEmployerById(Long id) {
        return employerRepository.findById(id);
    }
    @Override
    public List<Employer> getEmployersByEntreprise(Long id) {
        // Houni n'kallmou findByResponsableEntrepriseId elli zdneha fil Repo
        return employerRepository.findByResponsableEntrepriseId(id);
    }
}
