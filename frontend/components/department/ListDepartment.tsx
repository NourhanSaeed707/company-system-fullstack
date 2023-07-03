import React from "react";
import { Button } from "antd";
import Link from "next/link";
import Department from "./Department";
import useListDepartments from "../../hooks/department/listDepartment";
import { TABLE, FORM } from "../../constants/text";
import MasterLayout from "../layouts/MasterLayout";

function ListDepartment() {
  const { departments, loading } = useListDepartments();

  return (
    <>
      <MasterLayout>
        <div className="container mx-auto my-8">
          <div>
            <Link href="/add-department">
              <Button className="bg-gray-800 text-white">
                {FORM.ADDDEPARTMENT}
              </Button>
            </Link>
          </div>
          <div className="flex shadow border-b">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.ID}
                  </th>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.NAME}
                  </th>

                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.EMPLOYEES}
                  </th>
                  <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.ACTIONES}
                  </th>
                </tr>
              </thead>
              {loading === false && (
                <tbody className="bg-white">
                  {departments?.map((department) => (
                    <Department department={department} key={department.id} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

export default ListDepartment;
