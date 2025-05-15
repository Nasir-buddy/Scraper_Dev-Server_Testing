import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Box, Text } from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  Link2Icon,
  TargetIcon,
  DesktopIcon,
  ChevronDownIcon,
  CheckIcon,
  Pencil1Icon,
  ArrowDownIcon,
  BarChartIcon,
  PersonIcon,
  LightningBoltIcon,
  IdCardIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import GenerateHeader from "./GenerateHeader";

const ProductItem = ({ url, sku, pages, isOpen }: any) => (
  <Accordion.Item value={url} className="mb-2">
    <Accordion.Header>
      <Accordion.Trigger
        className="flex items-center justify-between w-full overflow-auto md:overflow-none p-1 md:p-3 bg-gray-800 rounded-md hover:bg-gray-700"
        style={{ backgroundColor: "#393939" }}
      >
        <Box className="flex space-x-1 md:space-x-16">
          <Box className="flex items-center space-x-1 md:space-x-3 flex-grow">
            <Link2Icon className="text-teal-500" />
            <span className="text-sm font-medium text-white">{url}</span>
          </Box>
          <Box className="flex items-center space-x-1 md:space-x-3 flex-grow justify-center">
            <TargetIcon className="text-teal-500" />
            <span className="text-sm font-medium text-white">SKU: {sku}</span>
          </Box>
        </Box>
        <Box className="flex items-center space-x-1 md:space-x-3 flex-grow justify-end">
          <Box className="flex items-center space-x-0 md:space-x-1 rounded px-0 md:px-2 py-1">
            <DesktopIcon className="text-teal-500" />
            <span className="text-sm font-medium text-white">
              {pages} Pages
            </span>
          </Box>
          {isOpen ? (
            <ChevronUpIcon className="text-teal-500" />
          ) : (
            <ChevronDownIcon className="text-white" />
          )}
        </Box>
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((pageNum) => (
        <PageCard key={pageNum} pageNum={pageNum} />
      ))}
    </Accordion.Content>
  </Accordion.Item>
);

const PageCard = ({ pageNum }: any) => (
  <Box
    className="relative bg-gray-800 p-4 rounded-md border border-teal-400"
    style={{ backgroundColor: "#292929" }}
  >
    <Box className="absolute top-0 left-0 p-2">
      <LightningBoltIcon className="w-4 h-4 text-teal-400" />
    </Box>
    <Box className="absolute top-0 right-0 p-2">
      <Pencil1Icon className="w-4 h-4 text-teal-400" />
    </Box>

    <Box className="flex justify-center mb-4">
      <Box className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-teal-400">
        <BarChartIcon className="w-10 h-10 text-gray-600" />
      </Box>
    </Box>
    <Box className="text-center mb-4">
      <Text className="text-white text-xl font-bold text-center">
        Page Name {pageNum}
      </Text>
    </Box>

    <Box className="space-y-2 mb-6">
      <Box className="flex justify-between items-center">
        <Box className="flex items-center text-white">
          <PersonIcon className="w-4 h-4 mr-2 text-teal-500" />
          <span>Author</span>
        </Box>
        <span className="text-white">Lorem Ipsum</span>
      </Box>
      <Box className="flex justify-between items-center">
        <Box className="flex items-center text-white">
          <IdCardIcon className="w-4 h-4 mr-2 text-teal-500" />
          <span>Conversion Rate, %</span>
        </Box>
        <span className="text-white">10%</span>
      </Box>
      <Box className="flex justify-between items-center">
        <Box className="flex items-center text-white">
          <LightningBoltIcon className="w-4 h-4 mr-2 text-teal-500" />
          <span>Traffic Split</span>
        </Box>
        <span className="text-white">50%</span>
      </Box>
    </Box>

    <button
      className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
      style={{ backgroundColor: "#393939" }}
    >
      Publish
    </button>
  </Box>
);

export default function PageItem() {
  const [openItem, setOpenItem] = React.useState("");

  return (
    <Box className="min-h-screen p-6" style={{ backgroundColor: "#242424" }}>
      <Box className="max-w-7xl mx-auto space-y-6">
        <Box className="py-4">
          <GenerateHeader />
        </Box>

        <Box className="flex items-center space-x-4">
          <Box className="flex-grow relative">
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full bg-black  text-white placeholder-gray-600 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </Box>
          <button
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:!bg-gray-500 transition-colors"
            style={{ backgroundColor: "#393939" }}
          >
            Search
          </button>
        </Box>

        <Box className="flex items-center space-x-2 text-sm text-gray-400">
          <Checkbox.Root className="flex h-4 w-4 items-center justify-center rounded border border-white hover:bg-gray-600">
            <Checkbox.Indicator>
              <CheckIcon className="text-teal-500" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-white">Select All Pages</span>
        </Box>

        <Accordion.Root
          type="single"
          value={openItem}
          onValueChange={setOpenItem}
          className="space-y-2"
        >
          {[...Array(17)].map((_, index) => (
            <ProductItem
              key={index}
              url={`https://productlink.com/product/#p/${index + 1}`} // Ensure unique URLs
              sku={`12345-BL-XL-${index + 1}`}
              pages={4}
              isOpen={
                openItem === `https://productlink.com/product/#p/${index + 1}`
              }
            />
          ))}
        </Accordion.Root>

        <Box className="flex justify-end">
          <button
            className="bg-teal-400 text-black px-6 py-2 rounded-md hover:!bg-teal-700 transition-colors"
            style={{ backgroundColor: "#6ACAB2" }}
          >
            Publish: 234 Generated Pages
          </button>
        </Box>
      </Box>
    </Box>
  );
}
