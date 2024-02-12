"use client";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spacer,
  Flex,
  Button,
  Text
} from "@chakra-ui/react";
import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages,
} from "chakra-paginator";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

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

const TableComponent = ({ data: endpointData }: { data: ITableData[] }) => {
  const itemLimit = 50;
  const [pagesQuantity, setPagesQuantity] = React.useState(0);
  const [curPage, setCurPage] = React.useState(0);

  const normalStyles = {
    bg: "white",
    color: "black",
    padding: '12px'
  };

  const activeStyles = {
    bg: "#4763E4",
    color: "white",
    padding: '12px'
  };

  const handlePageChange = (page: number) => {
    setCurPage(page);
  };
  React.useEffect(() => {
    const pagesTotal = Math.ceil(endpointData.length / itemLimit);

    setPagesQuantity(pagesTotal);
  }, [endpointData.length]);
  return (
    <>
      <TableContainer>
        <Table borderRadius={40} size={'sm'} variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Endpoint</Th>
              <Th>Service</Th>
              <Th>Queue</Th>
              <Th>Security</Th>
              <Th>Http Commands</Th>
            </Tr>
          </Thead>
          <Tbody>
            {endpointData.map((data, key) => (
              <Tr key={key}>
                <Td>{data.name}</Td>
                <Td>{data.endpoint}</Td>
                <Td>{data.service_name}</Td>
                <Td>{data.rpc_queue}</Td>
                <Td>{data.rest_action}</Td>
                <Td>
                  <Button
                    bg={"white"}
                    color={"#4763E4"}
                    borderRadius={14}
                    border={"1px solid #4763E4"}
                  >
                    {data.http_command}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex p={2}>
        <Text>{endpointData.length} records</Text>
        <Spacer />
        <Paginator
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity - 1}
          isDisabled={false}
          border={"1px solid grey"}
          borderRadius={14}
          marginLeft={10}
        >
          <Previous bg="white">
            <CgChevronLeft />
          </Previous>
          <PageGroup>
            {generatePages(pagesQuantity)?.map((page) => (
              <Page
                key={`paginator_page_${page}`}
                page={page}
                normalStyles={normalStyles}
                activeStyles={activeStyles}
              />
            ))}
          </PageGroup>
          <Next bg="white">
            <CgChevronRight />
          </Next>
        </Paginator>
      </Flex>
    </>
  );
};

export default TableComponent;
