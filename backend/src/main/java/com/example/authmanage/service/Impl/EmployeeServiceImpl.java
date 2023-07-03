package  com.example.authmanage.service.Impl;

import com.example.authmanage.entity.DepartmentEntity;
import com.example.authmanage.entity.EmployeeEntity;
import com.example.authmanage.model.Employee;
import com.example.authmanage.repository.EmployeeRepository;
import com.example.authmanage.service.DepartmentService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements DepartmentService.EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity( );
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
        List<Employee> employeesModel = employeeEntities.stream().map(
                emp -> new Employee(emp.getId(), emp.getFirstName(), emp.getLastName(), emp.getEmail(), emp.getSalary(),emp.getDepartment()))
                .collect(Collectors.toList());
        return  employeesModel;
    }

    @Override
    public Employee getEmployeeById(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        DepartmentEntity dep = employeeEntity.getDepartment();
        Employee employee = new Employee();
        employee.setDepartment(dep);
        BeanUtils.copyProperties(employeeEntity, employee);
        return  employee;
    }

    @Override
    public Employee updateEmployeeById(Long id, Employee employee) {
      EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
      employeeEntity.setEmail(employee.getEmail());
      employeeEntity.setFirstName(employee.getFirstName());
      employeeEntity.setLastName(employee.getLastName());
      employeeEntity.setDepartment(employee.getDepartment());
      employeeRepository.save(employeeEntity);
      BeanUtils.copyProperties(employeeEntity, employee);
      return employee;
    }

    @Override
    public Boolean deleteEmployeeById(Long id) {
     EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
     employeeRepository.delete(employeeEntity);
     return true;
    }
}
