import useSWR from "swr";
import client from "../../helpers/client";
import { useState } from "react";
import { Department } from "../../types/users";
import { getCookie } from "typescript-cookie";

export default function useListDepartments() {
  // const USER_API_BASE_URL = "http://localhost:8080/api/employeess";
  const [loading, setLoading] = useState(true);
  const { data: departments, error } = useSWR<Department[]>(
    `http://localhost:8080/api/department/get-all`,
    async () => {
      setLoading(true);
      // const token = localStorage.getItem("authToken");
      const token = getCookie("user");
      const { data } = await client.get(
        `http://localhost:8080/api/department/get-all`,
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
    departments,
    error,
    loading,
  };
}
