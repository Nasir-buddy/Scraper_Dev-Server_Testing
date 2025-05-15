"use client";
import {
  Avatar,
  Box,
  Card,
  Heading,
  ScrollArea,
  Strong,
  Text,
  Flex,
  Grid,
  Checkbox,
} from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { collections } from "../../lib/helper/constants";
interface PlacementProps {
  onSelectionChange: (selectedIds: string[]) => void;
  searchQuery: string;
  initialSelectedIds: string[];
}

const Placement: React.FC<PlacementProps> = ({
  onSelectionChange,
  searchQuery,
  initialSelectedIds,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // const collections = [
  //   {
  //     id: "66e400b22824b5dfb815db09",
  //     name: "Winter Collection",
  //     products: 37,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
  //   },
  //   {
  //     id: "66e406282824b5dfb815db0b",
  //     name: "Summer Collection",
  //     products: 42,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
  //   },
  //   {
  //     id: "66e4109f2824b5dfb815db0d",
  //     name: "Spring Collection",
  //     products: 29,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1582719478144-1c1d1a6f1b8b?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
  //   },
  //   {
  //     id: "66e410f6b1dd35749de5ddde",
  //     name: "Autumn Collection",
  //     products: 33,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
  //   },
  //   {
  //     id: "66e41246627835f0e79ce6ac",
  //     name: "Holiday Collection",
  //     products: 25,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
  //   },
  //   {
  //     id: "66e41268627835f0e79ce6b0",
  //     name: "Casual Collection",
  //     products: 50,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
  //   },
  // ];

  const filteredCollections =
    collections?.filter((collection) =>
      (collection.name ?? "")
        .toLowerCase()
        .includes((searchQuery ?? "").toLowerCase())
    ) ?? [];

  useEffect(() => {
    onSelectionChange(selectedIds);
  }, [selectedIds, onSelectionChange]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCollections.map((item) => item.id));
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
    <Box>
      <Card>
        <Flex gap="2" direction="row" align="center">
          <Checkbox size="2" onClick={handleSelectAll} checked={selectAll} />

          <Heading as="h2" size="4">
            Select all collection
          </Heading>
        </Flex>
      </Card>
      {/* Content */}
      <ScrollArea type="always" scrollbars="vertical" style={{ height: 300 }}>
        <Box p="1">
          <Grid columns="repeat(5, 1fr)" gap="2" width="100%">
            {filteredCollections.map((item) => (
              <Card
                key={item.id}
                onClick={() => handleCardSelect(item.id)}
                style={{
                  cursor: "pointer",
                  border: selectedIds.includes(item.id)
                    ? "2px solid #3EB489"
                    : "2px solid transparent",
                }}
              >
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
              </Card>
            ))}
          </Grid>
        </Box>
      </ScrollArea>
      {/* Footer */}
      <Card>
        <Flex gap="2" direction="row" align="center" justify="between">
          <Box>{filteredCollections.length} collections </Box>
          <Box>{selectedIds.length} collections selected</Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Placement;
