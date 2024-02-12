import { GetEndpointService } from "@/services/get_endpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetEndpoints = () => {
  return useQuery({
    queryKey: ["getEndpoint"],
    queryFn: () => GetEndpointService(),
  });
};
