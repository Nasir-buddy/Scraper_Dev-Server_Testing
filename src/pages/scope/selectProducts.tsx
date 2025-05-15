import { ObjectId } from 'mongodb';
import { useSearchParams } from 'next/navigation';
import { ProductsFormApiResponseType } from '../api/productsFormApi';
import Header from "../components/Header";
import { Badge, Box, Button, Flex, Grid, Select, TextField } from "@radix-ui/themes";
import Steps2 from "../components/Steps2";
import { useRouter } from "next/router";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import ProductSelectionTable from "../components/ProductsSelection";
import { GetServerSideProps } from "next";

import ProductFormData, { ProductsFormDataType } from "../../schemas/products.schema";
import { connectToDatabase } from "../../lib/utils/db";

interface DashboardProps {
  initialSelectedProducts: string[];
}

const Dashboard = ({ initialSelectedProducts }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { quizId } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(initialSelectedProducts)
  );
  const [selectedScope, setSelectedScope] = useState<string>("selectProducts");
  const searchParams = useSearchParams();
  const isModifying = searchParams.get('isModifying') === 'true';


  useEffect(() => {
    if (!quizId) {
      console.error("Quiz ID not found in URL");
      router.push("/dashboard");
    }
    if (selectedScope === "any") {
      router.push(`/scope?quizId=${quizId}`);
    } else if (selectedScope === "selectCollections") {
      router.push(isModifying
        ? `/scope/selectCollections?quizId=${quizId}&isModifying=true`
        : `/scope/selectCollections?quizId=${quizId}`);
    }
  }, [selectedScope, router, quizId, isModifying]);

  const handleNextClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/productsFormApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedProducts: Array.from(selectedProducts),
          selectedScope,
          quizId,
        }),
      });

      const productsResponse: ProductsFormApiResponseType = await response.json();

      if (productsResponse.success) {
        if (isModifying) {
          router.push('/basic');
        } else {
          router.push(`/questions?quizId=${quizId}`);
        }

      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
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
        <Box
          style={{
            marginTop: "20px",
          }}
        >
          <Steps2 currentPage={2} />
        </Box>

        <Flex gap="4" direction="column">
          <Grid columns="4" gap="3" width="auto">
            <Select.Root
              size="3"
              onValueChange={setSelectedScope}
              defaultValue="selectProducts"
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
              placeholder="Search products.."
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
          <ProductSelectionTable
            initialSelectedProducts={new Set(initialSelectedProducts)}
            searchQuery={searchQuery}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
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
              variant="surface"
              disabled={isLoading}
              color="gray"
              onClick={() => router.push(isModifying ? '/basic' : `/dashboard?quizId=${quizId}`)}
              style={{ width: "150px",cursor:"pointer"  }}
            >
               {isModifying ? 'Cancel' : 'Back'}
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
              disabled={isLoading || selectedProducts.size === 0}
              loading={isLoading}
              size="3"
              onClick={handleNextClick}
              style={{ width: "300px",cursor:"pointer"  }}
            >
             {isModifying ? 'Save' : 'Next'}
            </Button> */}
            <Button
              size="3"
              disabled={isLoading || selectedProducts.size === 0}
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
  await connectToDatabase(); // Ensure you have a dbConnect utility to connect to MongoDB
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
    // Fetch only the selectedProducts related to the quizId
    const productsData = await ProductFormData.findOne({ quizId }, 'selectedProducts').lean().exec() as ProductsFormDataType | null;
    console.log(productsData, "products fetched")
    return {
      props: {
        initialSelectedProducts: productsData?.selectedProducts.map((id: ObjectId) => id.toString()) || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        initialSelectedProducts: [],
      },
    };
  }
};

export default Dashboard;