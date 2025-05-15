"use client";
import { MagnifyingGlassIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Card,
  Heading,
  IconButton,
  ScrollArea,
  Strong,
  Text,
  Button,
  Flex,
  Grid,
  Select,
  TextField,
  RadioCards,
} from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
// import CollectionTable from "./CollectionTable";

interface PlacementProps {
  onSelectionChange: (selectedIds: string[]) => void;
}

const Placement: React.FC<PlacementProps> = ({ onSelectionChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const collections = [
    {
      id: "66e400b22824b5dfb815db09",
      name: "Winter Collection",
      products: 37,
      imageUrl:
        "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
    },
    {
      id: "66e406282824b5dfb815db0b",
      name: "Summer Collection",
      products: 42,
      imageUrl:
        "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
    },
    {
      id: "66e4109f2824b5dfb815db0d",
      name: "Spring Collection",
      products: 29,
      imageUrl:
        "https://images.unsplash.com/photo-1582719478144-1c1d1a6f1b8b?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
    },
    {
      id: "66e410f6b1dd35749de5ddde",
      name: "Autumn Collection",
      products: 33,
      imageUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
    },
    {
      id: "66e41246627835f0e79ce6ac",
      name: "Holiday Collection",
      products: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
    },
    {
      id: "66e41268627835f0e79ce6b0",
      name: "Casual Collection",
      products: 50,
      imageUrl:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
    },
  ];

  useEffect(() => {
    onSelectionChange(selectedIds);
  }, [selectedIds, onSelectionChange]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(collections.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCardSelect = (id: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <Flex gap="4" direction="column">
      <Grid columns="4" gap="3" width="auto">
        <Select.Root size="3" defaultValue="Select collection">
          <Select.Trigger />
          <Select.Content align="center" variant="soft">
            <Select.Group>
              <Select.Item value="Select collectiion" disabled>
              Select collection
              </Select.Item>
              <Select.Separator />
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Separator />
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Separator />
              <Select.Item value="grape">Grape</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <TextField.Root
          size="3"
          placeholder="Search the docs…"
          style={{ gridColumn: "span 2" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button
          size="3"
          variant="surface"
          color="gray"
          style={{ gridColumn: "span 1" }}
        >
          Search
        </Button>
      </Grid>
      <Box>
        {/* Header */}
        <Card>
          <Flex gap="2" direction="row" align="center">
            <IconButton
              radius="medium"
              variant="surface"
              size="1"
              onClick={handleSelectAll}
            >
              {selectAll && <CheckIcon />}
            </IconButton>
            <Heading as="h2" size="4">
              Select all collection
            </Heading>
          </Flex>
        </Card>
        {/* Content */}
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 325 }}>
          <Box p="4">
            <Grid columns="repeat(5, 1fr)" gap="3" width="100%">
              {collections.map((item) => (
                <RadioCards.Root
                  key={item.id}
                  size="3"
                  value={selectedIds.includes(item.id) ? item.id : ""}
                  onValueChange={() => handleCardSelect(item.id)}
                >
                  <RadioCards.Item value={item.id}>
                    <Flex gap="2" direction="column" align="center">
                      <Avatar
                        size="4"
                        src={item.imageUrl}
                        radius="full"
                        fallback={item.name.charAt(0)}
                      />
                      <Text as="p" size="3">
                        <Strong>{item.name}</Strong>
                      </Text>
                      <Text as="p" size="3">
                        {item.products} products
                      </Text>
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
              ))}
            </Grid>
          </Box>
        </ScrollArea>
        {/* Footer */}
        <Card>
          <Flex gap="2" direction="row" align="center" justify="between">
            <Box>{collections.length} collections </Box>
            <Box>{selectedIds.length} collections selected</Box>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default Placement;
