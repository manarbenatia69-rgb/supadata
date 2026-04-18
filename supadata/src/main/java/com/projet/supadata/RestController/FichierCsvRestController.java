package com.projet.supadata.RestController;
import com.projet.supadata.Entity.FichierCsv;
import com.projet.supadata.Repository.FichierCsvRepository;
import com.projet.supadata.Service.FichierCsvService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value ="/fichiercsv")
@CrossOrigin("*")

public class FichierCsvRestController {

    @Autowired
    FichierCsvService fichierCsvService;



    @PostMapping("/rentreprise/{responsableEntrepriseId}")
    public ResponseEntity<FichierCsv> createFichierCsv(
            @PathVariable Long responsableEntrepriseId,
            @RequestBody FichierCsv fichierCsv
    ) {
        FichierCsv created = fichierCsvService.ajouterFichierCsv(responsableEntrepriseId,fichierCsv);
        return ResponseEntity.ok(created);
    }



    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<FichierCsv> getFichierCsvById(@PathVariable("id") Long id){

        Optional<FichierCsv> fichierCsv = fichierCsvService.afficherFichierCsvById(id);
        return fichierCsv;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<FichierCsv> AfficherFichierCsv(){

        return fichierCsvService.afficherFichierCsv();

    }
    @GetMapping("/download-template")
    public ResponseEntity<InputStreamResource> downloadTemplate() {

        ByteArrayInputStream file = fichierCsvService.generateExcelTemplate();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=employees_template.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(file));
    }


    @PostMapping("/upload/{entrepriseId}")
    public ResponseEntity<?> uploadEmployees(
            @RequestParam("file") MultipartFile file,
            @PathVariable Long entrepriseId) {

        try {
            fichierCsvService.importEmployeesFromExcel(file, entrepriseId);

            return ResponseEntity.ok("Employees ajoutés avec succès ✅");

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur: " + e.getMessage());
        }
    }
}
