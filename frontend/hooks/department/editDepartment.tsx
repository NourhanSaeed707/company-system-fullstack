import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Department } from "../../types/users";
import client from "../../helpers/client";
import { getCookie } from "typescript-cookie";

export default function useEditDepartment() {
  const USER_API_BASE_URL = "http://localhost:8080/api/department";
  const [updateResponse, setUpdateResponse] = useState<AxiosResponse | null>();
  const [updateError, setUpdateError] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [updatedDepartment, setUpdatedDepartment] = useState<Department>();

  const callAPI = useCallback(async (updateDepartment: Department) => {
    setUpdateError(null);
    setUpdateResponse(null);
    setIsSubmitting(true);
    // const token = localStorage.getItem("authToken");
    const token = getCookie("user");
    await client
      .put(
        `${USER_API_BASE_URL}/edit/${updateDepartment?.id}`,
        {
          id: updateDepartment?.id,
          ...updateDepartment,
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
    if (updatedDepartment) {
      callAPI(updatedDepartment);
    }
  }, [callAPI, updatedDepartment]);

  return {
    setUpdatedDepartment,
    updateResponse,
    updateError,
    isSubmitting,
    updatedDepartment,
  };
}
