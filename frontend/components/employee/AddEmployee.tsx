import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Employees } from "../../types/users";
import useListDepartments from "../../hooks/department/listDepartment";
import useAddEmployee from "../../hooks/employees/addEmployee";
import { useRouter } from "next/router";
import { FORM } from "../../constants/text";
import MasterLayout from "../layouts/MasterLayout";

function AddEmployee() {
  const router = useRouter();
  const { departments, loading } = useListDepartments();
  const { setNewEmployee, storeError, storeResponse } = useAddEmployee();

  const [departmentList, setDepartmentsList] =
    useState<{ value: string; label: string }[]>();

  useEffect(() => {
    const list = [] as { value: string; label: string }[];
    if (loading === false) {
      departments.forEach((item) => {
        list.push({ value: String(item.id), label: item.name });
      });
      setDepartmentsList(list);
    }
  }, [departments, loading]);

  const onFinish = (values: any) => {
    const emp: Employees = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      salary: values.salary,
      department: {
        id: Number(values.department),
        name: "",
        employee: [],
      },
    };
    setNewEmployee(emp);
    router.push("/employees");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <MasterLayout>
        <div className="w-auto h-screen flex justify-center items-center bg-gray-500">
          <div className="w-96 h-fit bg-white rounded-lg p-7">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your First name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your Last name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Salary"
                name="salary"
                rules={[
                  { required: true, message: "Please enter your salary!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please enter your Department!" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={departmentList}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-green-700"
                >
                  {FORM.SUBMIT}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

export default AddEmployee;
