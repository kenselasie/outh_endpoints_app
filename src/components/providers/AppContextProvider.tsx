"use client";
import React, { createContext, useContext, useState } from "react";

interface AppState {
  accessToken: string;
  setAccessTokenFnc: ({ accessToken }: { accessToken: string }) => void;
  removeAccessTokenFnc: () => void;
}

const initialState: AppState = {
  accessToken: "",
  setAccessTokenFnc: () => {},
  removeAccessTokenFnc: () => {},
};

export const StateContext = createContext<AppState>(initialState);

export const StateProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string>(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    return storedAccessToken || "";
  });

  const setAccessTokenFnc = ({
    accessToken: token,
  }: {
    accessToken: string;
  }) => {
    setAccessToken(() => {
      localStorage.setItem("accessToken", token.toString());
      return token;
    });
  };

  const removeAccessTokenFnc = () => {
    setAccessToken(() => {
      localStorage.setItem("accessToken", "");
      return "";
    });
  };
  const contextValue: AppState = {
    accessToken,
    setAccessTokenFnc,
    removeAccessTokenFnc,
  };

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "setAccessToken") {
        const newAccessToken = event.newValue ? event.newValue : "";
        setAccessToken(newAccessToken);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppContext = (): AppState => useContext(StateContext);
