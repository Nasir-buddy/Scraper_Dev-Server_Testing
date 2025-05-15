import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Flex, Text, Box } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowDownIcon } from "@radix-ui/react-icons";

interface Question {
  id: number;
  question: string;
  hint: string;
}

export interface QuestionAnswer {
  questionId: number;
  question: string;
  answer: string;
}

interface QuestionsProps {
  initialAnswers: QuestionAnswer[];
  onSubmit: (answers: QuestionAnswer[]) => void;
  onAnswersChange: (areAllAnswersProvided: boolean) => void;
}

export interface QuestionsRef {
  handleSubmit: () => QuestionAnswer[];
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

const Questions = forwardRef<QuestionsRef, QuestionsProps>(
  ({ initialAnswers, onSubmit, onAnswersChange }, ref) => {
    const [descriptions, setDescriptions] = useState<Record<number, string>>(
      () =>
        initialAnswers?.reduce((acc, answer) => {
          acc[answer.questionId - 1] = answer.answer;
          return acc;
        }, {} as Record<number, string>)
    );
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function handleDescriptionChange(index: number, value: string): void {
      setDescriptions((prevDescriptions) => {
        const newDescriptions = { ...prevDescriptions, [index]: value };
        const areAllAnswersProvided = questions.every(
          (_, i) => newDescriptions[i]?.trim() !== ""
        );
        onAnswersChange(areAllAnswersProvided);
        return newDescriptions;
      });
    }

    const handleIconClick = (index: number) => {
      setActiveIndex(index === activeIndex ? null : index);
    };

    const handleSubmit = (): QuestionAnswer[] => {
      const answers = questions?.map((q, index) => ({
        questionId: q.id,
        question: q.question,
        answer: descriptions[index] || "",
      }));
      onSubmit(answers);
      return answers;
    };

    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));

    return (
      <Flex direction="column" gap="6" style={{ width: "100%", color: "#fff" }}>
        <Text size="3" weight="medium">
          AI Will Help You Come Up with Questions. You Just Need to Give Us Some
          Context.
        </Text>

        <Accordion.Root type="single" defaultValue="item-1" collapsible>
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
                    onClick={() => handleIconClick(index)}
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
                        transform: `rotate(${activeIndex === index ? 180 : 0}deg)`,
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
                    value={descriptions[index] || ""}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
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
    );
  }
);

Questions.displayName = "Questions";

export default Questions;
