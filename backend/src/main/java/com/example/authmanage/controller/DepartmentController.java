package com.example.authmanage.controller;

import com.example.authmanage.model.Department;
import com.example.authmanage.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/department")
@CrossOrigin("*")
public class DepartmentController {
    private DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Department createDepartment(@RequestBody Department department) {
        return departmentService.saveDepartment(department);
    }

    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Department getOneDepartment(@PathVariable("id") Long id) {
        return departmentService.getOneDepartment(id);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Department updateDepartment(@PathVariable("id") Long id, @RequestBody Department department){
        return departmentService.updateDepartment(id, department);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteDepartment(@PathVariable("id") Long id){
        Boolean deleted = false;
        deleted = departmentService.deleteDepartment(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
