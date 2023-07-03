import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useEditEmployee from "../../hooks/employees/editEmployee";
import useGetEmployee from "../../hooks/employees/getEmployee";
import { Department, Employees } from "../../types/users";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input } from "antd";
import { mutate } from "swr";
import { FORM } from "../../constants/text";
import MasterLayout from "../layouts/MasterLayout";

function EditEmployee({ employeeId }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [employeeVal, setEmployee] = useState<Employees>();

  const { id } = router.query;

  const { updateResponse, isSubmitting, setUpdatedEmployee } =
    useEditEmployee();

  const { employee, isLoading, error } = useGetEmployee(Number(id));

  useEffect(() => {
    if (id) {
      mutate("/api/employees/get/employee-id");
    }
  }, [id]);

  useEffect(() => {
    setUpdatedEmployee(employeeVal);
  }, [employeeVal, setUpdatedEmployee]);

  const onFinish = (values: any) => {
    const emp: Employees = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      salary: values.salary,
      department: {
        id: values.department,
        name: "",
        employee: [],
      },
    };
    setEmployee(emp);
    router.push("/employees");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
                label="id"
                name="id"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                initialValue={isSubmitting === false && employee?.id}
                hidden={true}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="firstName"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your firstName!" },
                ]}
                initialValue={isSubmitting === false && employee?.firstName}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="lastName"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your lastName!" },
                ]}
                initialValue={
                  isSubmitting === false && employee && employee.lastName
                }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
                initialValue={
                  isSubmitting === false && employee && employee.email
                }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="salary"
                name="salary"
                rules={[
                  { required: true, message: "Please input your salary!" },
                ]}
                initialValue={isSubmitting === false && employee?.salary}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="department"
                name="department"
                rules={[
                  { required: true, message: "Please input your department!" },
                ]}
                initialValue={
                  isSubmitting === false && employee && employee.department.id
                }
              >
                <Input disabled={true} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-green-700"
                >
                  {FORM.EDIT}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

export default EditEmployee;
