import React from "react";
import { Box, Flex } from "@radix-ui/themes";
import VerticalNav from "./components/VerticalNav";
import HomeHeader from "./components/HomeHeader";
import SettingComponent from "./components/SettingComponent";

const Setting: React.FC = () => {
  return (
    <Box className="bg-black h-screen m-0">
      <HomeHeader title="Setting" />
      <Flex direction="row" className="h-full">
        <Box
          className="flex-shrink-0 fixed top-0 left-0 w-16 h-screen bg-black"
        >
          <VerticalNav />
        </Box>

        <Box
          className="ml-16 w-[calc(100%-4rem)] p-4 overflow-y-auto"
        >
          {/* Content goes here */}
          <SettingComponent/>
        </Box>
      </Flex>
    </Box>
  );
};

export default Setting;