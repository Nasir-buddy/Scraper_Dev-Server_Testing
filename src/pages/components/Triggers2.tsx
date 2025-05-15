import React, { useState, useEffect } from "react";
import { Box, Flex, Grid, Text, IconButton, TextField } from "@radix-ui/themes";
import {
  CheckIcon,
  CounterClockwiseClockIcon,
  EnterIcon,
  TargetIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

interface TriggerOption {
  id: number;
  icon: React.ReactNode;
  placeholder: string;
  extraInput?: boolean;
}

const triggers: TriggerOption[] = [
  { id: 1, icon: <TargetIcon />, placeholder: "User is idle for", extraInput: true },
  { id: 2, icon: <EnterIcon />, placeholder: "Exit Intent detected" },
  { id: 3, icon: <CounterClockwiseClockIcon />, placeholder: "User Clicked on Button" },
];

interface Triggers2Props {
  onChange: (selectedTriggers: { id: number; inputValue: string }[]) => void;
}

const Triggers2: React.FC<Triggers2Props> = ({ onChange }) => {
  const [selectedTriggers, setSelectedTriggers] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const selectedObjects = selectedTriggers.map(id => ({
      id,
      inputValue: inputValues[id] || ""
    }));
    onChange(selectedObjects);
  }, [selectedTriggers, inputValues, onChange]);

  const handleSelect = (index: number) => {
    setSelectedTriggers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [index]: value,
    }));
    console.log(`Input for trigger ${index}: ${value}`);
  };

  return (
    <Flex direction="column" gap="6" style={{ padding: '20px' }}>
      <Text size="4" weight="bold">
        Select Any or All Trigger Options
      </Text>

      <Grid columns="1" gap="4" width="100%">
        {triggers.map(({ id, icon, placeholder, extraInput }) => (
          <Box key={id} style={{ position: 'relative', width: '100%' }}>
            <Box
              style={{
                position: 'absolute',
                left: '-30px',
                top: '42%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            >
              <IconButton
                radius="full"
                size="3"
                color="gray"
                variant="soft"
              >
                {icon}
              </IconButton>
            </Box>

            <Box
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box style={{ position: 'relative', flexGrow: 1 }}>
                {extraInput && selectedTriggers.includes(id) && (
                  <Box
                    style={{
                      position: 'absolute',
                      left: '180px',
                      top: '38%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      display: 'flex',
                    }}
                  >
                    <TextField.Root
                      size="2"
                      placeholder=""
                      style={{
                        width: '120px',
                        fontSize: '14px',
                        padding: '8px',
                        marginRight: '10px',
                      }}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                    />
                    <span style={{ color: 'gray', marginTop: '3px' }}>
                      seconds
                    </span>
                  </Box>
                )}
                <TextField.Root
                  placeholder={placeholder}
                  size="3"
                  style={{
                    width: '100%',
                    position: 'relative',
                    height: "60px",
                    marginBottom: '20px',
                    marginLeft: '23px',
                    color: 'white',
                  }}
                  disabled={!selectedTriggers.includes(id)}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                >
                  <TextField.Slot>
                    <IconButton
                      radius="medium"
                      variant="solid"
                      size="1"
                      onClick={() => handleSelect(id)}
                    >
                      {selectedTriggers.includes(id) && <CheckIcon />}
                    </IconButton>
                  </TextField.Slot>
                  <TextField.Slot pr="3">
                    <IconButton size="2" color="gray" variant="ghost">
                      <InfoCircledIcon height="16" width="16" />
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

export default Triggers2;
