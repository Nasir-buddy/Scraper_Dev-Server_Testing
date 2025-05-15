import * as React from "react";
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Text } from "@radix-ui/themes";
import ProductIcon from "./ProductIcon";
import FileIcon from "./FileIcon";

export default function PlatformInventory() {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const handleToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <Box className="min-h-screen p-6">
      <Box className="relative mb-6 mt-10">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full text-white placeholder-gray-400 rounded-full py-4 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          style={{ backgroundColor: "#1a1a1a", fontStyle: "20px" }}
        />
      </Box>

      <Accordion.Root type="single" collapsible>
        {[1, 2, 3, 4, 5, 6].map((item) => {
          const itemValue = `item-${item}`;
          return (
            <Accordion.Item
              key={item}
              value={itemValue}
              className="overflow-hidden mt-1 first:mt-0 last:mb-4 rounded-2xl"
              style={{ backgroundColor: "#1A1A1A", marginBottom: "15px" }}
            >
              <Accordion.Header>
                <Accordion.Trigger
                  onClick={() => handleToggle(itemValue)}
                  className="w-full flex items-center justify-between text-white py-3 px-4 rounded-lg hover:bg-gray-700"
                >
                  <Box className="flex items-center">
                    <Box
                      className="flex items-center justify-center text-green-500 p-2 rounded-full hover:bg-gray-700"
                      style={{ backgroundColor: "#254D41" }}
                    >
                       <ProductIcon color="#3EC4A1"/>
                    </Box>
                    <span
                      className="ml-2 text-1xl"
                      style={{ fontSize: "20px" }}
                    >
                      https://productlink.com/product/#p/66a74a
                    </span>
                  </Box>

                  <Box className="flex items-center">
                    <Box className="text-green-500 p-1 rounded-full hover:bg-gray-700">
                    <FileIcon color="#3EC4A1"/>
                    </Box>
                    <span className="ml-2 mr-5">SKU: 12345-BL-XL</span>

                    {openItem === itemValue ? (
                      <Box
                        className="flex items-center justify-center text-green-500 p-2 rounded-full hover:bg-gray-700"
                        style={{ backgroundColor: "#101211" }}
                      >
                        <ArrowUpIcon
                          className="w-5 h-5 text-green-500"
                          aria-hidden
                        />
                      </Box>
                    ) : (
                      <Box
                        className="flex items-center justify-center text-green-500 p-2 rounded-full hover:bg-gray-700"
                        style={{ backgroundColor: "#101211" }}
                      >
                        <ArrowDownIcon
                          className="text-gray-400 w-5 h-5"
                          aria-hidden
                        />
                      </Box>
                    )}
                  </Box>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="text-white overflow-hidden rounded-b-lg">
                <Box className="p-4">
                  <Box className="py-4">
                    <Text className="text-lg mb-5" style={{ fontSize: "20px" }}>
                      Descriptive
                    </Text>
                  </Box>

                  <Box className="flex flex-wrap gap-2">
                    {[
                      "White",
                      "Medium",
                      "White",
                      "Medium",
                      "White",
                      "Medium",
                      "White",
                      "Medium",
                      "White",
                      "Medium",
                      "White",
                      "Medium",
                      "White",
                      "Medium",
                    ].map((text, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: "#101211" }}
                      >
                        {text}
                      </span>
                    ))}
                  </Box>
                  <Box className="py-4">
                    <Text
                      className="text-lg mt-8 mb-2"
                      style={{ fontSize: "20px" }}
                    >
                      Semantic
                    </Text>
                  </Box>

                  <Box className="flex flex-wrap gap-2">
                    {[
                      "Running training",
                      "Running training",
                      "Running training",
                    ].map((text, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: "#101211" }}
                      >
                        {text}
                      </span>
                    ))}
                  </Box>
                </Box>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </Box>
  );
}
