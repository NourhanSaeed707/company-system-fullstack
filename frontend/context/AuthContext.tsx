import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LoginUser, UserContext, UserType } from "../types/users";
import { useCookies } from "react-cookie";

import { getCookie, setCookie, removeCookie, Cookies } from "typescript-cookie";

import { toast } from "react-toastify";
import client from "../helpers/client";
import useSWR from "swr";

const AuthContext = createContext<UserContext>({
  login: () => {},
  logout: () => {},
  currentUser: null,
  isSubmitting: false,
  setCurrentUser: () => {},
});

type ProviderProps = {
  children: ReactNode;
};

const authTokenKey = "authToken";

export default function CurrentUserProvider({ children }: ProviderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [cookie, setCookie, getCookie, removeCookie] = useCookies(["user"]);

  const { data: user, mutate } = useSWR<UserType>(
    "/api/v2/auth/user",
    async () => {
      // const token = localStorage.getItem(authTokenKey);
      const token = getCookie("user");
      if (
        token &&
        // cookie.user !== undefined &&
        !client.defaults.headers.common.Authorization
      ) {
        client.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      // if (token && !client.defaults.headers.common.Authorization) {
      //   client.defaults.headers.common.Authorization = `Bearer ${token}`;
      // }
      if (token) {
        const data = await client
          .get("/api/v2/auth/user")
          .then((res) => res.data)
          .catch((error) => {
            if (error?.response?.status === 401) {
              delete client.defaults.headers.common.Authorization;
              if (currentUser) {
                setCurrentUser(null);
              }
            }
          });

        if (data) {
          setCurrentUser(data);
        }
        return data;
      }
      return false;
    },
    {
      dedupingInterval: 3000,
    }
  );

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (currentUser && router.pathname === "/login") {
      router.push("/");
    }
  }, [currentUser, router]);

  const login = useCallback(
    async (values: LoginUser) => {
      setIsSubmitting(true);
      await client
        .post("/api/v2/auth/authenticate", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data && res.data.token) {
            const date = new Date();
            client.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
            setCookie("user", res.data.token, { expires: 365 });
            // localStorage.setItem(authTokenKey, res.data.token);

            mutate().then(() => {
              router.push("/");
            });
          }
        })
        .catch((err) => {
          // console.log("erooooooooooor:::");
          console.log(err);
          // if (err.response.data.statusCode === 403) {
          //   toast.error("Error in username or password", {
          //     position: toast.POSITION.TOP_RIGHT,
          //   });
          // }
        });
    },
    [mutate, router]
  );

  const logout = useCallback(async () => {
    delete client.defaults.headers.common.Authorization;
    // localStorage.removeItem("authToken");

    removeCookie("user");
    setCurrentUser(null);
  }, []);

  const stateValues = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      isSubmitting,
      login,
      logout,
    }),
    [currentUser, setCurrentUser, isSubmitting, login, logout]
  );

  return (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context: UserContext = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within CurrentUserProvider");
  }
  return context;
}
