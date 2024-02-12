"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/providers/AppContextProvider";

const RequiresGuestRoute = (Component: React.FC) => {
  
  const RequiresGuest: React.FC = (props: any) => {
    const { accessToken } = useAppContext();
    const router = useRouter();

    React.useEffect(() => {
      if (accessToken) {
        router.replace("/protected");
      }
    }, [router, accessToken]);

    if (!accessToken) {
      <div>Loading....</div>;
    }
    return <Component {...props} />;
  };
  return RequiresGuest;
};
export default RequiresGuestRoute;
