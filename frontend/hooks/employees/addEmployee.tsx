import { useCallback, useEffect, useState } from "react";
import { Employees } from "../../types/users";
import { AxiosResponse } from "axios";
import client from "../../helpers/client";
import { getCookie } from "typescript-cookie";

export default function useAddEmployee() {
  const [employee, setNewEmployee] = useState<Employees>();
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>();
  const [storeError, setStoreError] = useState<string | null>();

  const callAPI = useCallback(
    async (employee) => {
      setStoreError(null);
      const token = getCookie("user");
      await client
        .post(`api/employees/add`, employee, {
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
          if (err) {
            setStoreError(err);
          }
        });
    },
    [employee]
  );

  useEffect(() => {
    if (employee) {
      callAPI(employee);
    }
  }, [callAPI, employee]);

  return {
    setNewEmployee,
    storeResponse,
    storeError,
  };
}
