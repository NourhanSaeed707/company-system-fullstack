import Link from "next/link";
import React, { useEffect } from "react";
import useDeleteEmployee from "../../hooks/employees/deleteEmployee";
import { mutate } from "swr";
import { Button } from "antd";
import { FORM } from "../../constants/text";

function Employee({ employee }) {
  const { deleteResponse, setDeleteEmployeeId } = useDeleteEmployee();

  useEffect(() => {
    if (deleteResponse) {
      mutate("http://localhost:8080/api/employees/get-all");
    }
  }, [deleteResponse]);

  return (
    <tr key={employee.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.email}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.salary}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.department.name}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap">
        <div className="flex justify-evenly">
          <Link href={`/editemployee/${employee.id}`}>
            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {FORM.EDIT}
            </Button>
          </Link>
          <Button
            type="primary"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => setDeleteEmployeeId(Number(employee.id))}
          >
            {FORM.DELETE}
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default Employee;
