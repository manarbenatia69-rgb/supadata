package com.projet.supadata.Service;


import com.projet.supadata.Entity.Employer;
import com.projet.supadata.Entity.FichierCsv;
import com.projet.supadata.Entity.ResponsableEntreprise;
import com.projet.supadata.Repository.EmployerRepository;
import com.projet.supadata.Repository.FichierCsvRepository;
import com.projet.supadata.Repository.ResponsableEntrepriseRepository;
import jakarta.transaction.Transactional;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static java.sql.JDBCType.BOOLEAN;
import static java.sql.JDBCType.NUMERIC;
import static javax.management.openmbean.SimpleType.STRING;
import static org.hibernate.boot.models.HibernateAnnotations.FORMULA;

@Service
public class FichierCsvServiceImpl implements FichierCsvService{

    @Autowired
    FichierCsvRepository fichierCsvRepository;
    @Autowired
    ResponsableEntrepriseRepository responsableEntrepriseRepository;
    @Autowired
    EmployerRepository employerRepository;
    @Autowired
    JavaMailSender mailSender;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public FichierCsv ajouterFichierCsv(long responsableEntrepriseId, FichierCsv fichierCsv) {
      ResponsableEntreprise responsableEntreprise= responsableEntrepriseRepository.findById(responsableEntrepriseId)
                .orElseThrow(() -> new RuntimeException("fichierCsv not found"));

        fichierCsv.setResponsableEntreprise(responsableEntreprise);
        fichierCsv.setFichier(fichierCsv.getFichier());

        return fichierCsvRepository.save(fichierCsv);
    }

    @Override
    public List<FichierCsv> afficherFichierCsv() {
        return fichierCsvRepository.findAll();
    }

    @Override
    public Optional<FichierCsv> afficherFichierCsvById(Long id) {
        return fichierCsvRepository.findById(id);
    }

    @Transactional

    public void importEmployeesFromExcel(MultipartFile file, Long entrepriseId) {

        if (file.isEmpty()) {
            throw new RuntimeException("Fichier vide !");
        }

        String filename = file.getOriginalFilename();

        if (filename == null) {
            throw new RuntimeException("Nom fichier invalide");
        }

        try {

            // =========================
            // 1. Save file to folder
            // =========================
            String uploadDir = "C:/PFE/frontend/src/assets/uploads/";
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String newFileName = System.currentTimeMillis() + "_" + filename;
            Path filePath = uploadPath.resolve(newFileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // =========================
            // 2. Get entreprise
            // =========================
            ResponsableEntreprise entreprise = responsableEntrepriseRepository.findById(entrepriseId)
                    .orElseThrow(() -> new RuntimeException("Entreprise introuvable"));

            // =========================
            // 3. Save fichiercsv in DB
            // =========================
            FichierCsv fichier = new FichierCsv();
            fichier.setFilename(newFileName);
            fichier.setFilepath(filePath.toString());
            fichier.setUploadDate(LocalDateTime.now());
            fichier.setResponsableEntreprise(entreprise);

            fichierCsvRepository.save(fichier);

            // =========================
            // 4. Read Excel
            // =========================
            Workbook workbook;

            if (filename.endsWith(".xlsx")) {
                //workbook = new XSSFWorkbook(file.getInputStream());
                InputStream fis = Files.newInputStream(filePath);

                if (filename.endsWith(".xlsx")) {
                    workbook = new XSSFWorkbook(fis);
                } else {
                    workbook = new HSSFWorkbook(fis);
                }
            } else if (filename.endsWith(".xls")) {
                // workbook = new HSSFWorkbook(file.getInputStream());
                InputStream fis = Files.newInputStream(filePath);

                if (filename.endsWith(".xlsx")) {
                    workbook = new XSSFWorkbook(fis);
                } else {
                    workbook = new HSSFWorkbook(fis);
                }
            } else {
                throw new RuntimeException("Format non supporté (xlsx, xls)");
            }

            Sheet sheet = workbook.getSheetAt(0);

            // =========================
            // 5. Import employees
            // =========================
            for (Row row : sheet) {

                if (row.getRowNum() == 0) continue;
                System.out.println("Processing row: " + row.getRowNum());



                String nom = getCellValue(row.getCell(0));
                String prenom = getCellValue(row.getCell(1));
                String email = getCellValue(row.getCell(2));
                String pwd = getCellValue(row.getCell(3));

                System.out.println("nom=" + nom);
                System.out.println("prenom=" + prenom);
                System.out.println("email=" + email);
                System.out.println("pwd=" + pwd);
                System.out.println("------------");




                //if (email == null || email.isEmpty()) continue;
                if (email == null || email.trim().isEmpty() || !email.contains("@")) {
                    System.out.println("❌ Email invalide: " + email);
                    continue;
                }

                email = email.trim();

                if (employerRepository.existsByEmail(email)) continue;


                Employer emp = new Employer();
                emp.setNom(nom);
                emp.setPrenom(prenom);
                emp.setEmail(email);

                String encodedPwd = bCryptPasswordEncoder.encode(pwd);
                emp.setPwd(encodedPwd);
                emp.setResponsableEntreprise(entreprise);

// ✅ save FIRST
                employerRepository.save(emp);
// ✅ THEN send email
                //sendEmail(emp, pwd);
                try {
                    System.out.println("📧 Trying to send email to: " + email);

                    sendEmail(emp, pwd);

                    System.out.println("✅ Email sent to: " + email);

                } catch (Exception e) {
                    System.out.println("❌ Email FAILED to: " + email);
                    e.printStackTrace();
                }

                System.out.println("Email sent to: " + email);
                System.out.println("Email = " + email);
            }

            workbook.close();

        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public ByteArrayInputStream generateExcelTemplate() {

        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Employees");


            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("nom");
            header.createCell(1).setCellValue("prenom");
            header.createCell(2).setCellValue("email");
            header.createCell(3).setCellValue("pwd");


            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);

            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            throw new RuntimeException("Erreur génération Excel");
        }
    }


    private String getCellValue(Cell cell) {
        if (cell == null) return null;

        try {
            switch (cell.getCellType()) {
                case STRING:
                    return cell.getStringCellValue().trim();

                case NUMERIC:
                    return String.valueOf(cell.getNumericCellValue());

                case BOOLEAN:
                    return String.valueOf(cell.getBooleanCellValue());

                case FORMULA:
                    return cell.getCellFormula();

                default:
                    return null;
            }
        } catch (Exception e) {
            return null;
        }}






    // 📧 email function
    private void sendEmail(Employer emp, String rawPassword) {

        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(emp.getEmail());
            message.setSubject("Votre compte a été créé");

            message.setText(
                    "Bonjour " + emp.getPrenom() + ",\n\n" +
                            "Votre compte a été créé avec succès.\n\n" +
                            "Email: " + emp.getEmail() + "\n" +
                            "Mot de passe: " + rawPassword + "\n\n" +
                            "Veuillez vous connecter et compléter votre profil.\n\n" +
                            "Merci."
            );

            mailSender.send(message);

        }
        //catch (Exception e) {
        //   e.printStackTrace();
        // }

        catch (Exception e) {
            System.out.println("❌ Error sending email to: " + emp.getEmail());
            e.printStackTrace();
            throw e;
        }
}}
