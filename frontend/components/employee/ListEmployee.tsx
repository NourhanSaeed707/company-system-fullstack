import React, { useEffect, useState } from "react";
import useListEmployees from "../../hooks/employees/listEmployees";
import useDeleteEmployee from "../../hooks/employees/deleteEmployee";
import Employee from "./Employee";
import { mutate } from "swr";
import { Button } from "antd";
import Link from "next/link";
import { TABLE, FORM } from "../../constants/text";
import MasterLayout from "../layouts/MasterLayout";

function ListEmployee() {
  const { employees, loading } = useListEmployees();

  useEffect(() => {
    if (employees) {
      mutate("/api/employees/get-all");
    }
  }, [employees]);

  return (
    <>
      <MasterLayout>
        <div className="container mx-auto my-8">
          <div>
            <Link href="/addemployee">
              <Button className="bg-gray-800 text-white">
                {FORM.ADDEMPLOYEE}
              </Button>
            </Link>
          </div>
          <div className="flex shadow border-b">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.FIRSTNAME}
                  </th>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.LASTNAME}
                  </th>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.EMAIL}
                  </th>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.SALARY}
                  </th>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.DEPARTMENT}
                  </th>
                  <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TABLE.ACTIONES}
                  </th>
                </tr>
              </thead>
              {loading === false && (
                <tbody className="bg-white">
                  {employees?.map((employee) => (
                    <Employee employee={employee} key={employee.id} />
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

export default ListEmployee;
