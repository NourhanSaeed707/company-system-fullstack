package com.example.authmanage.service;

import com.example.authmanage.model.Department;
import com.example.authmanage.model.Employee;

import java.util.List;

public interface DepartmentService {
    Department saveDepartment(Department department);

    List<Department> getAllDepartments();

    Department getOneDepartment(Long id);

    Department updateDepartment(Long id, Department department);

    Boolean deleteDepartment(Long id);

    interface UserService {
    }

    interface EmployeeService {
        Employee saveEmployee(Employee employee);

        List<Employee> getAllEmployees();

        Employee getEmployeeById(Long id);

        Employee updateEmployeeById(Long id, Employee employee);

        Boolean deleteEmployeeById(Long id);
    }
}
