import React from "react";
import { Box, Flex } from "@radix-ui/themes";
import PlatformInventory from "./components/PlatformInventory";
import VerticalNav from "./components/VerticalNav";
import HomeHeader from "./components/HomeHeader";

const Inventory: React.FC = () => {
  return (
    <Box style={{ backgroundColor: "#101211", height: "100vh", margin: 0 }}>
      <HomeHeader title={"Inventory"}/>
      <Flex direction="row" style={{ height: "100%" }}>
        <Box
          className="flex-shrink-0"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "4rem",
            height: "100vh",
            backgroundColor: "#000000",
          }}
        >
          <VerticalNav />
        </Box>

        <Box
          style={{
            marginLeft: "4rem",
            width: "calc(100% - 4rem)",
            padding: "1rem",
            overflowY: "auto",
          }}
        >
          <PlatformInventory />
        </Box>
      </Flex>
    </Box>
  );
};

export default Inventory;
