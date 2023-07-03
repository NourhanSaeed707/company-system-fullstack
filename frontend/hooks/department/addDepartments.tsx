import { useCallback, useEffect, useState } from "react";
import { Department } from "../../types/users";
import { AxiosResponse } from "axios";
import client from "../../helpers/client";
import { getCookie } from "typescript-cookie";

export default function useAddDepartment() {
  const [department, setNewDepartment] = useState<Department>();
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>();
  const [storeError, setStoreError] = useState<string | null>();

  const callAPI = useCallback(async (deparment) => {
    setStoreError(null);
    // const token = localStorage.getItem("authToken");
    const token = getCookie("user");
    await client
      .post(`/api/department/add`, deparment, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      })
      .then((res) => {
        setStoreResponse(res);
      })
      .catch((err) => {
        setStoreError(err);
      });
  }, []);

  useEffect(() => {
    if (department) {
      callAPI(department);
    }
  }, [callAPI, department]);

  return {
    setNewDepartment,
    storeError,
    storeResponse,
  };
}
