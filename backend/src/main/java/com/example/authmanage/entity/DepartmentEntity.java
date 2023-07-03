package  com.example.authmanage.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "departments")
public class DepartmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @OneToMany(mappedBy = "department", cascade = CascadeType.REMOVE)
    private List<EmployeeEntity> employee;

    public DepartmentEntity(long id, String name, List<EmployeeEntity> employee) {
        this.id = id;
        this.name = name;
        this.employee = employee;
    }

    public DepartmentEntity() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<EmployeeEntity> getEmployee() {
        return employee;
    }

    public void setEmployee(List<EmployeeEntity> employee) {
        this.employee = employee;
    }
}
