import useSWR from "swr";
import client from "../../helpers/client";
import { useState } from "react";
import { Employees } from "../../types/users";
import axios from "axios";
import { getCookie } from "typescript-cookie";

export default function useListEmployees() {
  const [loading, setLoading] = useState(true);
  const [employeeval, setEmployeeVal] = useState();
  const { data: employees, error } = useSWR<Employees[]>(
    `http://localhost:8080/api/employees/get-all`,
    async () => {
      setLoading(true);
      const token = getCookie("user");
      const { data } = await client.get(
        `http://localhost:8080/api/employees/get-all`,
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`, // notice the Bearer before your token
          },
        }
      );

      setLoading(false);
      return data;
    },
    {
      dedupingInterval: 1000,
    }
  );

  return {
    employees,
    error,
    loading,
  };
}
