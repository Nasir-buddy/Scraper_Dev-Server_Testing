import { BellIcon, CubeIcon, GearIcon, HomeIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Box, Flex, Text } from "@radix-ui/themes";
import React from "react"; // Import the SVG as a React component
import Logo from "./Logo";
import ProductIcon from "./ProductIcon";

ProductIcon;
interface HomeHeaderProps {
  title: string;
}
function getIcon(title: string) {
  switch (title) {
    case "Home":
      return <HomeIcon />;
    case "Inventory":
      return <ProductIcon color="#3EC4A1" />;
    case "Experiences":
      return (
        <svg
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.1667 13.667C13.1667 12.2863 11.3012 11.167 9 11.167C6.69881 11.167 4.83333 12.2863 4.83333 13.667M16.5 11.1673C16.5 10.1421 15.4716 9.2611 14 8.87533M1.5 11.1673C1.5 10.1421 2.52841 9.2611 4 8.87533M14 5.53041C14.5115 5.07265 14.8333 4.40741 14.8333 3.66699C14.8333 2.28628 13.714 1.16699 12.3333 1.16699C11.693 1.16699 11.109 1.4077 10.6667 1.80357M4 5.53041C3.48854 5.07265 3.16667 4.40741 3.16667 3.66699C3.16667 2.28628 4.28595 1.16699 5.66667 1.16699C6.30696 1.16699 6.89104 1.4077 7.33333 1.80357M9 8.66699C7.61929 8.66699 6.5 7.5477 6.5 6.16699C6.5 4.78628 7.61929 3.66699 9 3.66699C10.3807 3.66699 11.5 4.78628 11.5 6.16699C11.5 7.5477 10.3807 8.66699 9 8.66699Z"
            stroke="#3EC4A1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Setting":
      return <GearIcon />;
    case "Optimizations":
      return <OptimizationIcon />;
    default:
      return null;
  }
}
const HomeHeader = ({ title }: HomeHeaderProps) => {
  return (
    <Box className="fixed top-0 w-full z-50 bg-black h-14">
      <Flex
        gap="3"
        width="100%"
        direction="row"
        align="center"
        justify="between"
        height="100%"
      >
        <Flex
          maxWidth="350px"
          direction="row"
          align="center"
          height="100%"
          ml="4"
          gap="3"
          mt="2"
        >
          <Logo />
          <Badge size="3" radius="full">
            {getIcon(title)}
            {title}
          </Badge>
        </Flex>
        <Box maxWidth="350px">
          <Flex
            maxWidth="350px"
            direction="row"
            align="center"
            height="100%"
            mr="6"
            gap="3"
          >
            <Box className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 bg-[#101211]">
              <BellIcon />
            </Box>
            <Badge
              color="gray"
              radius="full"
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
                backgroundColor: "#101211",
              }}
            >
              <Avatar
                size="1"
                radius="full"
                src="https://i.pinimg.com/736x/8a/b0/12/8ab0121c7d7a90f6415b4b0edaf035d9.jpg"
                fallback="A"
              />{" "}
              Client&apos;s company
            </Badge>
            <Avatar
              size="2"
              radius="full"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />{" "}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeHeader;

const OptimizationIcon = () => {
  return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              stroke="#3EC4A1"
              fill="#3EC4A1"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2C9.44771 2 9 1.55228 9 1C9 0.447715 9.44771 0 10 0H15C15.5523 0 16 0.447715 16 1V6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6V3.41421L9.70711 7.70711C9.31658 8.09763 8.68342 8.09763 8.29289 7.70711L6 5.41421L1.70711 9.70711C1.31658 10.0976 0.683417 10.0976 0.292893 9.70711C-0.0976311 9.31658 -0.0976311 8.68342 0.292893 8.29289L5.29289 3.29289C5.68342 2.90237 6.31658 2.90237 6.70711 3.29289L9 5.58579L12.5858 2H10Z"
          />
      </svg>
  )
}