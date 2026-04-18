package com.projet.supadata.Service;

import com.projet.supadata.Entity.Particulier;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ParticulierService {

    ResponseEntity<Object> AjouterParticulier(Particulier particulier);

    Particulier Modifier (Particulier particulier);

    List<Particulier> AfficherParticulier();

    void supprimerParticulier(Long id);

    Optional<Particulier> AfficherParticulierById(Long id);

    ResponseEntity<?> confirmationemail(String confirmationemail);
}
