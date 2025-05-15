import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  RadioCards,
  Strong,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import Header from "../components/Header";
import Steps2 from ".././components/Steps2";
import TextOnly from "../components/Images/TextOnly";
import ImagesAndText from "../components/Images/ImagesAndText";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { GetServerSideProps } from "next";
import { connectToDatabase } from "@/lib/utils/db";
import LayoutFormData from "@/schemas/layout.schema";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import ExperienceIcon from "../components/ExperienceIcon";

interface LayoutProps {
  quizId: string;
  initialLayoutData: string;
}

const Index: React.FC<LayoutProps> = ({ quizId, initialLayoutData }) => {
  // console.log(initialLayoutData)
  const router = useRouter()
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isModifying = searchParams.get('isModifying') === 'true';
  const [selectedValue, setSelectedValue] = useState<string>(initialLayoutData);
  console.log(selectedValue)
  async function handleNextClick() {
    setIsLoading(true);
    try {
      const layoutResponse = await fetch("/api/layoutFormApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          layoutTitle: selectedValue,
          quizId,
        }),
      });

      const layoutResponseData = await layoutResponse.json();
      if (layoutResponseData.success) {
        if (isModifying) {
          router.push('/basic');
        } else if (selectedValue === "Text Only") {
          router.push(`/review?quizId=${quizId}`);
        } else {
          router.push(`/images?quizId=${quizId}`);
        }
        console.log("Data saved successfully:", layoutResponseData.layoutResponse);
      } else {
        console.error("Error:", layoutResponseData.message);
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false)
    }
  }

  const buttonText = isModifying
  ? "Save"
  : selectedValue === "Text Only"
  ? "Create Experience"
  : "Next";
const nextButtonIcon =
  buttonText === "Create Experience" ? (
    <ExperienceIcon />
  ) : (
    <ChevronRightIcon className="absolute right-4 h-6 w-6" />
  );
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
        <Box
          style={{
            marginTop: "20px",
          }}
        >
          <Steps2 currentPage={5} />
        </Box>
        <Flex align="center" justify="center" mt="6" >
          <RadioCards.Root
            value={selectedValue}

            columns="2"
            onValueChange={setSelectedValue}
            style={{ width: "100%" }}
          >
            <RadioCards.Item value="Text Only">
              <Flex
                justify="center"
                align="center"
                height="50%"
                width="50%"
                gap="3"
                m="6"

                direction="column"
              >
                <Box height="170px">
                  <TextOnly />
                </Box>
                <Text as="p" size="3">
                  <Strong>Text only</Strong>
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet
                </Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="Image and Text">
              <Flex
                justify="center"
                align="center"
                height="50%"
                width="50%"
                gap="3"
                m="6"
                direction="column"
              >
                <Box height="170px">
                  <ImagesAndText />
                </Box>
                <Text as="p" size="3">
                  <Strong>Image and Text</Strong>
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet
                </Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>
        </Flex>
        <Flex
          style={{
            bottom: "0",
            right: "0",
            width: "100%",
            boxSizing: "border-box",
            marginRight: "40px",
          }}
          justify="between"
          align="center"
        >
          <Flex gap="10px" style={{ marginLeft: "auto" }}>
            {/* <Button
              size="3"
              variant="surface"
              disabled={isLoading}
              color="gray"
              style={{ width: "150px", cursor: "pointer" }}
              onClick={() => router.push(isModifying ? '/basic' :`/triggers?quizId=${quizId}`)}
            >
              {isModifying ? 'Cancel' : 'Back'}
            </Button> */}
            <Button
              size="3"
              variant="surface"
              disabled={isLoading}
              color="gray"
              onClick={() => router.push(isModifying ? '/basic' : `/triggers?quizId=${quizId}`)}
              style={{
                width: "223px",
                height: "48px",
                cursor: "pointer",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ChevronLeftIcon className="absolute left-4 h-6 w-6" />
              {isModifying ? "Cancel" : "Back"}
            </Button>
            {/* <Button
              size="3"
              onClick={handleNextClick}
              disabled={isLoading || !selectedValue}
              loading={isLoading}
              style={{ width: "300px", cursor: "pointer" }}
            >
              {isModifying ? 'Save' : (selectedValue === "Text Only" ? 'Create Experience' : 'Next')}

            </Button> */}
            <Button
              size="3"
              onClick={handleNextClick}
              disabled={isLoading || !selectedValue}
              loading={isLoading}
              style={{
                width: "223px",
                height: "48px",
                cursor: "pointer",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  buttonText === "Create Experience" ? "center" : "center",
                position: "relative",
                paddingLeft: buttonText === "Create Experience" ? "10px" : "0",
              }}
            >
              {buttonText === "Create Experience" ? (
                <>
                  <ExperienceIcon />
                  <span className="ml-2">{buttonText}</span>
                </>
              ) : (
                <span className="absolute left-1/2 transform -translate-x-1/2">
                  {buttonText}
                </span>
              )}
              {buttonText !== "Create Experience" && nextButtonIcon}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Index;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quizId } = context.query;

  if (!quizId) {
    return {
      redirect: {
        destination: '/basic',
        permanent: false,
      },
    };
  }

  try {
    await connectToDatabase();

    const initialLayoutResponseData = await LayoutFormData.findOne(
      { quizId },
      { layoutTitle: 1, _id: 0 } // Select only the placementTitle field
    ).lean();

    return {
      props: {
        quizId,
        initialLayoutData: initialLayoutResponseData?.layoutTitle || "",
      },
    };
  } catch (error) {
    return {
      props: {
        quizId,
        initialLayoutData: "",
      },
    };
  }
};


