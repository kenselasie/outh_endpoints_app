"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetTokenQuery } from "@/data/use-login.query";
import { useAppContext } from "@/components/providers/AppContextProvider";
import { Link } from "@chakra-ui/next-js";

export default function Home() {
  const { accessToken, setAccessTokenFnc, removeAccessTokenFnc } =
    useAppContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code") || "";

  const { data, error, isLoading } = useGetTokenQuery(code);

  if (isLoading) {
    <>Loading...</>;
  }
  if (error) {
    removeAccessTokenFnc();
    return (
      <>
        An error occurred!, Cannot sign you in...
        <Link href="/login" color="blue.400" _hover={{ color: "blue.500" }}>
          Go back to login page.
        </Link>
      </>
    );
  }
  if (data) {
    setAccessTokenFnc({ accessToken: data.access_token });
    return router.push("/list_endpoints");
  }

  return;
}
