import { Badge, Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Steps2 from "../components/Steps2";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { connectToDatabase } from "@/lib/utils/db";
import QuestionFormModel from "@/schemas/questions.schema";
import { GetServerSideProps } from "next";
import { questionFormApiResponseType } from "../api/questionFormApi";

export interface QuestionAnswer {
  questionId: number;
  question: string;
  answer: string;
}
interface QuestionsProps {
  initialAnswers: QuestionAnswer[];
  quizId: string;
}
interface Question {
  id: number;
  question: string;
  hint: string;
}
const questions: Question[] = [
  {
    id: 1,
    question:
      "What are common purposes your shoppers have when visiting your shop?",
    hint: "[what are the possible outcomes your shoppers are looking for. Examples include: physical appearance, types of project, health benefits, reasons to take action, personal goals, business goals, who are they buying for, etc.]",
  },
  {
    id: 2,
    question: "What product features are important to build questions?",
    hint: "[This varies by product, for example: size, form, flavor, duration, location, companions, budget, destination, preparation methods, delivery methods, etc.]",
  },
  {
    id: 3,
    question: "What consumer habits or preferences are important to ask about?",
    hint: "[This depends on how your users interact with your product, for example: level of experience, daily consumption, routine, clothing or jewelry preferences]",
  },
  {
    id: 4,
    question:
      "What personal features are important to recommend the best product?",
    hint: "[Some examples are: physical appearance, medical conditions, family situation, gender, marital status, age, mindset, etc.]",
  },
];
const index: React.FC<QuestionsProps> = ({ initialAnswers, quizId }: QuestionsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isModifying = searchParams.get("isModifying") === "true";
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  function handleAccordionChange(value: string) {
    setActiveIndex(value ? parseInt(value.split("-")[1]) - 1 : null);
  }
  const [answers, setAnswers] = useState<QuestionAnswer[]>(
    questions.map((q) => {
      const initialAnswer = initialAnswers.find((ia) => ia.questionId === q.id);
      return {
        questionId: q.id,
        question: q.question,
        answer: initialAnswer ? initialAnswer.answer : "",
      };
    })
  );

  function handleAnswerChange(questionId: number, answer: string) {
    setAnswers((prevAnswers) =>
      prevAnswers.map((qa) =>
        qa.questionId === questionId ? { ...qa, answer } : qa
      )
    );
  }

  async function handleCreateExperienceClick() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/questionFormApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId, questionAnswer: answers }),
      });

      const questionFormResponsedata: questionFormApiResponseType = await response.json();

      if (questionFormResponsedata.success) {
        if (isModifying) {
          router.push('/basic');
        } else {
          router.push(`/triggers?quizId=${quizId}`);
        }
      } else {
        console.error("Error saving question form:", questionFormResponsedata.message);
      }
    } catch (error) {
      console.error("Error saving question form:", error);
    } finally {
      // setIsModalOpen(false);
      setIsLoading(false);
    }
  }

  const allAnswersProvided = answers.every((qa) => qa.answer.trim() !== "");
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
          <Steps2 currentPage={3} />
        </Box>

        <Flex
          direction="column"
          gap="6"
          style={{ width: "100%", color: "#fff" }}
        >
          <Text size="3" weight="medium">
            AI Will Help You Come Up with Questions. You Just Need to Give Us
            Some Context.
          </Text>

          <Accordion.Root type="single" defaultValue="item-1" collapsible onValueChange={handleAccordionChange}>
            {questions?.map((item, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index + 1}`}
                style={{
                  padding: "15px",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "#000",
                  position: "relative",
                  marginBottom: "40px",
                  boxSizing: "border-box",
                  marginLeft: "27px",
                }}
              >
                <Accordion.Header>
                  <Accordion.Trigger>
                    <Box
                      style={{
                        position: "absolute",
                        left: "-50px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Flex direction="column" style={{ flex: 1 }}>
                      <Text
                        size="3"
                        weight="medium"
                        style={{ textAlign: "left" }}
                      >
                        {item.question}
                      </Text>
                      <Text
                        size="2"
                        style={{
                          marginTop: "4px",
                          textAlign: "left",
                        }}
                      >
                        {item.hint}
                      </Text>
                    </Flex>
                    <Box
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDownIcon
                        style={{
                          transition: "transform 0.2s, color 0.2s",
                          transform: `rotate(${activeIndex === index ? 180 : 0
                            }deg)`,
                          color: activeIndex === index ? "green" : "inherit",
                          fontSize: "44px",
                        }}
                      />
                    </Box>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Box>
                    <textarea
                      rows={4}
                      cols={50}
                      placeholder="Describe..."
                      value={
                        answers.find((qa) => qa.questionId === item.id)
                          ?.answer || ""
                      }
                      onChange={(e) =>
                        handleAnswerChange(item.id, e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        marginTop: "20px",
                        resize: "none",
                        boxSizing: "border-box",
                        zIndex: 1,
                      }}
                    />
                  </Box>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Flex>

        <Box
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
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
            <Flex align="center" gap="8px"></Flex>

            <Flex gap="10px" style={{ marginLeft: "auto" }}>
              {/* <Button
                size="3"
                variant="surface"
                disabled={isLoading}
                color="gray"
                onClick={() =>
                  router.push(
                    isModifying ? "/basic" : `/scope?quizId=${quizId}`
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
                onClick={() => router.push(isModifying ? '/basic' : `/scope?quizId=${quizId}`)}
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
                loading={isLoading}
                onClick={handleCreateExperienceClick}
                disabled={isLoading || !allAnswersProvided}
                style={{ width: "300px", cursor: "pointer" }}
              >
                {isModifying ? "Save" : "Next"}
              </Button> */}
              <Button
                size="3"
                disabled={isLoading || !allAnswersProvided}
                loading={isLoading}
                onClick={handleCreateExperienceClick}
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

      {/* {isModalOpen&&<ConfirmationModal open={isModalOpen} onClose={handleClose} />} */}
    </Box>
  );
};
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

    const questionForm = await QuestionFormModel.findOne(
      { quizId },
      { questionAnswer: 1, _id: 0 } // Projection to retrieve only questionAnswer
    ).lean();

    const initialAnswers = questionForm
      ? questionForm.questionAnswer.map((answer: any) => ({
        ...answer,
        _id: answer._id.toString(),
      }))
      : [];

    return {
      props: {
        initialAnswers,
        quizId,
      },
    };
  } catch (error) {
    console.error("Error fetching question form:", error);
    return {
      props: {
        initialAnswers: [],
        quizId,
      },
    };
  }
};

export default index;
