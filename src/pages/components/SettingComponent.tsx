import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import SuggestionsBox from "./SuggestionsBox";

const SettingComponent = () => {
  return (
    <Flex
      direction="column"
      className="bg-[#1A1A1A] mt-14 pt-4 px-6 sm:pt-8 text-gray-100 rounded-2xl"
      gap="4"
    >
      <Text>Next payment</Text>
      <Flex direction="row" justify="between" align="center">
        <Text>6 October 2024</Text>
        <Flex gap="4">
          <Box className="flex items-center text-xs sm:text-sm bg-black text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
            <Box
              as="span"
              className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 bg-[#FAC4234D] rounded-full mr-2"
            >
              <ExclamationTriangleIcon className="text-[#FAC423] w-[12px] h-[12px]" />
            </Box>
            Alerts (4)
          </Box>
          <Box className="flex items-center text-xs sm:text-sm bg-black text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
            <Box
              as="span"
              className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 bg-[#FAC4234D] rounded-full mr-2"
            >
              <ExclamationTriangleIcon className="text-[#FAC423] w-[12px] h-[12px]" />
            </Box>
            Alerts (4)
          </Box>
          <Box className="flex items-center text-xs sm:text-sm bg-black text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
            <Box
              as="span"
              className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 bg-[#FAC4234D] rounded-full mr-2"
            >
              <ExclamationTriangleIcon className="text-[#FAC423] w-[12px] h-[12px]" />
            </Box>
            Alerts (4)
          </Box>
        </Flex>
      </Flex>
      <SuggestionsBox/>
    </Flex>
  );
};

export default SettingComponent;
