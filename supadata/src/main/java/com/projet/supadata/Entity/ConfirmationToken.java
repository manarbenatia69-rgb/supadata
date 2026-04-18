package com.projet.supadata.Entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private Long tokenId;

    @Column(name="confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @OneToOne(targetEntity = Particulier.class, fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(nullable = false, name = "particulier_id")
    private Particulier particulier;



    public ConfirmationToken(Particulier particulier) {
        this.particulier  = particulier;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

    public ConfirmationToken(Long tokenId, String confirmationToken, Date createdDate, Particulier particulier) {
        this.tokenId = tokenId;
        this.confirmationToken = confirmationToken;
        this.createdDate = createdDate;
        this.particulier = particulier;
    }

    public ConfirmationToken() {

    }

    public Long getTokenId() {
        return tokenId;
    }

    public void setTokenId(Long tokenId) {
        this.tokenId = tokenId;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Particulier getParticulier() {
        return particulier;
    }

    public void setParticulier(Particulier particulier) {
        this.particulier = particulier;
    }
}
