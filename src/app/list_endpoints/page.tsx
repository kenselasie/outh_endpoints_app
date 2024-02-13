"use client";
import Header from "@/components/header";
import TableComponent from "@/components/table";
import { useGetEndpoints } from "@/data/use-endpoints.query";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import SearchBar from "@/components/searchbar";
import isProtected from "@/components/requires/ProtectedRoute";

interface ITableData {
  endpoint: string;
  service_name: string;
  http_command: string | string[];
  name: string;
  rpc_queue: string;
  rest_action: string;
  kwargs: {
    min_role?: number | null | undefined;
    workflow?: boolean | undefined;
  };
}

const Dashboard = () => {
  const { data, error, isLoading } = useGetEndpoints();
  const [endpointData, setEndpointData] = React.useState<ITableData[]>();
  if (isLoading) {
    return <>Loading endpoints...</>;
  }
  if (error) {
    return <>Could not load endpoint data</>;
  }

  const searchDataFnc = (searchString: string) => {
    setEndpointData(data?.filter((element) => element.name.includes(searchString)))
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    setEndpointData(data);
  }, [data]);
  
  return (
    <Box height={"100vh"} bg={"#f4f4f4"}>
      {endpointData && (
        <Box>
          <Header />
          <Box
            bg="#fffff"
            borderRadius={20}
            paddingTop={50}
            paddingRight={200}
            paddingLeft={200}
          >
            <Text fontSize="32px" fontWeight={600} mb={5}>
              Endpoints
            </Text>
            <Box mb={10}>
              <SearchBar
                searchItem={(search: string) => searchDataFnc(search)}
              />
            </Box>
            <Box bg={"white"} padding={50} borderRadius={20} height={"65vh"}>
              <TableComponent data={endpointData} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default isProtected(Dashboard);
