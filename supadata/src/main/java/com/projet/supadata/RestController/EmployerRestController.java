package com.projet.supadata.RestController;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projet.supadata.Entity.Employer;
import com.projet.supadata.Entity.EmployerRequest;
import com.projet.supadata.Repository.ConfirmationTokenRepository;
import com.projet.supadata.Repository.EmployerRepository;
import com.projet.supadata.Service.EmployerService;
import com.projet.supadata.Service.FileStorageService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/employer")
@CrossOrigin("*")
public class EmployerRestController {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    EmployerRepository employerRepository;

    @Autowired
    EmployerService employerService;

    @Autowired
    FileStorageService fileStorageService;
    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;




    @PostMapping(
            value = "/ajouter",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> AjouterEmployer(
            @RequestPart("data") EmployerRequest dto,
            @RequestPart(required = false) MultipartFile profilepicture,
            @RequestPart(required = false) MultipartFile companylogo,
            @RequestPart(required = false) MultipartFile coverphoto
    ) throws IOException {

        HashMap<String, Object> response = new HashMap<>();

        if (employerRepository.existsByEmail(dto.getEmail())) {
            response.put("message", "Email existe déjà !");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        Employer employer = new Employer();
        employer.setJobtitle(dto.getJobtitle());
        employer.setNom(dto.getNom());
        employer.setPrenom(dto.getPrenom());
        employer.setEmail(dto.getEmail());
        employer.setPwd(bCryptPasswordEncoder.encode(dto.getPwd()));
        employer.setDepartement(dto.getDepartement());
        employer.setCompanyname(dto.getCompanyname());
        employer.setTelephone(dto.getTelephone());
        employer.setUrlcompany(dto.getUrlcompany());
        employer.setAdresse(dto.getAdresse());
        employer.setColor(dto.getColor());
        employer.setPolice(dto.getPolice());
        employer.setFblink(dto.getFblink());

        employer.setLinkedinlink(dto.getLinkedinlink());

        employer.setGithublink(dto.getGithublink());

        // Images
        employer.setProfilepicture(
                fileStorageService.save(profilepicture, "employer")
        );
        employer.setCompanylogo(fileStorageService.save(companylogo, "employer"));
        employer.setCoverphoto(fileStorageService.save(coverphoto, "employer"));

        Employer saved = employerRepository.save(employer);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }




    @RequestMapping(method = RequestMethod.GET)
    public List<Employer> AfficherEmployer() {
        return employerService.AfficherEmployer();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerEmployer(@PathVariable("id") Long id) {
        employerService.supprimerEmployer(id);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Employer> getEmployerById(@PathVariable("id") Long id) {

        Optional<Employer> employer = employerService.AfficherEmployerById(id);
        return employer;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Employer ModifierEmployer(@PathVariable("id") Long id, @RequestBody Employer employer) {
        employer.setPwd(this.bCryptPasswordEncoder.encode(employer.getPwd()));
        Employer savedUser = employerRepository.save(employer);

        Employer newEmployer = employerService.Modifier(employer);
        return newEmployer;
    }
    @GetMapping("/entreprise/{id}")
    public List<Employer> getEmployersByEntreprise(@PathVariable("id") Long id) {
        // houni t'kallam el service elli y'kallam el repository findByResponsableEntrepriseId(id)
        return employerService.getEmployersByEntreprise(id);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginEmployer(@RequestBody Employer employer) {
        System.out.println("in login-employer" + employer);
        HashMap<String, Object> response = new HashMap<>();

        Employer userFromDB = employerRepository.findEmployerByEmail(employer.getEmail());
        System.out.println("userFromDB+employer" + userFromDB);
        if (userFromDB == null) {
            response.put("message", "Employer not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(employer.getPwd(), userFromDB.getPwd());
            System.out.println("compare" + compare);
            if (!compare) {
                response.put("message", "Password incorrect!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
                String token = Jwts.builder()
                        .claim("data", userFromDB)
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }

    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    @PostMapping("/login-google")
    public ResponseEntity<Map<String, Object>> loginWithGoogle(@RequestParam("id_token") String idToken) {
        Map<String, Object> response = new HashMap<>();
        try {
            String googleUserInfo = validateGoogleToken(idToken);
            JsonNode userInfo = new ObjectMapper().readTree(googleUserInfo);

            String email = userInfo.get("email").asText();
            String fullName = userInfo.get("name").asText();
            String firstName = fullName.split(" ")[0]; // Prenons le prénom comme étant la première partie du nom complet
            String lastName = fullName.split(" ").length > 1 ? fullName.split(" ")[1] : ""; // Nom de famille s'il existe

            Employer existingEmployer = employerRepository.findEmployerByEmail(email);

            if (existingEmployer == null) {

                Employer newEmployer = new Employer();
                newEmployer.setEmail(email);
                newEmployer.setNom(lastName); // Nom
                newEmployer.setPrenom(firstName); // Prénom
                newEmployer.setPwd("defaultPassword"); // Mot de passe temporaire, à changer plus tard


                employerRepository.save(newEmployer);
                existingEmployer = newEmployer;
            }

            String token = generateToken(existingEmployer);
            response.put("token", token);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("message", "Erreur lors du traitement du token Google : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("message", "Une erreur inconnue est survenue.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private String validateGoogleToken(String idToken) {
        String url = GOOGLE_TOKEN_URL + idToken;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    private String generateToken(Employer Employer) {
        return Jwts.builder()
                .claim("data", Employer)
                .signWith(SignatureAlgorithm.HS256, "SECRET_KEY")
                .compact();
    }

}
