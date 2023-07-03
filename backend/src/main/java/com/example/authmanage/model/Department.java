package com.example.authmanage.model;

import com.example.authmanage.entity.EmployeeEntity;
import lombok.Data;

import java.util.Collections;
import java.util.List;

@Data
public class Department {

    private long id;
    private String name;
    private List<EmployeeEntity> employee;


    public Department(long id, String name, List<EmployeeEntity> employee) {
        this.id = id;
        this.name = name;
        this.employee = employee;
    }

    public Department() {
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
