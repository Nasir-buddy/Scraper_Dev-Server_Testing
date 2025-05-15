import Header from "./components/Header";
import { useSearchParams } from 'next/navigation';
import { Box, Flex, Grid } from "@radix-ui/themes";
import Steps2 from "./components/Steps2";
import Info from "./components/Info";
import { Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { GetServerSideProps } from "next";
import QuizFormData, { QuizFormDataType } from "../schemas/quiz.schema";
import { InfoFormDataType } from "./api/quizApi";
import { QuizApiResponse } from "./api/quizApi";
import { connectToDatabase } from "../lib/utils/db";
interface DashboardProps {
  initialFormData: InfoFormDataType;
}

const Dashboard = ({ initialFormData }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [formData, setFormData] = useState<InfoFormDataType>(initialFormData);
  const searchParams = useSearchParams();
  const isModifying = searchParams.get('isModifying') === 'true';

  const handleFormChange = (data: InfoFormDataType, isValid: boolean) => {
    setFormData(data);
    setIsFormValid(isValid);
  };

  const handleNextClick = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        router.push("/login");
        return;
      }
      const response: Response = await fetch("/api/quizApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, quizId: initialFormData.quizId }),
      });

      const responseData: QuizApiResponse = await response.json();
      if (!responseData.success) {
        // console.error("Error submitting data");
        return;
      }
      if (isModifying) {
        router.push('/basic');
      } else {
        router.push(`/scope?quizId=${responseData.data?._id}`);
      }
    } catch (error) {
      // console.error("Error submitting data:", error);
      router.push('/basic');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p="7">
      <Flex direction="column" gap="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
          <Box>
            <Header />
          </Box>
        </Grid>
        <Box style={{ marginTop: "20px" }}>
          <Steps2 currentPage={1} />
        </Box>

        <Box style={{ marginTop: "40px" }}>
          <Info initialFormData={formData} onChange={handleFormChange} />
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Flex
            style={{
              bottom: "0",
              right: "0",
              width: "100%",
              boxSizing: "border-box",
            }}
            justify="end"
            align="center"
          >


            <Flex gap="10px" style={{ marginLeft: "auto" }}>
              {/* <Button
                disabled={isLoading|| !isFormValid}
                loading={isLoading}
                size="3"
                onClick={handleNextClick}
                style={{ width: "300px", cursor: 'pointer' }}
              >
                {isModifying ? 'Save' : 'Next'}
              </Button> */}
              <Button
                disabled={isLoading || !isFormValid}
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
        </Box>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quizId } = context.query;

  if (!quizId || Array.isArray(quizId)) {
    return {
      props: {
        initialFormData: {
          quizName: "",
          experienceType: "",
          quizType: "",
          question: "",
          quizId: "",
        },
      },
    };
  }

  try {
    await connectToDatabase()
    const quizData = await QuizFormData.findById(quizId, 'quizName experienceType quizType question').lean();

    if (!quizData) {
      return {
        props: {
          initialFormData: {
            quizName: "",
            experienceType: "",
            quizType: "",
            question: "",
            quizId: "",
          },
        },
      };
    }
    return {
      props: {
        initialFormData: JSON.parse(JSON.stringify({ ...quizData, quizId })),
      },
    };
  } catch (error) {
    // console.error("Error fetching quiz data:", error);
    return {
      props: {
        initialFormData: {
          quizName: "",
          experienceType: "",
          quizType: "",
          question: "",
          quizId: "",
        },
      },
    };
  }
};

export default Dashboard;