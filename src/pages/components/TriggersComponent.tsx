import {
  Box,
  Strong,
  Text,
  Flex,
  RadioCards,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import Companion from './Images/Companion'
import PageEmbedded from "./Images/PageEmbedded";
import PopUp from "./Images/PopUp";
import StandAlone from "./Images/StandAlone";
export interface placementItemType {
  id: number;
  component: React.ReactNode;
  title: string;
  description: string;
}

interface TriggerComponentProps {
  onSelectionChange: (item: placementItemType | null) => void;
  initialPlacementData?: string
}
const items: placementItemType[] = [
  {
    id: 1,
    component: <Companion />,
    title: "Companion",
    description: "The quick brown fox jumps over."
  },
  {
    id: 2,
    component: <StandAlone />,
    title: "Stand Alone",
    description: "A beautiful view of nature."
  },
  {
    id: 3,
    component: <PopUp />,
    title: "Pop up",
    description: "The hustle and bustle of city life."
  },
  {
    id: 4,
    component: <PageEmbedded />,
    title: "Page Embedded",
    description: "Exploring the great outdoors."
  }
];

const TriggerComponent: React.FC<TriggerComponentProps> = ({ onSelectionChange,initialPlacementData }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  useEffect(() => {
    if (initialPlacementData) {
      const selectedItem = items.find(item => item.title === initialPlacementData);
      if (selectedItem) {
        setSelectedValue(selectedItem.id.toString());
        onSelectionChange(selectedItem);
      }
    }
  },[initialPlacementData]);
  
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const selectedItem = items.find(item => item.id.toString() === value) || null;
    onSelectionChange(selectedItem);
  };

  return (
      <RadioCards.Root
        value={selectedValue}
        columns="2"
        onValueChange={handleValueChange}
        style={{ width: "100%" }}
      >
        {items.map(item => (
          <RadioCards.Item key={item.id} value={item.id.toString()}>
            <Flex
              justify="center"
              align="center"
              height="50%"
              width="50%"
              gap="3"
              direction="column"
            >
              <Box  height="140px">
                {item.component}
              </Box>
              <Text as="p" size="3">
                <Strong>{item.title}</Strong>
              </Text>
              <Text>{item.description}</Text>
            </Flex>
          </RadioCards.Item>
        ))}
      </RadioCards.Root>
  );
};

export default TriggerComponent;
