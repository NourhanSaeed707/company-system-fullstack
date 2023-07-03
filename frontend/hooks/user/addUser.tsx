import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import client from "../../helpers/client";
import { UserType } from "../../types/users";

export default function useAddUser() {
  const [userData, setUserData] = useState<UserType | null>();
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>();
  const [storeError, setStoreError] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const callAPI = useCallback(async (newUser) => {
    // const token = localStorage.getItem("authToken");
    setIsSubmitting(true);
    setStoreError(null);
    await client
      .post(`/api/v2/auth/register`, newUser, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          //   Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      })
      .then((res) => {
        setStoreResponse(res);
      })
      .catch((error) => {
        if (error) {
          setStoreError(error);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  useEffect(() => {
    if (userData) {
      callAPI(userData);
    }
  }, [callAPI, userData]);

  return {
    setUserData,
    storeResponse,
    storeError,
    isSubmitting,
  };
}
