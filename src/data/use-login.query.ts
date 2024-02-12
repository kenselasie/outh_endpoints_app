import { GetTokenService } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export interface ILoginVariables {
  code: string;
}

export const useGetTokenQuery = (code: string) => {
  return useQuery({
    queryKey: ["getCode", code],
    queryFn: () => GetTokenService({ code }),
  });
};
