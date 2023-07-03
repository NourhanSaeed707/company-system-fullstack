import Link from "next/link";
import React, { useEffect } from "react";
import { mutate } from "swr";
import { Button } from "antd";
import useDeleteDepartment from "../../hooks/department/deleteDepartment";
import { FORM } from "../../constants/text";

function Department({ department }) {
  const { deleteResponse, setDeleteDepartmentId } = useDeleteDepartment();

  useEffect(() => {
    if (deleteResponse) {
      mutate("http://localhost:8080/api/department/get-all");
    }
  }, [deleteResponse]);

  return (
    <tr key={department.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{department.id}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{department.name}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <ul>
          {department.employee?.map((emp) => {
            return (
              <li className="text-sm text-gray-500" key={emp.id}>
                {emp.firstName} {emp.lastName}
              </li>
            );
          })}
        </ul>
      </td>

      <td className="text-right px-6 py-4 whitespace-nowrap">
        <div className="flex justify-evenly">
          <Link href={`/edit-department/${department.id}`}>
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
            onClick={() => setDeleteDepartmentId(Number(department.id))}
          >
            {FORM.DELETE}
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default Department;
