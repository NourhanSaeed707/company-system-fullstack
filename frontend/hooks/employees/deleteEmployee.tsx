import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import client from "../../helpers/client";
import { getCookie } from "typescript-cookie";

export default function useDeleteEmployee() {
  const USER_API_BASE_URL = "http://localhost:8080/api/employees";
  const [deleteResponse, setDeleteResponse] = useState<AxiosResponse | null>();
  const [deleteError, setDeleteError] = useState<String | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number>();

  const callApi = useCallback(async (Id: number) => {
    setDeleteResponse(null);
    setDeleteError(null);
    setIsSubmitting(true);
    // const token = localStorage.getItem("authToken");
    const token = getCookie("user");
    await client
      .delete(`${USER_API_BASE_URL}/delete/${Id}`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      })
      .then((res) => {
        setDeleteResponse(res);
      })
      .catch((err) => {
        setDeleteError(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  useEffect(() => {
    if (deleteEmployeeId) {
      callApi(deleteEmployeeId);
    }
  }, [callApi, deleteEmployeeId]);

  return {
    deleteResponse,
    deleteError,
    isSubmitting,
    setDeleteEmployeeId,
  };
}
