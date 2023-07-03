package   com.example.authmanage.service.Impl;

import com.example.authmanage.entity.DepartmentEntity;
import com.example.authmanage.entity.EmployeeEntity;
import com.example.authmanage.model.Department;
import com.example.authmanage.repository.DepartmentRepository;
import com.example.authmanage.repository.EmployeeRepository;
import com.example.authmanage.service.DepartmentService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;
    private EmployeeRepository employeeRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Department saveDepartment(Department department) {
        DepartmentEntity departmentEntity = new DepartmentEntity();
        BeanUtils.copyProperties(department, departmentEntity);
        departmentRepository.save(departmentEntity);
        return department;
    }

    @Override
    public List<Department> getAllDepartments() {
        List<DepartmentEntity> departmentEntities = departmentRepository.findAll();
        List<Department> departments = departmentEntities.stream().map(
                dep -> new Department(dep.getId(), dep.getName(), dep.getEmployee())).collect(Collectors.toList());
        return  departments;
    }

    @Override
    public Department getOneDepartment(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id).get();
        List<EmployeeEntity> employeeEntities =  employeeRepository.findDepartmentById(id);
        Department department = new Department();
        BeanUtils.copyProperties(departmentEntity, department);
        return  department;
    }

    @Override
    public Department updateDepartment(Long id, Department department) {
       DepartmentEntity departmentEntity = departmentRepository.findById(id).get();
       departmentEntity.setName(department.getName());
//       departmentEntity.setEmployee(Collections.singletonList((EmployeeEntity) department.getEmployee()));
       departmentRepository.save(departmentEntity);
       return department;
    }

    @Override
    public Boolean deleteDepartment(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id).get();
        departmentRepository.delete(departmentEntity);
        return true;
    }
}
