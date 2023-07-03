package com.example.authmanage.repository;

import com.example.authmanage.entity.DepartmentEntity;
import com.example.authmanage.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Long> {
}
