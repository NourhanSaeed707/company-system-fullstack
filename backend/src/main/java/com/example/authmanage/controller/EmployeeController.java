package com.example.authmanage.controller;

import com.example.authmanage.model.Employee;
import com.example.authmanage.service.DepartmentService;
import com.example.authmanage.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private DepartmentService.EmployeeService employeeService;

    public EmployeeController(DepartmentService.EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Employee createEmployee(@RequestBody Employee employee) {
        return  employeeService.saveEmployee(employee);
    }


    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ADMIN')" )
    public ResponseEntity<List<Employee>> getAllEmployees() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<Employee> employees =  employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Employee employee = null;
        employee =  employeeService.getEmployeeById(id);
        return  ResponseEntity.ok(employee);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Employee updateEmployeeById(@PathVariable("id") Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployeeById(id, employee);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteEmployeeById(@PathVariable("id") Long id ) {
        Boolean deleted = false;
        deleted = employeeService.deleteEmployeeById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
