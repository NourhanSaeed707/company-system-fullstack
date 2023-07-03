import useSWR from "swr";
import client from "../../helpers/client";
import { useState } from "react";
import { Department } from "../../types/users";
import { getCookie } from "typescript-cookie";

export default function useGetDepartment(id: Number) {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  const { data: department, error } = useSWR<Department>(
    `/api/department/get/department-id`,
    async () => {
      setIsSubmitting(true);
      // const token = localStorage.getItem("authToken");
      const token = getCookie("user");
      console.log("insiiiiiiiide get one employee hoook");
      const { data } = await client.get(`/api/department/get/${id}`, {
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
      console.log(data, "ediiiiit hook");
      return data;
    }
  );
  return {
    department,
    isSubmitting,
    error,
    isLoading: !error && !department,
  };
}
