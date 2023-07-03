import useSWR from "swr";
import { Employees } from "../../types/users";
import client from "../../helpers/client";
import { useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useGetEmployee(id: Number) {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  const { data: employee, error } = useSWR<Employees>(
    `/api/employees/get/employee-id`,
    async () => {
      setIsSubmitting(true);
      const token = getCookie("user");
      const { data } = await client.get(`/api/employees/get/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      });

      if (data) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
      return data;
    }
  );
  return {
    employee,
    isSubmitting,
    error,
    isLoading: !error && !employee,
  };
}
