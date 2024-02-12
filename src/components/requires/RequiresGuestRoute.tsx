"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/providers/AppContextProvider";

const RequiresGuestRoute = (Component: React.FC) => {
  const { accessToken } = useAppContext();

  const RequiresGuest: React.FC = (props: any) => {
    const router = useRouter();

    React.useEffect(() => {
      if (accessToken) {
        router.replace("/protected");
      }
    }, [router]);

    if (!accessToken) {
      <div>Loading....</div>;
    }
    return <Component {...props} />;
  };
  return RequiresGuest;
};
export default RequiresGuestRoute;
