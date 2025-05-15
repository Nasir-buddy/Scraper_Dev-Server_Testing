import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import React, { useState, useCallback, useMemo } from "react";
import { Box, DropdownMenu, Link, Text } from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTopRightIcon,
  ArrowBottomRightIcon,
  DesktopIcon,
  Pencil1Icon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { BasicInfoProps, quizType } from "../basic";
import { useRouter } from "next/router";
import { products, collections } from "../../lib/helper/constants";
import SuggestionsBox from "./SuggestionsBox";
import FileIcon from "./FileIcon";
import ProductIcon from "./ProductIcon";
import ExperienceIcon from "./ExperienceIcon";
import Image from "next/image";
import DeactivateIcon from "../../../public/DeactivateIcon.svg";
import PublishIcon from "../../../public/PublishIcon.svg";
const generateChartData = (numPoints: any) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    data.push({
      name: `Point ${i + 1}`,
      value: Math.floor(Math.random() * 100),
    });
  }
  return data;
};
interface PlatformExperienceProps extends BasicInfoProps {
  value?: string;
}
interface QuizCardProps {
  quiz: quizType;
  revenue: string;
  engagement: string;
  completion: string;
  revenueData: any;
  engagementData: any;
  completionData: any;
  // isOpenInitially: boolean;
}
const QuizCard = React.memo(({ quiz, revenue, engagement, completion, revenueData, engagementData, completionData, isOpen, onToggle }: QuizCardProps & { isOpen: boolean; onToggle: () => void }) => {
  const router = useRouter();

  const handleEditClick = () => {
    if (quiz.collections) {
      router.push(
        `/scope/selectCollections?quizId=${quiz._id}&isModifying=true`
      );
    } else if (quiz.products) {
      router.push(`/scope/selectProducts?quizId=${quiz._id}&isModifying=true`);
    } else {
      router.push(`/scope?quizId=${quiz._id}&isModifying=true`);
    }
  };
  const [isFileIconHovered, setIsFileIconHovered] = useState(false);
  const [isProductIconHovered, setIsProductIconHovered] = useState(false);

  const handleFileIconMouseEnter = () => setIsFileIconHovered(true);
  const handleFileIconMouseLeave = () => setIsFileIconHovered(false);

  // Function to handle mouse enter and leave events for ProductIcon
  const handleProductIconMouseEnter = () => setIsProductIconHovered(true);
  const handleProductIconMouseLeave = () => setIsProductIconHovered(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isActivateQuiz, setIsActivateQuiz] = useState<boolean>(true);
  const quizType = quiz.quizType;
  const QuestionType =
    quizType === "productRelated"
      ? "Product Related"
      : quizType === "personalityRelated"
      ? "Personality Related"
      : "Any";
      const experienceTriggers = quiz?.triggers?.triggersData
      .filter(
        (trigger: { isChecked: boolean; triggersItemSlug: string }) =>
          trigger.isChecked
      )
      .map((trigger: { triggersItemSlug: string }) => {
        if (trigger.triggersItemSlug === "user_is_idle_for") {
          return `User is idle for ${quiz.triggers.idleSeconds} seconds`;
        }
        return trigger.triggersItemSlug
          .replace(/_/g, " ")
          .replace(/^\w/, (c) => c.toUpperCase());
      })
      .join("; ");

  const toggleSuggestions = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSuggestions(!showSuggestions);
  };
  const toggleActivateQuiz = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsActivateQuiz(!isActivateQuiz);
  };

  return (
    <Accordion.Item
      value={quiz?.quizName}
      className="mb-8 rounded-2xl bg-[#1A1A1A]"
    >
      <Accordion.Header>
        <Accordion.Trigger
          className="flex w-full justify-between items-center p-4 text-left"
          onClick={onToggle}
        >
          {/* Left section: Title and Input */}
          <Box className="flex items-center space-x-2">
            <Box
              className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{
                backgroundColor: isActivateQuiz ? "#254D41" : "#101211",
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
            <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl">
              {quiz.quizName}
            </h3>
            <Box
              as="span"
              className="text-xxs sm:text-xs bg-gray-700 rounded-full px-2 py-1"
            >
              {quiz.experienceType == "productRecommendationQuiz"
                ? "Product Recommendation Quiz(1st party)"
                : ""}
            </Box>
          </Box>

          {/* Right section: Select and Arrow Icon */}
          <Box className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Box className="flex items-center bg-black text-xs sm:text-sm text-white rounded-full pl-4 sm:pl-3 pr-4 sm:pr-3 py-1 sm:py-2 cursor-pointer">
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
                <DropdownMenu.Item shortcut="⌘ F">45 days</DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⌘ E">60 days</DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⌘ D">90 days</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <Box
              className="flex items-center text-xs sm:text-sm bg-black text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
              onClick={toggleSuggestions}
            >
              <Box
                as="span"
                className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 bg-[#FAC4234D] rounded-full mr-2"
              >
                <ExclamationTriangleIcon className="text-[#FAC423] w-[12px] h-[12px]" />
              </Box>
              Alerts (4)
            </Box>
            {isActivateQuiz ? (
              <Box
                className="flex items-center text-xs sm:text-sm bg-black text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
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
                className="flex items-center text-xs sm:text-sm bg-black text-white rounded-full pl-2 pr-2 sm:pr-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                onClick={toggleActivateQuiz}
              >
                <Box className="flex items-center justify-center w-[24px] h-[24px] sm:w-6 sm:h-6 rounded-full mr-2">
                  <Image src={PublishIcon} alt="Deactivate" />
                </Box>
                Publish
              </Box>
            )}

            <Box className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-black rounded-full">
              {isOpen ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
            </Box>
          </Box>
        </Accordion.Trigger>
      </Accordion.Header>
      {showSuggestions && <SuggestionsBox quizId={quiz._id} />}
      <Accordion.Content className={`px-4 pb-4`}>
        <Box className="grid grid-cols-3 gap-4">
          <Box>
            <Box className="h-16 w-full ">
              <Box className="bg-black rounded-2xl h-40">
                <p className="text-sm text-gray-400 mb-1 px-3 pt-3">
                  Revenue per Quiz (RPQ)
                </p>
                <Box className="flex items-center">
                  <p className="text-3xl text-white mr-2 px-3">${revenue}</p>
                  <ArrowTopRightIcon className="w-6 h-6 text-green-500" />
                </Box>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={revenueData}>
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>

          {/* Engagement Chart */}
          <Box>
            <Box className="h-16 w-full">
              <Box className="bg-black rounded-2xl h-40">
                <p className="text-sm text-gray-400 mb-1 px-3 pt-3">
                  Engagement Rate (ER)
                </p>
                <Box className="flex items-center">
                  <p className="text-3xl text-white mr-2 px-3">{engagement}%</p>
                  <ArrowTopRightIcon className="w-6 h-6 text-orange-500" />
                </Box>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={engagementData}>
                    <Bar dataKey="value" fill="#FFA500" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>

          {/* Completion Chart */}
          <Box>
            <Box className="h-16 w-full">
              <Box className="bg-black rounded-2xl h-40">
                <p className="text-sm text-gray-400 mb-1 px-3 pt-3">
                  Completion Rate (CR)
                </p>
                <Box className="flex items-center justify-between px-3">
                  <Box>
                    <Box
                      className="flex items-center"
                      style={{ marginTop: "-50px" }}
                    >
                      <p className="text-3xl text-white mr-2">{completion}%</p>
                      <ArrowBottomRightIcon className="w-6 h-6 text-red-500" />
                    </Box>
                    <Box className="mt-4">
                      <Box
                        as="span"
                        className="bg-red-900 px-2 text-red-500 rounded-full"
                      >
                        -0.24%
                      </Box>
                    </Box>
                  </Box>

                  <Box className="flex items-center justify-end w-32">
                    {" "}
                    <ResponsiveContainer
                      width="100%"
                      height={120}
                      className="tranform -rotate-90"
                    >
                      <BarChart data={completionData}>
                        <Bar dataKey="value" fill="#b91c1c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Tabs.Root defaultValue="basic" className="mt-28">
          <Tabs.List className="grid grid-cols-3 gap-2 bg-black rounded-full">
            <Tabs.Trigger
              onMouseEnter={handleFileIconMouseEnter}
              onMouseLeave={handleFileIconMouseLeave}
              value="basic"
              className={`col-span-1 group flex items-center justify-center px-4 py-2 text-sm text-gray-400 rounded-full transition-colors duration-300 ${
                activeTab === "basic"
                  ? "border-b-2 border-[#3EC4A1] rounded-b-none"
                  : ""
              }`}
              onClick={() => setActiveTab("basic")}
            >
                <FileIcon
                  color={isFileIconHovered ? "#3EC4A1" : (activeTab === "basic" ? "#3EC4A1" : "#9CA3AF")}
                  className="group-hover:text-[#3EC4A1]"
                />
              <Box
                as="span"
                className={`ml-2 leading-none ${
                  activeTab === "basic" ? "text-[#3EC4A1] " : "text-gray-400 group-hover:text-[#3EC4A1]"
                }`}
              >
                Basic Information
              </Box>
            </Tabs.Trigger>

            <Tabs.Trigger
              onMouseEnter={handleProductIconMouseEnter}
              onMouseLeave={handleProductIconMouseLeave}
              value="products"
              className={`col-span-1 group flex items-center justify-center px-4 py-2 text-sm text-gray-400 rounded-full transition-colors duration-300 ${
                activeTab === "products"
                  ? "border-b-2 border-[#3EC4A1] rounded-b-none"
                  : ""
              }`}
              onClick={() => setActiveTab("products")}
            >
              <ProductIcon
                color={isProductIconHovered ? "#3EC4A1" : (activeTab === "products" ? "#3EC4A1" : "#9CA3AF")}
                className="group-hover:text-[#3EC4A1]"
              />
              <Box
                as="span"
                className={`ml-2 leading-none ${
                  activeTab === "products" ? "text-[#3EC4A1] " : "text-gray-400 group-hover:text-[#3EC4A1]"
                }`}
              >
                Products
              </Box>
            </Tabs.Trigger>

            <Tabs.Trigger
              value="pages"
              className={`col-span-1 group flex items-center justify-center px-4 py-2 text-sm text-gray-400 rounded-full transition-colors duration-300 ${
                activeTab === "pages"
                  ? "border-b-2 border-[#3EC4A1] rounded-b-none"
                  : ""
              }`}
              onClick={() => setActiveTab("pages")}
            >
              <DesktopIcon
                className={`${
                  activeTab === "pages" ? "text-[#3EC4A1] " : "text-gray-400"
                } h-5 w-5 group-hover:text-[#3EC4A1]`}
              />
              <Box
                as="span"
                className={`ml-2 leading-none ${
                  activeTab === "pages" ? "text-[#3EC4A1] " : "text-gray-400 group-hover:text-[#3EC4A1]"
                }`}
              >
                Pages
              </Box>
            </Tabs.Trigger>
          </Tabs.List>

          {/* Basic Information Content */}
          <Tabs.Content value="basic" className="py-4">
            <Box className="space-y-4 mt-5">
              <Box className="rounded-2xl">
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Box className="flex items-center justify-between bg-black p-4 rounded-2xl">
                    <Box>
                      <h4 className="text-sm font-medium text-gray-400">
                        Experience Name
                      </h4>
                      <p className="text-gray-200">{quiz.quizName}</p>
                    </Box>
                    <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                      <Pencil1Icon
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/dashboard?quizId=${quiz._id}&isModifying=true`
                          )
                        }
                      />
                    </Box>
                  </Box>
                  <Box className="flex items-center justify-between bg-black p-4 rounded-2xl">
                    <Box>
                      <h4 className="text-sm font-medium text-gray-400">
                        Experience Type
                      </h4>
                      <p className="text-gray-200">
                        Product Recommendation Quiz (1st Party)
                      </p>
                    </Box>
                    <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                      <Pencil1Icon
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/dashboard?quizId=${quiz._id}&isModifying=true`
                          )
                        }
                      />
                    </Box>
                  </Box>
                  <Box className="flex items-center justify-between bg-black p-4 rounded-2xl">
                    <Box>
                      <h4 className="text-sm font-medium text-gray-400">
                        Questions Type
                      </h4>
                      <p className="text-gray-200">{QuestionType}</p>
                    </Box>
                    <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                      <Pencil1Icon
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/dashboard?quizId=${quiz._id}&isModifying=true`
                          )
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="bg-black p-4 rounded-2xl flex items-center justify-between">
                <Box className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    {quiz.collections
                      ? "Recommended Types of  Collections"
                      : quiz.products
                      ? "Recommended Types of Products"
                      : "Recommended Types of Products/Collections"}
                  </h4>
                  <p className="text-gray-200">
                    {quiz.collections
                      ? quiz.collections?.selectedCollections
                          .map(
                            (collectionId) =>
                              collections.find(
                                (c) => c.id === collectionId.toString()
                              )?.name
                          )
                          .filter(Boolean)
                          .join(", ")
                      : quiz.products
                      ? quiz.products?.selectedProducts
                          .map(
                            (productId) =>
                              products.find(
                                (p) => p.id === productId.toString()
                              )?.sku
                          )
                          .filter(Boolean)
                          .join(", ")
                      : "Any"}
                  </p>
                </Box>
                <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                  <Pencil1Icon
                    className="h-5 w-5 text-gray-400 cursor-pointer"
                    onClick={handleEditClick}
                  />
                </Box>
              </Box>

              <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                {/* Experience Placement */}
                <Box className="flex items-center justify-between bg-black p-4 rounded-2xl">
                  <Box className="flex flex-col">
                    <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-400">
                      Layout
                    </h4>
                    <p className="text-gray-200 py-2 text-xs sm:text-sm md:text-base">
                      {quiz?.layouts?.layoutTitle}
                    </p>
                  </Box>
                  <Box className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                    <Pencil1Icon
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/layout?quizId=${quiz._id}&isModifying=true`
                        )
                      }
                    />
                  </Box>
                </Box>

                {/* Experience Triggers */}
                <Box className="flex items-center justify-between bg-black p-4 rounded-2xl">
                  <Box className="flex flex-col">
                    <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-400">
                      Experience Triggers
                    </h4>
                    <p className="text-gray-200 py-2 text-xs sm:text-sm md:text-base">
                      {experienceTriggers}
                    </p>
                  </Box>
                  <Box className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                    <Pencil1Icon
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/triggers?quizId=${quiz._id}&isModifying=true`
                        )
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <h3 className="text-md text-white mb-3 ml-2 my-8">
              Experience Question
            </h3>
            {quiz.questions &&
              quiz.questions?.questionAnswer.map((q: any, index: number) => (
                <Box key={index} className="mb-4 bg-black rounded-2xl">
                  <Box
                    className="flex w-full items-center p-4 cursor-pointer"
                    // onClick={() => handleQuestionClick(index)}
                  >
                    <Box className="flex-1">
                      <h3 className="text-md">{q.answer}</h3>
                      {/* <em>Answer: {q.answer}</em> */}
                    </Box>
                    <Box className="flex items-center space-x-2">
                      <Box className="flex items-center text-xs sm:text-sm bg-[#537BDE4D] text-[#537BDE] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
                        Single choice
                      </Box>
                      <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                        <Pencil1Icon
                          className="h-5 w-5 text-gray-400 cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/questions?quizId=${quiz._id}&isModifying=true`
                            )
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Tabs.Content>

          {/* Products Content */}
          <Tabs.Content value="products" className="py-4">
            <Box className="grid grid-cols-2 gap-4 items-center mb-4">
              <Box className="flex items-center justify-between bg-black p-4 rounded-2xl">
                <Box className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-400">
                    Count of Products
                  </h4>
                  <Text className="text-gray-200 text-xl">234</Text>
                </Box>
                <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900 py-2">
                  <Pencil1Icon className="h-5 w-5 text-gray-400 cursor-pointer" />
                </Box>
              </Box>
              <Box className="flex items-center justify-between bg-black p-4 rounded-2xl">
                <Box className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-400">
                    Count of Tags
                  </h4>
                  <Text className="text-gray-200 text-xl">785</Text>
                </Box>
                <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900 py-2">
                  <Pencil1Icon className="h-5 w-5 text-gray-400 cursor-pointer" />
                </Box>
              </Box>
            </Box>
          </Tabs.Content>

          {/* Pages Content */}
          <Tabs.Content value="pages" className="py-4">
            <Box className="bg-black p-4 rounded-2xl flex items-start justify-between">
              <Box className="flex-grow">
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  Counts of Pages
                </h4>
                <Text className="text-gray-200 text-xl">234</Text>
              </Box>

              <Box className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-gray-900">
                <Pencil1Icon className="h-5 w-5 text-gray-400 cursor-pointer" />
              </Box>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Accordion.Content>
    </Accordion.Item>
  );
});

// Update PlatformExperience to accept quizzes
const PlatformExperience: React.FC<PlatformExperienceProps> = React.memo(({ quizzes, value }) => {
  console.log("Value:", value)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredQuizzes = useMemo(() => {
    return quizzes
      .filter((quiz) => quiz.quizName.toLowerCase().includes(searchQuery.toLowerCase()))
      .reverse();
  }, [quizzes, searchQuery]);

  // Simplify initialQuiz calculation
  const initialQuiz = useMemo(() => {
    return filteredQuizzes.find((quiz, index) => index === Number(value));
  }, [filteredQuizzes, value]);

  const [openQuizName, setOpenQuizName] = useState<string | null>(initialQuiz?.quizName||null);

  const handleAccordionToggle = useCallback((quizName: string) => {
    setOpenQuizName((prev) => (prev === quizName ? null : quizName));
  }, []);

  // Function to handle mouse enter and leave events for FileIcon


  return (
    <Box className="min-h-screen bg-black pt-4 pr-6 sm:pt-8 text-gray-100 rounded-2xl">
      <Box className="mb-6 mt-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Search Input Field - 8 columns on larger screens, full width on smaller screens */}
        <Box className="sm:col-span-2 relative ml-1 ">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Box className="flex items-center justify-between bg-[#1A1A1A] text-xs sm:text-sm text-white rounded-full px-6 sm:px-4 py-2 cursor-pointer">
                <Box className="flex items-center gap-4">
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
                  Filter
                </Box>
                <DropdownMenu.TriggerIcon className="mr-4 text-gray-500 font-bold" />
              </Box>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item shortcut="⌘ F">45 days</DropdownMenu.Item>
              <DropdownMenu.Item shortcut="⌘ E">60 days</DropdownMenu.Item>
              <DropdownMenu.Item shortcut="⌘ D">90 days</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
        <Box className="sm:col-span-8 relative ml-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search experiences..."
            className="w-full text-white placeholder-gray-400 bg-[#1A1A1A] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#3EC4A1]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Box className="sm:col-span-2">
          <Link
            href="/dashboard"
            className="rounded-full bg-[#3EC4A1] px-4 py-2 text-sm font-medium  text-black"
          >
            <ExperienceIcon />
            Create Experience
          </Link>
        </Box>
      </Box>

      {/* Accordion Section */}
      <Accordion.Root
        type="single"
        defaultValue={openQuizName ? openQuizName : undefined}
        collapsible
      >
        {filteredQuizzes.map((quiz, index) => (
          <QuizCard
            key={index}
            quiz={quiz}
            revenue="500"
            engagement="10"
            completion="15"
            revenueData={generateChartData(100)}
            engagementData={generateChartData(2100)}
            completionData={generateChartData(30)}
            isOpen={openQuizName === quiz.quizName}
            onToggle={() => handleAccordionToggle(quiz.quizName)}
          />
        ))}
      </Accordion.Root>
    </Box>
  );
});

export default PlatformExperience;
