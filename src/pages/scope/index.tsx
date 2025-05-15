import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
import { Badge, Box, Button, Callout, Flex, Grid, Select } from "@radix-ui/themes";
import Steps2 from "../components/Steps2";
import { useRouter } from "next/router";
import { ChevronLeftIcon, ChevronRightIcon, ViewHorizontalIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import ProductFormData from "../../schemas/products.schema";
import CollectionFormData from "../../schemas/collections.schema";
import mongoose from "mongoose";
import { connectToDatabase } from "../../lib/utils/db";
interface DashboardProps {
  selectedScope: string;
}
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const isModifying = searchParams.get("isModifying") === "true";
  const router = useRouter();
  const { quizId } = router.query;
  const [selectedScope, setSelectedScope] = useState<string>("any");

  useEffect(() => {
    if (selectedScope === "selectProducts") {
      router.push(
        isModifying
          ? `/scope/selectProducts?quizId=${quizId}&isModifying=true`
          : `/scope/selectProducts?quizId=${quizId}`
      );
    } else if (selectedScope === "selectCollections") {
      router.push(
        isModifying
          ? `/scope/selectCollections?quizId=${quizId}&isModifying=true`
          : `/scope/selectCollections?quizId=${quizId}`
      );
    }
  }, [selectedScope, router, isModifying, quizId]);

  const handleNextClick = async () => {
    setIsLoading(true);
    if (isModifying) {
      router.push("/basic");
    } else {
      router.push(`/questions?quizId=${quizId}`);
    }

    setIsLoading(false);
  };

  return (
    <Box p="7">
      <Flex direction="column" gap="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
          <Box>
            <Badge variant="surface" ml="4" radius="large" style={{ marginLeft: "40px" }}>Product related quiz</Badge>
            <Header />
          </Box>
        </Grid>
        <Box
          style={{
            marginTop: "20px",
          }}
        >
          <Steps2 currentPage={2} />
        </Box>

        {/* <Scope handleNextClick={handleNextClick} /> */}
        <Flex gap="4" direction="column">
          <Grid columns="4" gap="3" width="auto">
            <Select.Root
              size="3"
              onValueChange={setSelectedScope}
              defaultValue="any"
            >
              <Select.Trigger />
              <Select.Content align="center" variant="soft">
                <Select.Group>
                  <Select.Label>Select Scope</Select.Label>
                  <Select.Separator />
                  <Select.Item value="any">Any</Select.Item>
                  <Select.Separator />
                  <Select.Item value="selectCollections">
                    Select Collections
                  </Select.Item>
                  <Select.Separator />
                  <Select.Item value="selectProducts">
                    Select Products
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Callout.Root
              size="1"
              style={{ gridColumn: "span 3" }}
              color="gray"
            >
              <Callout.Icon>
                <ViewHorizontalIcon />
              </Callout.Icon>
              <Callout.Text>
                We will take all your products into accounts for the
                recommendation.
              </Callout.Text>
            </Callout.Root>
          </Grid>
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
          <Flex align="center" gap="8px"></Flex>

          <Flex gap="10px" style={{ marginLeft: "auto" }}>
            {/* <Button
              size="3"
              disabled={isLoading || isModifying}
              color="gray"
              onClick={() => router.push(`/dashboard?quizId=${quizId}`)}
              style={{ width: "150px", cursor: "pointer" }}
            >
              Back
            </Button> */}
            <Button
              size="3"
              variant="surface"
              disabled={isLoading}
              color="gray"
              onClick={() => router.push(isModifying ? '/basic' : `/dashboard?quizId=${quizId}`)}
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
              style={{ width: "300px", cursor: "pointer" }}
            >
              {isModifying ? "Save" : "Next"}
            </Button> */}
            <Button
              size="3"
              loading={isLoading}
              onClick={handleNextClick}
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
              <span className="absolute left-1/2 transform -translate-x-1/2">
                {isModifying ? "Save" : "Next"}{" "}
              </span>
              <ChevronRightIcon className="absolute right-4 h-6 w-6" />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quizId } = context.query;

  try {
    await connectToDatabase();

    const fetchScope = async (model: any, quizId: string) => {
      const data = await model
        .findOne({ quizId: new mongoose.Types.ObjectId(quizId) })
        .select("selectedScope");
      return data ? data.selectedScope : null;
    };

    const productsScope = await fetchScope(ProductFormData, quizId as string);
    const collectionsScope = await fetchScope(
      CollectionFormData,
      quizId as string
    );

    const selectedScope = productsScope || collectionsScope || "any";

    if (selectedScope === "selectProducts") {
      return {
        redirect: {
          destination: `/scope/selectProducts?quizId=${quizId}`,
          permanent: false,
        },
      };
    } else if (selectedScope === "selectCollections") {
      return {
        redirect: {
          destination: `/scope/selectCollections?quizId=${quizId}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        selectedScope,
      },
    };
  } catch (error) {
    return {
      props: {
        selectedScope: "any",
      },
    };
  }
};
export default Dashboard;
