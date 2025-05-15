import Header from "./components/Header";
import { useSearchParams } from "next/navigation";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import Steps2 from "./components/Steps2";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { GetServerSideProps } from "next";
import { connectToDatabase } from "@/lib/utils/db";
import TriggersFormData, { TriggersDataItem } from "@/schemas/triggers.schema";
import {
  CounterClockwiseClockIcon,
  EnterIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import GroupIcon from "./components/GroupIcon";
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
interface TriggersPageProps {
  idleSeconds: string;
  initialCheckedItems: TriggersDataItem[];
  quizId: string;
}

function dashboard6({
  initialCheckedItems,
  quizId,
  idleSeconds,
}: TriggersPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<TriggersDataItem[]>(initialCheckedItems);
  const [extraInputValue, setExtraInputValue] = useState<string>(idleSeconds);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isModifying = searchParams.get("isModifying") === "true";
  // const [isValid, setIsValid] = useState<boolean>(true);

  // useEffect(() => {
  //   setIsAnyItemChecked(checkedItems.some((item) => item.isChecked));
  // }, [checkedItems]);

  // useEffect(() => {
  //   const isFirstTriggerChecked = checkedItems.some(
  //     (item) => item.triggersItemSlug === "user_is_idle_for" && item.isChecked
  //   );
  //   if (isFirstTriggerChecked && !extraInputValue) {
  //     setIsValid(false);
  //   } else {
  //     setIsValid(true);
  //   }
  // }, [checkedItems, extraInputValue]);
  const handleNextClick = async () => {
    setIsLoading(true);

    // Update the first checked item's slug if applicable
    // const updatedCheckedItems = checkedItems.map((item, index) => {
    //   if (index === 0 && item.isChecked) {
    //     return {
    //       ...item,
    //       triggersItemSlug: `${item.triggersItemSlug}_${extraInputValue}_seconds`,
    //     };
    //   }
    //   return item;
    // });

    try {
      const response = await fetch("/api/triggersFormApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          triggersData: checkedItems,
          quizId,
          idleSeconds: extraInputValue,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        router.push(isModifying ? "/basic" : `/layout?quizId=${quizId}`);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCancelClick = useCallback(() => {
  //   router.push(isModifying ? "/basic" : `/layout?quizId=${quizId}`);
  // }, [isModifying, quizId, router]);
  const handleCheckboxChange = (triggersItemSlug: string) => {
    setCheckedItems((prev) => {
      const itemExists = prev.some(
        (item) => item.triggersItemSlug === triggersItemSlug
      );

      if (itemExists) {
        return prev.map((item) => {
          if (item.triggersItemSlug === triggersItemSlug) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        });
      } else {
        // Add new item if it doesn't exist
        return [...prev, { triggersItemSlug, isChecked: true }];
      }
    });

    if (triggersItemSlug === "user_is_idle_for") {
      setExtraInputValue("");
    }
  };

  const isButtonDisabled =
    isLoading ||
    checkedItems.length === 0 ||
    checkedItems.every((item) => !item.isChecked) ||
    (checkedItems.some(
      (item) => item.triggersItemSlug === "user_is_idle_for" && item.isChecked
    ) &&
      !extraInputValue);

  const isFirstTriggerChecked = checkedItems.some(
    (item) => item.triggersItemSlug === "user_is_idle_for" && item.isChecked
  );
  console.log("Checked Item", checkedItems, "Idle  second:", extraInputValue);
  return (
    <Box p="7">
      <Flex direction="column" gap="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
          <Box>
            <Badge
              variant="surface"
              ml="4"
              radius="large"
              style={{ marginLeft: "40px" }}
            >
              Product related quiz
            </Badge>
            <Header />
          </Box>
        </Grid>
        <Box style={{ marginTop: "20px" }}>
          <Steps2 currentPage={4} />
        </Box>
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
                              checked={checkedItems.some(
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
                                onChange={(e) =>
                                  setExtraInputValue(e.target.value)
                                }
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
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Flex
            style={{
              bottom: "0",
              right: "0",
              width: "100%",
              boxSizing: "border-box",
            }}
            justify="between"
            align="center"
          >
            <Flex gap="10px" style={{ marginLeft: "auto" }}>
              <Button
                size="3"
                variant="surface"
                disabled={isLoading}
                color="gray"
                // onClick={handleCancelClick}
                style={{ width: "150px", cursor: "pointer" }}
              >
                {isModifying ? "Cancel" : "Back"}
              </Button>
              <Button
                size="3"
                disabled={isButtonDisabled}
                loading={isLoading}
                onClick={handleNextClick}
                style={{ width: "300px", cursor: "pointer" }}
              >
                {isModifying ? "Save" : "Next"}
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quizId } = context.query;

  if (!quizId) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  try {
    await connectToDatabase();
    const triggersFormData = await TriggersFormData.findOne({ quizId }).lean();

    return {
      props: {
        initialCheckedItems: triggersFormData
          ? triggersFormData.triggersData
          : [],
        idleSeconds: triggersFormData ? triggersFormData.idleSeconds : "",
        quizId,
      },
    };
  } catch (error) {
    console.log("Error in fetching triggers Data in form page:", error);
    return {
      props: {
        initialCheckedItems: [],
        idleSeconds: "",
        quizId,
      },
    };
  }
};

export default dashboard6;
