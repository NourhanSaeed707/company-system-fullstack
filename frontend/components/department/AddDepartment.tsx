import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Department, Employees } from "../../types/users";
import useListDepartments from "../../hooks/department/listDepartment";
import { useRouter } from "next/router";
import useAddDepartment from "../../hooks/department/addDepartments";
import { FORM } from "../../constants/text";
import MasterLayout from "../layouts/MasterLayout";

function AddDepartment() {
  const router = useRouter();
  const { departments, loading } = useListDepartments();
  const { setNewDepartment, storeError, storeResponse } = useAddDepartment();

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
    const dep: Department = {
      id: values.id,
      name: values.name,
      employee: [],
    };
    setNewDepartment(dep);
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
                label="name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              {/* <Form.Item
          label="department"
          name="department"
          rules={[{ required: true, message: "Please input your firstName!" }]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            // name="de"
            onChange={onChange}
            // onSearch={onSearch}
            // filterOption={(input, option) =>
            //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            // }
            // options={departments?.map((dep) => {
            //   return <div key={dep.id}>{dep.name}</div>;
            // })}
            options={departmentList}
          />
        </Form.Item> */}

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

export default AddDepartment;
