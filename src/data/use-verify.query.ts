import { verifyUserService } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";


export const useVerifyUserQuery = () => {
  return useQuery({
    queryKey: ["verifyUser"],
    queryFn: () => verifyUserService(),
  });
};
