import React from "react";
import { GetServerSideProps } from "next";
import { Box, Flex } from "@radix-ui/themes";
import PlatFormStart from "./components/PlatformStart";
import VerticalNav from "./components/VerticalNav";
import HomeHeader from "./components/HomeHeader";
import { QuizFormDataType } from "../schemas/quiz.schema";
import { connectToDatabase } from "../lib/utils/db";
import { getAuth } from "@clerk/nextjs/server";
import models from "@/lib/models";
interface StartProps {
  quiz: QuizFormDataType | null;
}

const Start: React.FC<StartProps> = ({ quiz }) => {
  // console.log(quiz)
  return (
    <Box style={{ backgroundColor: "#101211", height: "100vh", margin: 0 }}>
      <HomeHeader title={"Home"} />
      <Flex direction="row" style={{ height: "100%" }}>
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
            overflowY: "auto",
          }}
        >
          <PlatFormStart quiz={quiz} />
        </Box>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<StartProps> = async (context) => {
  const { userId } = getAuth(context.req)
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

    const quiz = await models.QuizFormData.findOne({ userId }).lean<QuizFormDataType>();

    if (quiz) {
      return {
        redirect: {
          destination: "/platform",
          permanent: false,
        },
      };
    }

    return {
      props: {
        quiz: null,
      },
    };
  } catch (error) {
    // console.error("Error fetching quiz data:", error);
    return {
      props: {
        quiz: null,
      },
    };
  }
};

export default Start;