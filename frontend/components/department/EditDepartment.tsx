import React, { useState, useEffect, Fragment } from "react";
import { Department } from "../../types/users";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input } from "antd";
import { mutate } from "swr";
import useGetDepartment from "../../hooks/department/getDepartment";
import useEditDepartment from "../../hooks/department/editDepartment";
import { FORM } from "../../constants/text";
import MasterLayout from "../layouts/MasterLayout";

function EditDepartment() {
  const router = useRouter();
  const [departmentVal, setDepartment] = useState<Department>();

  const { id } = router.query;

  const { updateResponse, isSubmitting, setUpdatedDepartment } =
    useEditDepartment();

  const { department, isLoading, error } = useGetDepartment(Number(id));

  useEffect(() => {
    if (id) {
      mutate("/api/department/get/department-id");
    }
  }, [id]);

  useEffect(() => {
    setUpdatedDepartment(departmentVal);
  }, [departmentVal, setUpdatedDepartment]);

  const onFinish = (values: any) => {
    const dep: Department = {
      id: values.id,
      name: values.name,
      employee: [],
    };
    setDepartment(dep);
    router.push("/departments");
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
                initialValue={isSubmitting === false && department?.id}
                hidden={true}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
                initialValue={isSubmitting === false && department?.name}
              >
                <Input />
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

export default EditDepartment;
