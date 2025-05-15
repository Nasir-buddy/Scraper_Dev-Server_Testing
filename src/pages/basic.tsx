import React from "react";
import { GetServerSideProps } from "next";
import { Box, Flex } from "@radix-ui/themes";
import PlatformExperience from "./components/PlatformExperience";
import VerticalNav from "./components/VerticalNav";
import models from "@/lib/models"; // Import all models
import { connectToDatabase } from "../lib/utils/db";
import { QuizFormDataType } from "../schemas/quiz.schema";
import { getAuth } from "@clerk/nextjs/server";
import HomeHeader from "./components/HomeHeader";
import { QuestionFormSchemaType } from "../schemas/questions.schema";
import { PlacementFormDataType } from "../schemas/placement.schema";
import { CollectionsFormDataType } from "../schemas/collections.schema";
import { ProductsFormDataType } from "../schemas/products.schema";
import { TriggersFormDataType } from "../schemas/triggers.schema";
import { useRouter } from "next/router";
import { LayoutFormDataType } from "@/schemas/layout.schema";
export interface quizType{
  _id:string
  quizName: string;
  experienceType: string;
  quizType: string;
  question: string;
  userId: string; 
  questions: QuestionFormSchemaType; 
  placements: PlacementFormDataType; 
  collections: CollectionsFormDataType; 
  products: ProductsFormDataType; 
  triggers: TriggersFormDataType;
  layouts:LayoutFormDataType;
}
export interface BasicInfoProps {
  quizzes: quizType[];
}

export const getServerSideProps: GetServerSideProps<{
  quizzes: QuizFormDataType[];
}> = async (context) => {
  const { userId } = getAuth(context.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  try {
    await connectToDatabase();
    // const quiz = await models.QuizFormData.find({ userId }).lean<QuizFormDataType>();
    // console.log("Quiz:",quiz)
    const quizzes = await models.QuizFormData.find({ userId })
      .select('-createdAt -updatedAt -userId')
      .lean()
      .populate({
        path: 'questions',
        select: '-quizId -createdAt -updatedAt -_id'
      })
      .populate({
        path: 'collections',
        select: '-quizId -createdAt -updatedAt -_id'
      })
      .populate({
        path: 'products',
        select: '-quizId -createdAt -updatedAt -_id'
      })
      .populate({
        path: 'triggers',
        select: '-quizId -createdAt -updatedAt -_id'
      })
      .populate({
        path: 'layouts',
        select: '-quizId -createdAt -updatedAt -_id'
      });

    // Check if quizzes are empty
    // console.log(quizzes)
    if (quizzes.length === 0) {
      // console.log("No quizzes found for this user.");
      return {
        props: {
          quizzes: [],
        },
      };
    }

    return {
      props: {
        quizzes: JSON.parse(JSON.stringify(quizzes)),
      },
    };
  } catch (error) {
    // console.log("Error in fetching quizzes..", error);
    return {
      props: {
        quizzes: [],
      },
    };
  }
};

const BasicInfo: React.FC<BasicInfoProps> = ({ quizzes }) => {
  console.log(quizzes)
  const router = useRouter();
  const { value } = router.query;
  // console.log(value)
  return (
    <Box style={{ backgroundColor: "#1A1A1A", margin: 0 ,fontFamily: 'Play, sans-serif'}}>
      <HomeHeader title={"Experiences"}/>

      <Flex direction="row">
        <Box
          className="flex-shrink-0"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "4rem",
            height: "100vh",
            backgroundColor: "#000000",
          }}
        >
          <VerticalNav />
        </Box>
        <Box
          style={{
            marginLeft: "4rem",
            width: "calc(100% - 4rem)",
            // padding: "1rem",

            overflowY: "auto",
          }}
        >
          <PlatformExperience quizzes={quizzes} value={Array.isArray(value) ? value[0] : value} />
        </Box>
      </Flex>
    </Box>
  );
};

export default BasicInfo;
