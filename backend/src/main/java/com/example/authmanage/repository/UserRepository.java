package com.example.authmanage.repository;

import com.example.authmanage.entity.Role;
import com.example.authmanage.entity.UserEntity;
import com.example.authmanage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
//    Optional<UserEntity> findByRole(String role);

    Optional<UserEntity> findByRole(Role role);
}
