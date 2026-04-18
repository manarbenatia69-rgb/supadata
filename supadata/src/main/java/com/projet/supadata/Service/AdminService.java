package com.projet.supadata.Service;

import com.projet.supadata.Entity.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    Admin AjouterAdmin(Admin admin);

    Admin Modifier (Admin admin);

    List<Admin> AfficherAdmin();

    void supprimerAdmin(Long id);

    Optional<Admin> AfficherAdminById(Long id);

}
