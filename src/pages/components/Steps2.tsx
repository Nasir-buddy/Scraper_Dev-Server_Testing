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

interface Step {
  name: string;
  number: number;
  info: string;
}

interface StepsProps {
  currentPage: number;
}

export default function Steps({ currentPage }: StepsProps) {
  const [popupInfo, setPopupInfo] = useState<Step | null>(null);

  const steps: Step[] = [
    {
      name: "Basic Info",
      number: 1,
      info: "Rhoncus morbi et ullamcorper at sit",
    },
    { name: "Scope", number: 2, info: "Rhoncus morbi et ullamcorper at sit" },
    {
      name: "Questions",
      number: 3,
      info: "Rhoncus morbi et ullamcorper at sit",
    },
    {
      name: "Triggers",
      number: 4,
      info: "Rhoncus morbi et ullamcorper at sit",
    },
    {
      name: "Layout",
      number: 5,
      info: "Rhoncus morbi et ullamcorper at sit",
    },
    {
      name: "Images",
      number: 6,
      info: "Rhoncus morbi et ullamcorper at sit",
    },
  ];

  const handleInfoClick = (step: Step) => {
    setPopupInfo(step);
  };

  // const handleClosePopup = () => {
  //   setPopupInfo(null);
  // };

  return (
    <Flex
      direction="row"
      gap="3"
      justify="between"
      style={{
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      {steps.map((step, index) => (
        <Flex key={index} direction="column" width="100%" >
          <Flex direction="row" align="center" justify="between" gap="3" >
            {index <= currentPage - 2 ? (
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
            ):index==currentPage-1?
            (
              <IconButton
                size="1"
                radius="full"
                style={{ width: "24px", height: "24px" }}
              >
                {step.number}
              </IconButton>
            )
             : (
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
              <Separator
                orientation="horizontal"
                color={index < currentPage-1 ? "mint" : "gray"}
                size="1"
                style={{
                  width: "100%",
                  height:"2px"
                }}
              />
            )}
          </Flex>
          <Flex direction="column" width="100%"  justify="start">
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => handleInfoClick(step)}
              >
                <InfoCircledIcon />
                <Heading
                  as="h5"
                  size="5"
                  weight="medium"
                  style={{ marginLeft: "5px" }}
                >
                  {step.name}
                </Heading>
              </Box>
              {index + 1 === currentPage || (popupInfo && popupInfo.number === step.number) ? (
                <Text size="1" style={{ marginTop: "5px", width: "50%" }}>
                  {step.info}
                </Text>
              ) : null}
            </Box>
            
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
