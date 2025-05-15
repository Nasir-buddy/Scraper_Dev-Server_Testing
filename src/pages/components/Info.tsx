import {
  Box,
  Flex,
  Grid,
  IconButton,
  RadioCards,
  Select,
  Strong,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { InfoFormDataType } from "../api/quizApi";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import StandAlone from "./Images/StandAlone";
import Companion from './Images/Companion'

interface InfoProps {
  initialFormData: InfoFormDataType;
  onChange: (data: InfoFormDataType, isValid: boolean) => void;
}

const Info: React.FC<InfoProps> = ({ initialFormData, onChange }) => {
  const [quizName, setQuizName] = useState(initialFormData?.quizName || "");
  const [experienceType, setExperienceType] = useState(
    "productRecommendationQuiz"
  );
  const [quizType, setQuizType] = useState(
    initialFormData?.quizType
  );
  const [question, setQuestion] = useState(initialFormData?.question||"Question");

  useEffect(() => {
    const isValid = quizName.trim() !== "";
    onChange({ quizName, experienceType, quizType, question }, isValid);
  }, [quizName, experienceType, quizType, question]);

  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <Flex gap="4" direction="column">
      <Grid columns="2" gap="3" width="auto">
        <Box>
          <TextField.Root
            placeholder="Quiz name"
            size="3"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </Box>
        <Select.Root
          size="3"
          value={experienceType}
          onValueChange={setExperienceType}
          defaultValue="Exprience type"
        >
          <Select.Trigger />
          <Select.Content align="center" variant="soft">
            <Select.Group>
              <Select.Label>Select Model</Select.Label>
              <Select.Separator />
              <Select.Item value="productRecommendationQuiz">
                Product Recommendation Quiz(1st party)
              </Select.Item>
              <Select.Separator />
              <Select.Item value="coldStartRecommender" disabled>
                Cold Start Recommender
              </Select.Item>
              <Select.Separator />
              <Select.Item value="warmStartRecommender" disabled>
                Warm Start Recommender
              </Select.Item>
              <Select.Separator />
              <Select.Item value="zeroPartyRecommender" disabled>
                Zero Party Recommender
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        {/* <Select.Root size="3" value={quizType} onValueChange={setQuizType}>
          <Select.Trigger />
          <Select.Content align="center" variant="soft">
            <Select.Group>
              <Select.Label>Select Question Type</Select.Label>
              <Select.Separator />
              <Select.Item value="productRelated">Product Related</Select.Item>
              <Select.Separator />
              <Select.Item value="personalityRelated">
                Personality Related
              </Select.Item>
              <Select.Separator />
              <Select.Item value="both">Both Types</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root> */}
      </Grid>
      {/* <TextArea
        resize="vertical"
        variant="surface"
        radius="medium"
        size="3"
        rows={4}
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ marginTop: "20px" }}
      /> */}
      <Flex align="center" gap="8px" mt="8">
        <>
          <IconButton variant="surface" size="1" radius="full">
            <InfoCircledIcon />
          </IconButton>
          <Text size="2">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for
          </Text>
        </>
      </Flex>
      <Flex align="center" justify="center">
        <RadioCards.Root
          value={quizType}
          columns="2"
          onValueChange={setQuizType}
          style={{ width: "100%" }}
        >
          <RadioCards.Item value="productRelated">
            <Flex
              justify="center"
              align="center"
              gap="3"
              m="6"
              direction="column"
            >
              <Box height="170px">
                <Companion/>
              </Box>
              <Text as="p" size="3">
                <Strong>Product Questions</Strong>
              </Text>
              <Text>Detects shoppers that can&apos;t seem to find the product they are looking for and ask them questions before presenting a list of product suggestions. This does not generate customized pages based on personality traits</Text>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item value="personalityRelated">
            <Flex
              justify="center"
              align="center"
              gap="3"
              m="6"
              direction="column"
            >
              <Box height="170px">
                <StandAlone/>
              </Box>
              <Text as="p" size="3">
                <Strong>Product + Personality Questions</Strong>
              </Text>
              <Text>In addition to collect product preferences it uncovers shopper&apos;s personality traits. Traits are then used to generate Product Pages that match their communication style, increasing conversions.</Text>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Flex>
    </Flex>
  );
};

export default Info;
