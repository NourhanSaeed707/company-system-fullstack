import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import client from "../../helpers/client";
import { getCookie } from "typescript-cookie";

export default function useDeleteDepartment() {
  const USER_API_BASE_URL = "http://localhost:8080/api/department";
  const [deleteResponse, setDeleteResponse] = useState<AxiosResponse | null>();
  const [deleteError, setDeleteError] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState<number>();

  const callAPI = useCallback(async (Id: number) => {
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
    if (deleteDepartmentId) {
      callAPI(deleteDepartmentId);
    }
  }, [callAPI, deleteDepartmentId]);

  return {
    setDeleteDepartmentId,
    deleteResponse,
    deleteError,
    isSubmitting,
  };
}
