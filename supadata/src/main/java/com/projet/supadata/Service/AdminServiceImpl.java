package com.projet.supadata.Service;

import com.projet.supadata.Entity.Admin;
import com.projet.supadata.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminRepository adminRepository;

    @Override
    public Admin AjouterAdmin(Admin admin) {

        return adminRepository.save(admin);
    }

    @Override
    public Admin Modifier(Admin admin) {

        return adminRepository.save(admin);
    }

    @Override
    public List<Admin> AfficherAdmin() {

        return adminRepository.findAll();
    }

    @Override
    public void supprimerAdmin(Long id) {

        adminRepository.deleteById(id);
    }

    @Override
    public Optional<Admin> AfficherAdminById(Long id) {

        return adminRepository.findById(id);
    }
}
