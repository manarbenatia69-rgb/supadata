package com.projet.supadata.RestController;



import com.projet.supadata.Entity.ResponsableEntreprise;
import com.projet.supadata.Repository.ResponsableEntrepriseRepository;

import com.projet.supadata.Service.EmailService;
import com.projet.supadata.Service.ResponsableEntrepriseService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping(value = "/rentreprise")
@CrossOrigin("*")
public class ResponsableEntrepriseRestController {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ResponsableEntrepriseRepository responsableEntrepriseRepository;

    @Autowired
    ResponsableEntrepriseService responsableEntrepriseService;

    @Autowired
    EmailService emailService;


  @RequestMapping(method = RequestMethod.POST )
  ResponseEntity<?> AjouterResponsableEntreprise (@RequestBody ResponsableEntreprise responsableEntreprise){

    HashMap<String, Object> response = new HashMap<>();
    if(responsableEntrepriseRepository.existsByEmail(responsableEntreprise.getEmail())){
        response.put("message", "email exist deja !");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }else{
        responsableEntreprise.setPwd(this.bCryptPasswordEncoder.encode(responsableEntreprise.getPwd()));
        ResponsableEntreprise savedUser = responsableEntrepriseRepository.save(responsableEntreprise);

        // Send verification email after successful registration
        String subject = "Bienvenue - Vérification de votre compte";
        String text = "Votre compte ResponsableEntreprise a été créé avec succès!\n\n"
                + "Email: " + savedUser.getEmail() + "\n"
                + "Nom: " + savedUser.getNom() + "\n\n"
                + "Veuillez attendre la validation de votre compte par l'administrateur.";
        emailService.SendSimpleMessage(savedUser.getEmail(), subject, text);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
    @RequestMapping(method = RequestMethod.GET)
    public List<ResponsableEntreprise> AfficherResponsableEntreprise() {
        return responsableEntrepriseService.AfficherResponsableEntreprise();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void SupprimerResponsableEntreprise(@PathVariable("id") Long id) {
        responsableEntrepriseService.supprimerResponsableEntreprise(id);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<ResponsableEntreprise> getResponsableEntrepriseById(@PathVariable("id") Long id) {

        Optional<ResponsableEntreprise> responsableEntreprise = responsableEntrepriseService.AfficherResponsableEntrepriseById(id);
        return responsableEntreprise;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponsableEntreprise ModifierResponsableEntreprise(@PathVariable("id") Long id, @RequestBody ResponsableEntreprise responsableEntreprise) {
        responsableEntreprise.setPwd(this.bCryptPasswordEncoder.encode(responsableEntreprise.getPwd()));
        ResponsableEntreprise savedUser = responsableEntrepriseRepository.save(responsableEntreprise);

        ResponsableEntreprise newResponsableEntreprise = responsableEntrepriseService.Modifier(responsableEntreprise);
        return newResponsableEntreprise;
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginResponsableEntreprise
            (@RequestBody ResponsableEntreprise responsableEntreprise) {
        System.out.println("in login-ResponsableEntreprise" + responsableEntreprise);
        HashMap<String, Object> response = new HashMap<>();

        ResponsableEntreprise userFromDB = responsableEntrepriseRepository.findResponsableEntrepriseByEmail(responsableEntreprise.getEmail());
        System.out.println("userFromDB+responsableEntreprise" + userFromDB);
        if (userFromDB == null) {
            response.put("message", "ResponsableEntreprise not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(responsableEntreprise.getPwd(), userFromDB.getPwd());
            System.out.println("compare" + compare);
            if (!compare) {
                response.put("message", "Password incorrect!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
                if (userFromDB.isEtat()==true) {
                    String token = Jwts.builder()
                            .claim("data", userFromDB)
                            .signWith(SignatureAlgorithm.HS256, "SECRET")
                            .compact();
                    response.put("token", token);

                    System.out.println("hhh");
                    return ResponseEntity.status(HttpStatus.OK).body(response);
                }
                else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
                }}

        }
    }

    @PutMapping(value = "/updateetat/{id}")
    public ResponseEntity<Map<String, Object>> modifieretatRespoEntreprise(@RequestBody ResponsableEntreprise responsableEntreprise, @PathVariable("id") Long id) {
        ResponsableEntreprise newResponsableEntreprise = null;
        HashMap<String,Object>response=new HashMap<>();
        if (responsableEntrepriseRepository.findById(id).isPresent()) { //ken user deja mawjoud
            ResponsableEntreprise responsableEntreprise1 = responsableEntrepriseRepository.findById(id).get();
            var responsableEntrepriseid = responsableEntreprise.getId();
            var nom = responsableEntreprise.getNom();

            var telephone =responsableEntreprise.getTelephone();
            var email = responsableEntreprise.getEmail();
            var pwd = responsableEntreprise.getPwd();
            var profilepicture = responsableEntreprise.getProfilepicture();
            var companyLogo = responsableEntreprise.getCompanylogo();
            var coverPhoto = responsableEntreprise.getCoverphoto();
            var jobtitle = responsableEntreprise.getJobtitle();
            var departement = responsableEntreprise.getDepartement();
            var companyName = responsableEntreprise.getCompanyname();
            var urlcompany = responsableEntreprise.getUrlcompany();
            var adresse = responsableEntreprise.getAdresse();
            var color = responsableEntreprise.getColor();
            var police= responsableEntreprise.getPolice();
            var fbLink =responsableEntreprise.getFblink();
            var linkedinLink = responsableEntreprise.getLinkedinlink();
            var githubLink = responsableEntreprise.getGithublink();



            responsableEntreprise1.setId(responsableEntrepriseid);
            responsableEntreprise1.setNom(nom);

            responsableEntreprise1.setTelephone(telephone);
            responsableEntreprise1.setEmail(email);
            responsableEntreprise1.setPwd(pwd);
            responsableEntreprise1.setProfilepicture(profilepicture);
            responsableEntreprise1.setCompanylogo(companyLogo);
            responsableEntreprise1.setCoverphoto(coverPhoto);
            responsableEntreprise1.setPolice(police);
            responsableEntreprise1.setJobtitle(jobtitle);
            responsableEntreprise1.setLinkedinlink(linkedinLink);
            responsableEntreprise1.setGithublink(githubLink);
            responsableEntreprise1.setFblink(fbLink);
            responsableEntreprise1.setAdresse(adresse);
            responsableEntreprise1.setDepartement(departement);
            responsableEntreprise1.setUrlcompany(urlcompany);
            responsableEntreprise1.setColor(color);
            responsableEntreprise1.setCompanyname(companyName);


//mta3 yjih mail fih l etat
            responsableEntreprise.setPwd(this.bCryptPasswordEncoder.encode(responsableEntreprise1.getPwd()));
            if (responsableEntreprise.isEtat() != responsableEntreprise1.isEtat()) {
                String etat = responsableEntreprise1.isEtat() ? "<strong ><span style=\"color: red;\">Bloqué</span>\n</strong>" : "<strong><span style=\"color: green;\">Accepté</span>\n</strong>";
                String loginLink = "";

                String logoImagePath = "cid:logoImage";
                String messageHTML =
                        "<!DOCTYPE html>" +
                                "<html>" +
                                "<head>" +
                                "<style>" +
                                ".card {" +
                                "   background-color: #f9f9f9;" +
                                "   border-radius: 10px;" +
                                "   padding: 20px;" +
                                "   margin: 20px auto;" +
                                "   width: 400px;" +
                                "   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);" +
                                "}" +
                                ".logo {" +
                                "   text-align: center;" +
                                "   margin-bottom: 20px;" +
                                "}" +
                                ".logo img {" +
                                "   max-width: 200px;" +
                                "}" +
                                ".button {" +
                                "   display: block;" +
                                "   width: 200px;" +
                                "   margin: 0 auto;" +
                                "   padding: 10px 20px;" +
                                "   background-color: #7f62fb;" +
                                "   color: white;" +
                                "   text-decoration: none;" +
                                "   text-align: center;" +
                                "   border-radius: 5px;" +
                                "   font-size: 16px;" +
                                "}" +
                                "</style>" +
                                "</head>" +
                                "<body>" +
                                "<div class=\"card\">" +
                                "<div class=\"logo\">" +
                                "<img src=\"cid:logoImage\" alt=\"Your Logo\">" +
                                "</div>" +
                                "<p> Salut <strong>" + responsableEntreprise.getNom() + "</strong>" +
                                "<h2>État de votre compte</h2>" +
                                "<h4>Votre compte a été " + etat + "</h4>";

                if (responsableEntreprise.isEtat()) { // If state is accepted
                    messageHTML += "<p>Cliquez ci-dessous pour revenir à la page de connexion :</p>\n" +
                            "<a href=\"http://localhost:4200/\"><button class=button>Connexion</button></a>\n";
                }

                messageHTML += "</div>" +
                        "</body>" +
                        "</html>";

                MimeMessage message = emailService.createMimeMessage();
                MimeMessageHelper helper;
                try {
                    helper = new MimeMessageHelper(message, true);
                    helper.setTo(responsableEntreprise.getEmail());
                    helper.setSubject("Acceptation inscription !");
                    helper.setText(messageHTML, true);
                    helper.addInline("logoImage", new ClassPathResource("static/images/logoad.png"));
                    emailService.SendEmail(message);
                } catch (MessagingException e) {

                }

            }

            responsableEntreprise1.setEtat(responsableEntreprise.isEtat());

            responsableEntreprise = responsableEntrepriseRepository.save(responsableEntreprise1);
           /* String token = Jwts.builder()
                    .claim("data", newresponsableEntreprise)
                    .signWith(SignatureAlgorithm.HS256, "SECRET")
                    .compact();

            response.put("entreprise", newresponsableEntreprise);*/
            String token = Jwts.builder()
                    .setSubject(responsableEntreprise.getEmail())
                    .claim("id", responsableEntreprise.getId())
                    .claim("nom", responsableEntreprise.getNom())
                    .claim("etat", responsableEntreprise.isEtat())
                    .signWith(SignatureAlgorithm.HS256, "SECRET")
                    .compact();

            response.put("ResponsableEntreprise", responsableEntreprise);

            response.put("token", token);
            System.out.println("ddddddddddddd");

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "ResponsableEntreprise not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }}

}





