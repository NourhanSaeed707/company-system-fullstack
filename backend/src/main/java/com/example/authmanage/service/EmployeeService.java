package   com.example.authmanage.service;

import com.example.authmanage.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Long id);

    Employee updateEmployeeById(Long id, Employee employee);

    Boolean deleteEmployeeById(Long id);
}
