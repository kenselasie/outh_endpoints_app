"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/providers/AppContextProvider";

const ProtectedRoute = (Component: React.FC) => {
  
  const RequiresAuth: React.FC = (props: any) => {
    const { accessToken } = useAppContext();
    const router = useRouter();

    React.useEffect(() => {
      if (!accessToken) {
        router.replace("/login");
      }
    }, [router, accessToken]);

    if (!accessToken) {
      <div>Loading....</div>;
    }
    return <Component {...props} />;
  };
  return RequiresAuth;
};
export default ProtectedRoute;
