"use client";
import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Separator,
  Text,
  Box,
  Heading,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

type Step = {
  name: string;
  number: number;
  info: string;
};

export default function Steps() {
  const [currentPage, setCurrentPage] = useState<number>(3);
  const [popupInfo, setPopupInfo] = useState<Step | null>(null);

  const steps: Step[] = [
    { name: "Basic Info", number: 1, info: "Rhoncus morbi et ullamcorper at sit" },
    { name: "Scope", number: 2, info: "Rhoncus morbi et ullamcorper at sit" },
    { name: "Placement", number: 3, info: "Rhoncus morbi et ullamcorper at sit" },
    { name: "Triggers", number: 4, info: "Rhoncus morbi et ullamcorper at sit" },
    { name: "Questions", number: 5, info: "Rhoncus morbi et ullamcorper at sit" },
  ];

  const handleInfoClick = (step: Step) => {
    setPopupInfo(step);
  };

  const handleClosePopup = () => {
    setPopupInfo(null);
  };

  return (
    <Flex direction="column" align="center" justify="center" width="100%" style={{ padding: "1rem" }}>
      <Flex direction="row" align="center" justify="center" width="100%" style={{ flexWrap: "wrap" }}>
        {steps.map((step, index) => (
          <Flex
            key={index}
            direction="column"
            align="center"
            justify="center"
            position="relative"
            gap="2"
            style={{
              flex: 1,
              textAlign: "center",
              maxWidth: "20%",
              minWidth: "150px",
            }}
          >
            <Flex align="center" justify="center" direction="column" position="relative" style={{ marginBottom: "1rem" }}>
              {index <= currentPage - 1 ? (
                <IconButton
                  variant="classic"
                  color="mint"
                  size="1"
                  radius="full"
                  style={{ width: "24px", height: "24px" }}
                  onClick={() => handleInfoClick(step)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4669 5.72684C14.7558 5.91574 14.8369 6.30308 14.648 6.59198L10.39799 13.092C10.29783 13.2452 10.1356 13.3467 9.95402 13.3699C9.77247 13.3931 9.58989 13.3355 9.45446 13.2124L6.70446 10.7124C6.44905 10.4802 6.43023 10.0849 6.66242 9.82953C6.89461 9.57412 7.28989 9.55529 7.5453 9.78749L9.75292 11.7944L13.6018 5.90792C13.7907 5.61902 14.178 5.53795 14.4669 5.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </IconButton>
              ) : (
                <IconButton
                  variant="surface"
                  size="1"
                  color="gray"
                  radius="full"
                  style={{ width: "24px", height: "24px" }}
                >
                  {step.number}
                </IconButton>
              )}
              {index < steps.length - 1 && (
                <Flex
                  direction="row"
                  align="center"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    width: "220px",
                    height: "1px",
                    backgroundColor: "#d3d3d3",
                    zIndex: -1,
                    transform: "translateX(20px)",
                  }}
                >
                  <Separator orientation="horizontal" size="1" style={{ width: "100%", height: "1px", backgroundColor: "#d3d3d3" }} />
                </Flex>
              )}
            </Flex>

            <Box style={{ display: "flex", flexDirection: "column", marginLeft: "130px" }}>
              <Box style={{ display: "flex", alignItems: "center" }} onClick={() => handleInfoClick(step)}>
                <InfoCircledIcon />
                <Heading as="h5" size="5" weight="medium" style={{ marginLeft: "5px" }}>
                  {step.name}
                </Heading>
              </Box>
              <Text size="1" style={{ marginTop: "5px" }}>{step.info}</Text>
            </Box>

            {popupInfo && popupInfo.number === step.number && (
              <Popover.Root open={true} onOpenChange={handleClosePopup}>
                <Popover.Trigger asChild>
                  <Box style={{ display: "inline-block" }} />
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className="PopoverContent"
                    side="top"
                    align="center"
                    sideOffset={5}
                  >
                    <Text>{popupInfo.name}</Text>
                    <Popover.Arrow className="PopoverArrow" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

const styles = `
  .PopoverContent {
    border-radius: 4px;
    padding: 8px;
    background-color: black;
    color: white;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    white-space: nowrap;
    font-size: 12px;
  }

  .PopoverArrow {
    fill: black;
  }

  @media (max-width: 600px) {
    .PopoverContent {
      font-size: 10px;
    }
  }
`;

if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
