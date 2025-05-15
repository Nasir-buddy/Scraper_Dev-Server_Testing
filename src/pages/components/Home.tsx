import React, { useState, useMemo, useCallback } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Text, Box, Link, DropdownMenu, Flex } from "@radix-ui/themes";
// import DeactivateIcon from "../../../public/DeactivateIcon.svg";
// import PublishIcon from "../../../public/PublishIcon.svg";
import {
  MagnifyingGlassIcon,
  ArrowTopRightIcon,
  CheckIcon,
  ArrowBottomRightIcon,
  ExclamationTriangleIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import Modal from "./Model";
import { useRouter } from "next/router";
import { QuizFormDataType } from "../../schemas/quiz.schema";
import ExperienceIcon from "./ExperienceIcon";
// import Image from "next/image";

type Step = {
  id: number;
  name: string;
  completed?: boolean;
  current?: boolean;
};

const generateChartData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    name: i,
    value: Math.floor(Math.random() * 100),
  }));
};

const quizData = [
  {
    id: 1,
    name: "Quiz 1",
    tag: "1st Party Quiz Recommender",
    revenue: 3472.63,
    engagement: 23,
    completion: 3.5,
    revenueData: generateChartData(100),
    engagementData: generateChartData(2100),
    completionData: generateChartData(30),
    color: "white",
    trend: "up",
  },
];

const steps = [
  { id: 1, name: "Retrieve Products", completed: true },
  { id: 2, name: "Start Creating Experience", completed: true },
  { id: 3, name: "Fill Basic Info", current: true },
  { id: 4, name: "Select Scope" },
  { id: 5, name: "Select Placement" },
  { id: 6, name: "Select Triggers" },
  { id: 7, name: "Answer Questions" },
  { id: 8, name: "Create Quiz" },
  { id: 9, name: "Review Experience" },
];

const accountRoiData = generateChartData(12);

export default function Home({ quizzes }: { quizzes: QuizFormDataType[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredQuizzes = useMemo(
    () =>
      quizzes?.filter((quiz) =>
        quiz.quizName.toLowerCase().includes(searchQuery.toLowerCase())
      ) ?? [],
    [quizzes, searchQuery]
  );

  const handleStepClick = useCallback((step: Step) => {
    setSelectedStep(step);
    setModalOpen(true);
  }, []);

  return (
    <Box className="bg-black text-gray-100 pt-6 mt-10">
      <Box className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Section */}
        <Box className="lg:w-1/4 w-full">
          {/* Overall Account ROI */}
          <Box className="rounded-lg p-6 mb-6 bg-[#101211]">
            <Text className="text-2xl text-light mb-4">
              Overall Account ROI
            </Text>
            <p className="text-4xl text-white mb-2">
              25% <ArrowTopRightIcon className="inline" />
            </p>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={accountRoiData}>
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Onboarding Steps */}
          <Box className=" p-2 py-6 rounded-lg bg-[#101211]">
            <Text className="text-2xl text-white ml-4 mb-4">Onboarding</Text>
            <ul className="space-y-1.5">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                  onClick={() => handleStepClick(step)} // Open modal on step click
                >
                  <Box
                    className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full mr-2 font-bold"
                    style={{
                      backgroundColor: step.completed
                        ? "#254D41"
                        : step.current
                        ? "#254D41"
                        : "#000000",
                      color: step.current ? "#10B981" : "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {step.completed ? (
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="text-xs font-medium">{step.id}</span>
                    )}
                  </Box>
                  <Box className="flex-grow flex items-center justify-between bg-black p-2 px-3 rounded-full">
                    <Box
                      className={`text-sm ${
                        step.completed || step.current
                          ? "text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {step.name}
                    </Box>
                    <Box className="w-7 h-7 rounded-full flex items-center justify-center bg-[#101211]">
                      {step.current && (
                        <ArrowTopRightIcon className="w-4 h-4 text-white" />
                      )}
                    </Box>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        </Box>

        {/* Main Content Section */}
        <Box className="lg:w-3/4 w-full py-3 px-5 bg-[#101211]">
          <Box className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <Text className="text-2xl mb-4 lg:mb-0">Active Quizzes</Text>
            <Flex align="center" gap="4">
              <Box className="relative w-full lg:w-auto">
                <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 " />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="rounded-full pl-10 py-2 w-full lg:w-80 focus:outline-none focus:ring-2 focus:ring-green-500 bg-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
              <Box className="sm:col-span-2">
                <Link
                  href="/dashboard"
                  className="w-[192px] rounded-full bg-[#3EC4A1] px-4 py-2 text-sm font-medium  text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 "
                >
                  <ExperienceIcon />
                  Create Experience
                </Link>
              </Box>
              {/* <Box className="bg-black rounded-full h-10 w-10 flex items-center justify-center cursor-pointer">
                <ArrowTopRightIcon className="w-4 h-4 text-gray-500" />
              </Box> */}
            </Flex>
          </Box>

          <ScrollArea.Root className="overflow-hidden">
            <ScrollArea.Viewport className="h-full w-full">
              {filteredQuizzes
                .slice()
                .reverse()
                .map((quiz, index) => {
                  const [isActivateQuiz, setIsActivateQuiz] =
                    useState<boolean>(true);
                  const toggleActivateQuiz = (event: React.MouseEvent) => {
                    event.stopPropagation();
                    setIsActivateQuiz(!isActivateQuiz);
                  };
                  return (
                    <Box key={index} className="rounded-lg p-6 mb-6 bg-black">
                      <Flex align="center" justify="between" mb="4">
                        <Box className="flex items-center gap-2">
                          <Box
                            className="w-8 h-8 flex items-center justify-center rounded-full"
                            style={{
                              backgroundColor: isActivateQuiz
                                ? "#254D41"
                                : "#101211",
                            }}
                          >
                            {isActivateQuiz ? (
                              <svg
                                width="18"
                                height="15"
                                viewBox="0 0 18 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.1667 13.667C13.1667 12.2863 11.3012 11.167 9 11.167C6.69881 11.167 4.83333 12.2863 4.83333 13.667M16.5 11.1673C16.5 10.1421 15.4716 9.2611 14 8.87533M1.5 11.1673C1.5 10.1421 2.52841 9.2611 4 8.87533M14 5.53041C14.5115 5.07265 14.8333 4.40741 14.8333 3.66699C14.8333 2.28628 13.714 1.16699 12.3333 1.16699C11.693 1.16699 11.109 1.4077 10.6667 1.80357M4 5.53041C3.48854 5.07265 3.16667 4.40741 3.16667 3.66699C3.16667 2.28628 4.28595 1.16699 5.66667 1.16699C6.30696 1.16699 6.89104 1.4077 7.33333 1.80357M9 8.66699C7.61929 8.66699 6.5 7.5477 6.5 6.16699C6.5 4.78628 7.61929 3.66699 9 3.66699C10.3807 3.66699 11.5 4.78628 11.5 6.16699C11.5 7.5477 10.3807 8.66699 9 8.66699Z"
                                  stroke="#3EC4A1"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="18"
                                height="15"
                                viewBox="0 0 18 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.1667 13.666C13.1667 12.2853 11.3012 11.166 9 11.166C6.69881 11.166 4.83333 12.2853 4.83333 13.666M16.5 11.1663C16.5 10.1412 15.4716 9.26013 14 8.87435M1.5 11.1663C1.5 10.1412 2.52841 9.26013 4 8.87435M14 5.52944C14.5115 5.07167 14.8333 4.40643 14.8333 3.66602C14.8333 2.2853 13.714 1.16602 12.3333 1.16602C11.693 1.16602 11.109 1.40673 10.6667 1.80259M4 5.52944C3.48854 5.07167 3.16667 4.40643 3.16667 3.66602C3.16667 2.2853 4.28595 1.16602 5.66667 1.16602C6.30696 1.16602 6.89104 1.40673 7.33333 1.80259M9 8.66602C7.61929 8.66602 6.5 7.54673 6.5 6.16602C6.5 4.7853 7.61929 3.66602 9 3.66602C10.3807 3.66602 11.5 4.7853 11.5 6.16602C11.5 7.54673 10.3807 8.66602 9 8.66602Z"
                                  stroke="#4D4D4D"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </Box>
                          <h3 className="text-xl">{quiz.quizName}</h3>
                          <span className="text-xs bg-gray-700 rounded-full px-2 py-1">
                            Product Recommendation Quiz (1st Party)
                          </span>
                        </Box>
                        <Flex align="center" gap="4">
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              <Box className="flex items-center bg-[#1A1A1A] text-xs sm:text-sm text-white rounded-full pl-4 sm:pl-3 pr-4 sm:pr-3 py-1 sm:py-2 cursor-pointer">
                                <svg
                                  width="14"
                                  className="mr-2"
                                  height="10"
                                  viewBox="0 0 14 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.572266"
                                    y="0.5"
                                    width="12.8571"
                                    height="1.28571"
                                    rx="0.642857"
                                    fill="#3EC4A1"
                                  />
                                  <rect
                                    x="1.85742"
                                    y="3.07227"
                                    width="10.2857"
                                    height="1.28571"
                                    rx="0.642857"
                                    fill="#3EC4A1"
                                  />
                                  <rect
                                    x="3.14453"
                                    y="5.64258"
                                    width="7.71429"
                                    height="1.28571"
                                    rx="0.642857"
                                    fill="#3EC4A1"
                                  />
                                  <rect
                                    x="4.42969"
                                    y="8.21484"
                                    width="5.14286"
                                    height="1.28571"
                                    rx="0.642857"
                                    fill="#3EC4A1"
                                  />
                                </svg>
                                30 days
                                <DropdownMenu.TriggerIcon className="ml-8 text-gray-500 font-bold" />
                              </Box>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                              <DropdownMenu.Item shortcut="⌘ F">
                                45 days
                              </DropdownMenu.Item>
                              <DropdownMenu.Item shortcut="⌘ E">
                                60 days
                              </DropdownMenu.Item>
                              <DropdownMenu.Item shortcut="⌘ D">
                                90 days
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                          <Box
                            as="span"
                            className="flex items-center text-xs sm:text-sm bg-[#1A1A1A] text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                          >
                            <Box
                              as="span"
                              className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 bg-[#FAC4234D] rounded-full mr-2"
                            >
                              <ExclamationTriangleIcon className="text-[#FAC423] w-[12px] h-[12px]" />
                            </Box>
                            Alert (4)
                          </Box>
                          {/* {isActivateQuiz ? (
                            <Box
                              as="span"
                              className="flex items-center text-xs sm:text-sm bg-[#1A1A1A]  text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto cursor-pointer"
                              onClick={toggleActivateQuiz}
                            >
                              <Box
                                as="span"
                                className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 rounded-full mr-2"
                              >
                                <Image src={DeactivateIcon} alt="Deactivate" />
                              </Box>
                              Deactivate
                            </Box>
                          ) : (
                            <Box
                              as="span"
                              className="flex items-center text-xs sm:text-sm bg-[#1A1A1A]  text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto cursor-pointer"
                              onClick={toggleActivateQuiz}
                            >
                              <Box
                                as="span"
                                className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 rounded-full mr-2"
                              >
                                <Image src={PublishIcon} alt="Deactivate" />
                              </Box>
                              Publish
                            </Box>
                          )} */}

                          <Box className="bg-[#1A1A1A] rounded-full h-10 w-10 flex items-center justify-center cursor-pointer">
                            <ArrowTopRightIcon
                              className="w-4 h-4 text-gray-500"
                              onClick={() =>
                                router.push(`/basic?value=${index}`)
                              }
                            />
                          </Box>
                        </Flex>
                      </Flex>

                      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-black">
                        {/* Revenue per Quiz */}
                        <Box className="rounded-lg  h-40 bg-[#101211]">
                          <p className="text-sm text-gray-400 mb-1 px-3 pt-3">
                            Revenue per Quiz (RPQ)
                          </p>
                          <Box className="flex items-center">
                            <p className="text-3xl text-white mr-2 px-3">
                              ${quizData[0].revenue.toFixed(2)}
                            </p>
                            <ArrowTopRightIcon className="w-6 h-6 text-green-500" />
                          </Box>
                          <ResponsiveContainer width="100%" height={80}>
                            <BarChart data={generateChartData(100)}>
                              <Bar dataKey="value" fill="#10B981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </Box>
                        <Box className="bg-[#101211] rounded-lg h-40">
                          <p className="text-sm text-gray-400 mb-1 px-3 pt-3">
                            Engagement Rate (ER)
                          </p>
                          <Box className="flex items-center">
                            <p className="text-3xl text-white mr-2 px-3">
                              {quizData[0].engagement}%
                            </p>
                            <ArrowTopRightIcon className="w-6 h-6 text-orange-500" />
                          </Box>
                          <ResponsiveContainer width="100%" height={80}>
                            <BarChart data={quizData[0].completionData}>
                              <Bar dataKey="value" fill="#FFA500" />
                            </BarChart>
                          </ResponsiveContainer>
                          {/* <ResponsiveContainer width="100%" height={80}>
                          <BarChart data={ generateChartData(2100)}>
                            <Bar dataKey="value" fill="#FFA500" />
                          </BarChart>
                        </ResponsiveContainer> */}
                        </Box>

                        {/* Completion Rate */}
                        <Box className="bg-[#101211] flex rounded-lg ">
                          <Box className="h-16 w-full">
                            <Box className="bg-[#101211] rounded-2xl h-40">
                              <p className="text-sm text-gray-400 mb-1 px-3 pt-3">
                                Completion Rate (CR)
                              </p>
                              <Box className="flex items-center justify-between px-3">
                                <Box>
                                  <Box className="flex items-center mt-[-50px]">
                                    <p className="text-3xl text-white mr-2">
                                      {quizData[0].completion}%
                                    </p>
                                    <ArrowBottomRightIcon className="w-6 h-6 text-red-500" />
                                  </Box>
                                  <Box className="mt-4">
                                    <span className="bg-red-900 px-2 text-red-500 rounded-full">
                                      -0.24%
                                    </span>
                                  </Box>
                                </Box>

                                <Box className="flex items-center justify-end w-32">
                                  {" "}
                                  <ResponsiveContainer
                                    width="100%"
                                    height={120}
                                    className="tranform -rotate-90"
                                  >
                                    <BarChart data={quizData[0].completionData}>
                                      <Bar dataKey="value" fill="#b91c1c" />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </Box>
      </Box>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} // Close the modal
        step={selectedStep}
      />
    </Box>
  );
}
