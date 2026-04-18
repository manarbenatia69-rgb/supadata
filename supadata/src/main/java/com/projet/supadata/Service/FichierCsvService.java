package com.projet.supadata.Service;


import com.projet.supadata.Entity.FichierCsv;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

public interface FichierCsvService {

    FichierCsv ajouterFichierCsv(long responsableEntrepriseId , FichierCsv fichierCsv);

    List<FichierCsv> afficherFichierCsv();

    Optional<FichierCsv> afficherFichierCsvById(Long id );

    void importEmployeesFromExcel(MultipartFile fichier, Long entrepriseId);

    ByteArrayInputStream generateExcelTemplate();

}
