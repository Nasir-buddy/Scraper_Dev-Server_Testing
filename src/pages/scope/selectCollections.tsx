import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";
import CollectionFormData, {
  CollectionsFormDataType,
} from "../../schemas/collections.schema";
import Header from "../components/Header";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Select,
  TextField,
} from "@radix-ui/themes";
import Steps2 from "../components/Steps2";
import TestPlacement from "../components/TestPlacement";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { connectToDatabase } from "../../lib/utils/db";
import mongoose from "mongoose";
import { CollectionsFormApiResponseType } from "../api/collectionsFormApi";
interface Dashboard3Props {
  initialSelectedIds: string[];
  initialSelectedScope: string;
}

const Dashboard3: React.FC<Dashboard3Props> = ({
  initialSelectedIds,
  initialSelectedScope,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { quizId } = router.query as { quizId: string };
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [selectedScope, setSelectedScope] =
    useState<string>(initialSelectedScope);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const isModifying = searchParams.get("isModifying") === "true";

  useEffect(() => {
    if (selectedScope === "any") {
      router.push(`/scope?quizId=${quizId}`);
    } else if (selectedScope === "selectProducts") {
      router.push(
        isModifying
          ? `/scope/selectProducts?quizId=${quizId}&isModifying=true`
          : `/scope/selectProducts?quizId=${quizId}`
      );
    }
  }, [selectedScope, router, quizId, isModifying]);

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      const collectionsFormApiResponse = await fetch(
        "/api/collectionsFormApi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedCollections: selectedIds,
            selectedScope,
            quizId,
          }),
        }
      );
      const collectionsREsponse: CollectionsFormApiResponseType =
        await collectionsFormApiResponse.json();
      if (collectionsREsponse.success) {
        if (isModifying) {
          router.push("/basic");
        } else {
          router.push(`/questions?quizId=${quizId}`);
        }
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
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
        <Box style={{ marginTop: "20px" }}>
          <Steps2 currentPage={2} />
        </Box>

        <Flex gap="4" direction="column">
          <Grid columns="4" gap="3" width="auto">
            <Select.Root
              size="3"
              onValueChange={setSelectedScope}
              defaultValue={initialSelectedScope}
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
            <TextField.Root
              size="3"
              placeholder="Search collections.."
              style={{ gridColumn: "span 3" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            {/* <Button
              size="3"
              variant="surface"
              color="gray"
              style={{ gridColumn: "span 1" }}
            >
              Search
            </Button> */}
          </Grid>
        </Flex>

        <TestPlacement
          onSelectionChange={handleSelectionChange}
          searchQuery={searchQuery}
          initialSelectedIds={initialSelectedIds}
        />
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

          {/* Right-side content: Buttons */}
          <Flex gap="10px" style={{ marginLeft: "auto" }}>
            {/* <Button
              size="3"
              variant="surface"
              disabled={isLoading}
              color="gray"
              onClick={() =>
                router.push(
                  isModifying ? "/basic" : `/dashboard?quizId=${quizId}`
                )
              }
              style={{ width: "150px", cursor: "pointer" }}
            >
              {isModifying ? "Cancel" : "Back"}
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
              disabled={isLoading || selectedIds.length === 0}
              onClick={handleNext}
              loading={isLoading}
              style={{ width: "300px", cursor: "pointer" }}
            >
              {isModifying ? "Save" : "Next"}
            </Button> */}
            <Button
              disabled={isLoading || selectedIds.length === 0}
              size="3"
              loading={isLoading}
              onClick={handleNext}
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

  if (!quizId || typeof quizId !== "string") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  await connectToDatabase();

  const existingData = await CollectionFormData.findOne({ quizId });

  return {
    props: {
      initialSelectedIds: existingData
        ? existingData.selectedCollections.map((id: mongoose.Types.ObjectId) =>
          id.toString()
        )
        : [],
      initialSelectedScope: existingData
        ? existingData.selectedScope
        : "selectCollections",
    },
  };
};

export default Dashboard3;
