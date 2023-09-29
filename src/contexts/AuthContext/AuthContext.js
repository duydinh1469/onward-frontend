import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, createContext } from "react";
import { loginService, logoutService } from "services/api/authenticateAPI";
import { delCookie, setCookie } from "utils/cookieUtils";
import { getAuthService } from "services/api/userAPI";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const auth = useQuery({
    queryKey: ["user", "auth"],
    queryFn: getAuthService,
    initialData: {
      data: { email: null, role: ["ANONYMOUS"] },
      status: 401,
      statusText: "Unauthorized",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginService,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutService,
  });

  const login = (authData, handleFn) => {
    return loginMutation.mutate(authData, {
      onSuccess: (data) => {
        setCookie("token", data.accessToken, 1);
        queryClient.invalidateQueries(["user", "auth"], { exact: true });
        handleFn?.onSuccess && handleFn.onSuccess();
      },
      onError: (error) => {
        console.log(`Failed to login. Message: ${error.response.data.message}`);
        handleFn?.onError && handleFn.onError(error.response);
      },
    });
  };

  const logout = (handleFn, reload = true) => {
    return logoutMutation.mutate(undefined, {
      onSuccess: () => {
        delCookie("token");
        queryClient.clear();
        handleFn?.onSuccess && handleFn.onSuccess();
        reload && window.location.reload();
      },
      onError: (error) => {
        console.log(
          `Failed to logout. Message: ${error.response.data.message}`
        );
        handleFn?.onError && handleFn.onError(error.response);
      },
    });
  };

  const value = {
    login,
    logout,
    userAuth: auth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
