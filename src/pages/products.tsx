import React from "react";
import { Box, Flex } from "@radix-ui/themes";
import PageList from "./components/PageList";

const Products: React.FC = () => {
  return (
    <Box style={{ backgroundColor: "#292929", height: "100vh", margin: 0 }}>
      <PageList />
    </Box>
  );
};

export default Products;
