package com.projet.supadata.RestController;

import com.projet.supadata.Entity.Particulier;
import com.projet.supadata.Repository.ParticulierRepository;
import com.projet.supadata.Service.ParticulierService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/particulier")
@CrossOrigin("*")
public class ParticulierRestController {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ParticulierRepository particulierRepository;

    @Autowired
    ParticulierService particulierService;

    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> AjouterParticulier (@RequestBody Particulier particulier){

        return particulierService.AjouterParticulier(particulier);

    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Particulier> AfficherParticulier(){
        return particulierService.AfficherParticulier();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerParticulier(@PathVariable("id") Long id){
        particulierService.supprimerParticulier(id);

    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Particulier> getParticulierById(@PathVariable("id") Long id){

        Optional<Particulier> particulier= particulierService.AfficherParticulierById(id);
        return particulier;
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Particulier ModifierParticulier(@PathVariable("id")Long id, @RequestBody Particulier particulier){
        particulier.setPwd(this.bCryptPasswordEncoder.encode(particulier.getPwd()));
        Particulier savedUser = particulierRepository.save(particulier);

        Particulier newParticulier = particulierService.Modifier(particulier);
        return newParticulier;
    }




    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginParticulier(@RequestBody Particulier particulier) {
        System.out.println("in login-Particulier"+particulier);
        HashMap<String, Object> response = new HashMap<>();

        Particulier userFromDB = particulierRepository.findParticulierByEmail(particulier.getEmail());
        System.out.println("userFromDB+Particulier"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Particulier not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(particulier.getPwd(), userFromDB.getPwd());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "Password incorrect!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
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
                }
            }

        }
    }
    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmAccount(@RequestParam("token")String confirmationemail) {
        return particulierService.confirmationemail(confirmationemail);
    }
}
