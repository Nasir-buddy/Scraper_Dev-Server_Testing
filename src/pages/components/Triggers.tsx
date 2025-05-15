import React, { useCallback, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  IconButton,
  TextField,
  Checkbox,
  Card,
} from "@radix-ui/themes";
import {
  CounterClockwiseClockIcon,
  EnterIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import GroupIcon from "./GroupIcon";

interface TriggerOption {
  id: number;
  icon: React.ReactNode;
  placeholder: string;
  triggersItemSlug: string;
  extraInput?: boolean;
}

const triggers: TriggerOption[] = [
  {
    id: 1,
    icon: <GroupIcon />,
    placeholder: "User is idle for",
    triggersItemSlug: "user_is_idle_for",
    extraInput: true,
  },
  {
    id: 2,
    icon: <EnterIcon />,
    placeholder: "Exit Intent detected",
    triggersItemSlug: "exit_intent_detected",
  },
  {
    id: 3,
    icon: <CounterClockwiseClockIcon />,
    placeholder: "User Clicked on Button",
    triggersItemSlug: "user_clicked_on_button",
  },
];

interface TriggersProps {
  checkedItems: { triggersItemSlug: string; isChecked: boolean }[];
  setCheckedItems: React.Dispatch<
    React.SetStateAction<{ triggersItemSlug: string; isChecked: boolean }[]>
  >;
  extraInputValue: string;
  setExtraInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function Triggers({
  checkedItems,
  setCheckedItems,
  extraInputValue,
  setExtraInputValue,
}: TriggersProps) {
  useEffect(() => {
    setCheckedItems((prev) =>
      triggers.map((trigger) => ({
        triggersItemSlug: trigger.triggersItemSlug,
        isChecked:
          trigger.triggersItemSlug === "user_is_idle_for"
            ? !!extraInputValue ||
              prev.some(
                (item) =>
                  item.triggersItemSlug === trigger.triggersItemSlug &&
                  item.isChecked
              )
            : prev.some(
                (item) =>
                  item.triggersItemSlug === trigger.triggersItemSlug &&
                  item.isChecked
              ),
      }))
    );
  }, [setCheckedItems, extraInputValue]);
  const handleCheckboxChange = useCallback(
    (triggersItemSlug: string) => {
      setCheckedItems((prev) =>
        prev.map((item) =>
          item.triggersItemSlug === triggersItemSlug
            ? { ...item, isChecked: !item.isChecked }
            : item
        )
      );

      if (triggersItemSlug === "user_is_idle_for") {
        setExtraInputValue("");
      }
    },
    [setCheckedItems, setExtraInputValue]
  );

  const isFirstTriggerChecked = checkedItems.some(
    (item) => item.triggersItemSlug === "user_is_idle_for" && item.isChecked
  );

  return (
    <Flex direction="column" gap="4">
      <Text size="4" weight="bold">
        Select Any or All Trigger Options
      </Text>

      <Grid columns="1" gap="6" width="100%">
        {triggers.map(
          ({ id, icon, placeholder, triggersItemSlug, extraInput }) => (
            <Box key={id} style={{ position: "relative", width: "100%" }}>
              <Box
                style={{
                  position: "absolute",
                  left: "-30px",
                  top: "42%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              >
                <IconButton radius="full" size="3" color="gray" variant="soft">
                  {icon}
                </IconButton>
              </Box>

              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box style={{ position: "relative", flexGrow: 1 }}>
                  <Card
                    size="2"
                    ml="4"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <Text
                      as="label"
                      size="3"
                      style={{
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <Flex gap="2">
                        <Checkbox
                          size="2"
                          checked={checkedItems?.some(
                            (item) =>
                              item.triggersItemSlug === triggersItemSlug &&
                              item.isChecked
                          )}
                          onCheckedChange={() =>
                            handleCheckboxChange(triggersItemSlug)
                          }
                        />
                        {placeholder}
                      </Flex>
                      {extraInput && (
                        <Box
                          style={{
                            display: "flex",
                          }}
                        >
                          <TextField.Root
                            size="1"
                            style={{
                              width: "100px",
                              fontSize: "14px",
                              height: "100%",
                              marginRight: "10px",
                            }}
                            value={extraInputValue}
                            onChange={(e) => setExtraInputValue(e.target.value)}
                            disabled={!isFirstTriggerChecked}
                          />
                          <span>seconds</span>
                        </Box>
                      )}
                    </Text>
                    <IconButton size="3" color="gray" variant="ghost">
                      <InfoCircledIcon height="16" width="16" />
                    </IconButton>
                  </Card>
                </Box>
              </Box>
            </Box>
          )
        )}
      </Grid>
    </Flex>
  );
}

export default Triggers;
