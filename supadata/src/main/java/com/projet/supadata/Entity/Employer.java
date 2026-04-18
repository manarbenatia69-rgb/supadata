package com.projet.supadata.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long   id;
    private String profilepicture ;
    private String companylogo ;
    private String coverphoto;
    private String nom ;
    private String prenom ;
    private String jobtitle;
    private String departement;
    private String companyname;
    private String email ;
    private String pwd;
    private Long   telephone;
    private String urlcompany;
    private String adresse;
    private String color;
    private String police;
    private String fblink;
    private String linkedinlink;
    private String githublink;

    @ManyToOne
    private ResponsableEntreprise responsableEntreprise;
}

