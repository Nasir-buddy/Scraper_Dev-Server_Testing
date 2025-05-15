import React, { Suspense } from "react";
import { Box, Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { connectToDatabase } from "@/lib/utils/db";
import { getAuth } from "@clerk/nextjs/server";
import models from "@/lib/models";
import { QuizFormDataType } from "@/schemas/quiz.schema";
import HomeHeader from "@/pages/components/HomeHeader";

const Home = dynamic(() => import("@/pages/home/HomeComponent"), { suspense: true });
const VerticalNav = dynamic(() => import("@/pages/components/VerticalNav"), { suspense: true });

export interface BasicInfoProps {
  quizzes: QuizFormDataType[];
}

const HomePage: React.FC<BasicInfoProps> = ({ quizzes }) => {
  return (
    <Box className="bg-black h-screen m-0">
      <HomeHeader title="Home" />
      <Flex direction="row" className="h-full">
        <Box className="fixed top-0 left-0 w-16 h-full bg-black flex-shrink-0">
          <Suspense fallback={<div>Loading...</div>}>
            <VerticalNav />
          </Suspense>
        </Box>
        <Box className="ml-16 w-[calc(100%-4rem)] overflow-y-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <Home quizzes={quizzes} />
          </Suspense>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<{ quizzes: QuizFormDataType[] }> = async (context) => {
  const { userId } = getAuth(context.req);

  try {
    await connectToDatabase();
    if (!userId) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const quizzes = await models.QuizFormData.find({ userId });
    return {
      props: {
        quizzes: quizzes.length ? JSON.parse(JSON.stringify(quizzes)) : [],
      },
    };
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return {
      props: {
        quizzes: [],
      },
    };
  }
};