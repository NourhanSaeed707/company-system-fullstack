import { useCallback, useEffect, useState } from "react";
import client from "../../helpers/client";
import { AxiosResponse } from "axios";
import { Employees } from "../../types/users";
import { getCookie } from "typescript-cookie";

export default function useEditEmployee() {
  const USER_API_BASE_URL = "http://localhost:8080/api/employees";
  const [updateResponse, setUpdateResponse] = useState<AxiosResponse | null>(
    null
  );
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [updatedEmployee, setUpdatedEmployee] = useState<Employees>();

  const callAPI = useCallback(async (updateEmployee: Employees) => {
    setUpdateResponse(null);
    setUpdateError(null);
    setIsSubmitting(true);
    const token = getCookie("user");
    await client
      .put(
        `${USER_API_BASE_URL}/edit/${updateEmployee?.id}`,
        {
          id: updateEmployee.id,
          ...updateEmployee,
        },
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`, // notice the Bearer before your token
          },
        }
      )
      .then((res) => {
        setUpdateResponse(res);
      })
      .catch((err) => {
        setUpdateError(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  useEffect(() => {
    if (updatedEmployee) {
      callAPI(updatedEmployee);
    }
  }, [callAPI, updatedEmployee]);

  return {
    updateResponse,
    updateError,
    updatedEmployee,
    isSubmitting,
    setUpdatedEmployee,
  };
}
