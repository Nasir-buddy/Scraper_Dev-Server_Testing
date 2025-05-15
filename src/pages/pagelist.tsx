import React from "react";
import { Box, Flex } from "@radix-ui/themes";
import PageItem from "./components/PageItem";


const PageList: React.FC = () => {
  return (
    <Box style={{ backgroundColor: "#292929", height: "100vh", margin: 0 }}>

      <PageItem />
    </Box>
  );
};

export default PageList;
