import Header from "./components/Header";
import { useSearchParams } from 'next/navigation';
import { Badge, Box, Button, Flex, Grid } from "@radix-ui/themes";
import Steps2 from "./components/Steps2";
import TriggerComponent from "./components/TriggersComponent";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { placementItemType } from "./components/TriggersComponent";
import { PlacementFormResponse } from "./api/placementFormApi"; // Import the type
import { GetServerSideProps } from 'next';
import { connectToDatabase } from '../lib/utils/db';
import PlacementFormData from "../schemas/placement.schema";

interface Dashboard4Props {
  initialQuizId: string | null;
  initialPlacementData: string ;
}



const Dashboard4: React.FC<Dashboard4Props> = ({ initialQuizId, initialPlacementData }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<placementItemType | null>(null);
  const [quizId, setQuizId] = useState<string | null>(initialQuizId);
  const searchParams = useSearchParams();
  const isModifying = searchParams.get('isModifying') === 'true';

  const handleSelectionChange = (item: placementItemType | null) => {
    setSelectedItem(item);
  };

  const handleNextClick = async () => {
    setIsLoading(true);
    if (selectedItem && quizId) {
      try {
        const placementApiResponse = await fetch('/api/placementFormApi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            placementTitle: selectedItem.title,
            quizId,
          }),
        });

        const placementApiResponseData: PlacementFormResponse = await placementApiResponse.json();
        if (placementApiResponseData.success) {
          if (isModifying) {
            router.push('/basic');
          } else {
            router.push(`/layout?quizId=${quizId}`);
          }
          
        } else {
          console.error("Error saving data:", placementApiResponseData.message);
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false)
      }
    } else {
      console.error("Selected item or quiz ID is missing");
    }
  };

  return (
    <Box p="7">
      <Flex direction="column" gap="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
          <Box>
          <Badge variant="surface" ml="4" radius="large" style={{marginLeft:"40px"}}>Product related quiz</Badge>
            <Header />
          </Box>
        </Grid>
        <Box
          style={{
            marginTop: "20px",
          }}
        >
          <Steps2 currentPage={3} />
        </Box>
        <TriggerComponent onSelectionChange={handleSelectionChange} initialPlacementData={initialPlacementData} />

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
            <Button
              size="3"
              variant="surface"
              disabled={isLoading}
              color="gray"
              onClick={() => router.push(isModifying ? '/basic' :`/scope?quizId=${quizId}`)}
              style={{ width: "150px",cursor:"pointer"  }}
            >
             {isModifying ? 'Cancel' : 'Back'}
            </Button>
            <Button
              size="3"
              disabled={isLoading || !selectedItem}
              loading={isLoading}
              onClick={handleNextClick}
              style={{ width: "300px",cursor:"pointer" }}
            >
               {isModifying ? 'Save' : 'Next'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Dashboard4;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quizId } = context.query;

  if (!quizId) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  try {
    await connectToDatabase();
  
    const initialPlacementData = await PlacementFormData.findOne(
      { quizId },
      { placementTitle: 1, _id: 0 } // Select only the placementTitle field
    ).lean();
  
    return {
      props: {
        initialQuizId: quizId || null,
        initialPlacementData: initialPlacementData?.placementTitle || "",
      },
    };
  } catch (error) {
    return {
      props: {
        initialQuizId: quizId || null,
        initialPlacementData:"",
      },
    };
  }
};