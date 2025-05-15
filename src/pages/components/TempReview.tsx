import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  CodeIcon,
  CrossCircledIcon,
  DesktopIcon,
  MobileIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  RadioCards,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@/lib/utils/db";
import { QuizzesModel } from "../schemas/quizzes.schema";
import StyleSettings from "../schemas/styleSettings.schema";
import { QuizDocument } from "../schemas/quizzes.schema";
import { IStyleSettings } from "../schemas/styleSettings.schema";
import { GetServerSideProps } from "next";
import QuizFormData from "@/schemas/quiz.schema";
import LayoutFormData, { LayoutFormDataType } from "@/schemas/layout.schema";
import FinalStand from "./components/FinalStand";
import { PreviewCode } from "./components/PreviewCode";

interface Props {
  quizId: string;
  quizName: string;
  quizzes: QuizDocument;
  styles: IStyleSettings;
  initialLayout: LayoutFormDataType;
}

interface ModeSelectorProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

interface DeviceSelectorProps {
  screen: string;
  setScreen: Dispatch<SetStateAction<string>>;
  setCustomScreenSize: Dispatch<SetStateAction<CustomScreenSize>>;
  setCurrentQuizIndex: Dispatch<SetStateAction<number>>;
}

interface CustomScreenSize {
  customScreen: string;
  height: number;
  width: number;
}

interface CustomScreenSizeDropdownProps {
  screen: string;
  customScreenSize: CustomScreenSize;
  setCustomScreenSize: Dispatch<SetStateAction<CustomScreenSize>>;
}

interface ViewSelectorProps {
  placement: string;
  setPlacement: Dispatch<SetStateAction<string>>;
  quizId: string;
}

interface HeaderProps {
  quizName: string;
  quizId: string;
}

interface PreviewContentProps {
  screen: string;
  placement: string;
  customScreenSize: CustomScreenSize;
  quizId: string;
  styleSettings: IStyleSettings["styles"];
}

interface FooterProps {
  quizzes: QuizDocument;
  currentQuizIndex: number;
  setCurrentQuizIndex: Dispatch<SetStateAction<number>>;
}

// Define an interface for the expected quiz data structure
interface QuizData {
  quizName: string;
  // Add other fields if necessary
}

const ReviewExperience = ({
  quizId,
  quizName,
  quizzes,
  styles,
  initialLayout,
}: Props) => {
  const [screen, setScreen] = useState("desktop");
  const [mode, setMode] = useState("preview");
  const [customScreenSize, setCustomScreenSize] = useState<CustomScreenSize>({
    customScreen: "Default",
    height: 570,
    width: 1100,
  });
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [placement, setPlacement] = useState("Pop Up");

  const sendMessageToIframe = () => {
    const iframe = document.querySelector("iframe");
    if (iframe?.contentWindow) {
      const data = {
        layoutData: initialLayout,
        styleSettings: styles?.styles,
        demoQuiz: quizzes?.quizzes,
        currentQuizIndex,
        admin: true,
      };
      iframe.contentWindow.postMessage(data, "http://161.35.107.18:4000");
      // iframe.contentWindow.postMessage(data, "http://localhost:4000");
    }
  };

  useEffect(() => {
    sendMessageToIframe();
  }, [currentQuizIndex]);

  useEffect(() => {
    setCurrentQuizIndex(0);
  }, [placement, mode, screen]);

  return (
    <Flex className="w-full bg-[#393939] text-sm">
      <Flex
        width="360px"
        height="full"
        direction="column"
        className="bg-black text-white p-4"
      >
        <Flex align="start" direction="column" gap="5" width="100%">
          <ModeSelector mode={mode} setMode={setMode} />
          {mode === "preview" && (
            <>
              <DeviceSelector
                screen={screen}
                setScreen={setScreen}
                setCustomScreenSize={setCustomScreenSize}
                setCurrentQuizIndex={setCurrentQuizIndex}
              />
              <CustomScreenSizeDropdown
                screen={screen}
                customScreenSize={customScreenSize}
                setCustomScreenSize={setCustomScreenSize}
              />
              <ViewSelector placement={placement} setPlacement={setPlacement} quizId={quizId} />
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        direction="column"
        justify="between"
        align="center"
        width="100%"
        className="h-screen"
      >
        <Header quizName={quizName} quizId={quizId} />
        {mode === "preview" ? (
          <PreviewContent
            screen={screen}
            placement={placement}
            customScreenSize={customScreenSize}
            quizId={quizId}
            styleSettings={styles?.styles}
          />
        ) : (
          <PreviewCode />
        )}
        <Footer
          quizzes={quizzes}
          currentQuizIndex={currentQuizIndex}
          setCurrentQuizIndex={setCurrentQuizIndex}
        />
      </Flex>
    </Flex>
  );
};

const ModeSelector = ({ mode, setMode }: ModeSelectorProps) => (
  <Flex direction="column" gap="2" width="100%">
    <Heading as="h2" size="2">
      MODE
    </Heading>
    <Box className="flex justify-between w-full gap-4 font-bold">
      <Button
        onClick={() => setMode("code")}
        className={`flex items-center flex-1 ${
          mode === "code" ? "" : "bg-[#242424] text-white"
        } cursor-pointer`}
      >
        <CodeIcon width={20} height={20} />
        Code
      </Button>
      <Button
        onClick={() => setMode("preview")}
        className={`flex items-center flex-1 ${
          mode === "preview" ? "" : "bg-[#242424] text-white "
        } cursor-pointer font-bold`}
      >
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3333 10V9.33333C14.0667 9.33333 14.66 8.73333 14.66 8L14.6667 1.33333C14.6667 0.6 14.0667 0 13.3333 0H2.66667C1.93333 0 1.33333 0.6 1.33333 1.33333V8C1.33333 8.73333 1.93333 9.33333 2.66667 9.33333V10H0V11.3333H16V10H13.3333ZM2.66667 1.33333H13.3333V8H2.66667V1.33333Z"
            fill={mode === "preview" ? "black" : "white"}
          />
        </svg>
        Preview
      </Button>
    </Box>
  </Flex>
);

const DeviceSelector = ({
  screen,
  setScreen,
  setCustomScreenSize,
  setCurrentQuizIndex,
}: DeviceSelectorProps) => (
  <Flex direction="column" gap="2" width="100%">
    <Heading as="h2" size="2">
      DEVICE
    </Heading>
    <Box className="flex justify-between w-full gap-4 font-bold">
      <Button
        onClick={() => {
          setScreen("mobile");
          setCustomScreenSize({
            customScreen: "Default",
            width: 375,
            height: 570,
          });
          setCurrentQuizIndex(0);
        }}
        className={`flex items-center flex-1 ${
          screen === "mobile" ? "" : "bg-[#242424] text-white"
        } cursor-pointer`}
      >
        <MobileIcon width={18} height={18} />
        Mobile
      </Button>
      <Button
        onClick={() => {
          setScreen("desktop");
          setCustomScreenSize({
            customScreen: "Default",
            width: 1100,
            height: 570,
          });
          setCurrentQuizIndex(0);
        }}
        className={`flex items-center flex-1 ${
          screen === "desktop" ? "" : "bg-[#242424] text-white "
        } cursor-pointer font-bold`}
      >
        <DesktopIcon width={18} height={18} />
        Desktop
      </Button>
    </Box>
  </Flex>
);

const CustomScreenSizeDropdown = ({
  screen,
  customScreenSize,
  setCustomScreenSize,
}: CustomScreenSizeDropdownProps) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button
        className="bg-[#242424] text-white flex justify-between p-4 w-full cursor-pointer font-bold"
        size="1"
      >
        {customScreenSize.customScreen}
        <DropdownMenu.TriggerIcon />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content size="1">
      {screen === "mobile" ? (
        <>
          <DropdownMenu.Item
            onSelect={() =>
              setCustomScreenSize({
                customScreen: "iPhone 12 Pro",
                width: 420,
                height: 570,
              })
            }
          >
            iPhone 12 Pro
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            onSelect={() =>
              setCustomScreenSize({
                customScreen: "Pixel 7",
                width: 440,
                height: 570,
              })
            }
          >
            Pixel 7
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            onSelect={() =>
              setCustomScreenSize({
                customScreen: "iPad Mini",
                width: 640,
                height: 570,
              })
            }
          >
            iPad Mini
          </DropdownMenu.Item>
        </>
      ) : (
        <>
          <DropdownMenu.Item
            onSelect={() =>
              setCustomScreenSize({
                customScreen: "iPad Pro",
                width: 900,
                height: 550,
              })
            }
          >
            iPad Pro
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            onSelect={() =>
              setCustomScreenSize({
                customScreen: "Asus Zenbook Fold",
                width: 1100,
                height: 576,
              })
            }
          >
            Asus Zenbook Fold
          </DropdownMenu.Item>
        </>
      )}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

const ViewSelector = ({ placement, setPlacement, quizId }: ViewSelectorProps) => (
  <Flex direction="column" gap="2" width="100%">
    <Heading as="h2" size="2">
      VIEW
    </Heading>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          className="bg-[#242424] text-white flex justify-between p-4 w-full cursor-pointer font-bold"
          size="1"
        >
          <Flex gap="1">{placement}</Flex>
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="1">
        <DropdownMenu.Item onSelect={() => setPlacement("Companion")}>
          Companion
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={() => setPlacement("Stand Alone")}>
          Stand Alone
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={() => setPlacement("Pop Up")}>
          Pop Up
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    {placement === "Stand Alone" && (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={`http://161.35.107.18:4000/quiz/${quizId}?height=570&width=1100&standAlone=true`}
        // href={`http://localhost:4000/quiz/${quizId}?height=570&width=1100&standAlone=true`}
        // passHref
        className="bg-[#3EC4A1] text-black font-bold p-2 rounded text-center"
      >
        Open in new tab
      </Link>
    )}
  </Flex>
);

const Header = ({ quizName, quizId }: HeaderProps) => (
  <Flex
    align="center"
    justify="between"
    className="w-full h-[60px] px-5 bg-black shadow-md z-1000"
  >
    <Flex align="center" gap="3" p="2">
      <Box
        className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#8181814D]`}
      >
        <svg
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.1667 13.667C13.1667 12.2863 11.3012 11.167 9 11.167C6.69881 11.167 4.83333 12.2863 4.83333 13.667M16.5 11.1673C16.5 10.1421 15.4716 9.2611 14 8.87533M1.5 11.1673C1.5 10.1421 2.52841 9.2611 4 8.87533M14 5.53041C14.5115 5.07265 14.8333 4.40741 14.8333 3.66699C14.8333 2.28628 13.714 1.16699 12.3333 1.16699C11.693 1.16699 11.109 1.4077 10.6667 1.80357M4 5.53041C3.48854 5.07265 3.16667 4.40741 3.16667 3.66699C3.16667 2.28628 4.28595 1.16699 5.66667 1.16699C6.30696 1.16699 6.89104 1.4077 7.33333 1.80357M9 8.66699C7.61929 8.66699 6.5 7.5477 6.5 6.16699C6.5 4.78628 7.61929 3.66699 9 3.66699C10.3807 3.66699 11.5 4.78628 11.5 6.16699C11.5 7.5477 10.3807 8.66699 9 8.66699Z"
            stroke="#4D4D4D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
      <Text size="5" className="m-0 text-white">
        {quizName}
      </Text>
    </Flex>

    <Box className="flex gap-6 ml-auto">
      <Link href="/basic">
        <Button
          size="3"
          className="flex items-center gap-2 px-14 rounded-full bg-[#242424] text-white cursor-pointer text-sm font-medium"
        >
          <CrossCircledIcon color="red" width={20} height={20} />
          Cancel
        </Button>
      </Link>
      <Link href={`/editor?quizId=${quizId}`}>
        <Button
          size="3"
          className="flex items-center gap-2 rounded-full bg-[#242424] text-white px-14 cursor-pointer text-sm font-medium"
        >
          <Pencil1Icon color="gray" width={24} height={24} /> Edit
        </Button>
      </Link>
      <Link href="/preference">
        <Button
          size="3"
          className="flex items-center rounded-full gap-2 px-14 cursor-pointer text-sm font-medium bg-[#3EC4A1]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7519 9.16795L9.5547 7.03647C8.89015 6.59343 8 7.06982 8 7.86852V12.1315C8 12.9302 8.89015 13.4066 9.5547 12.9635L12.7519 10.8321C13.3457 10.4362 13.3457 9.56377 12.7519 9.16795Z"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Publish
        </Button>
      </Link>
    </Box>
  </Flex>
);

const PreviewContent = ({
  screen,
  placement,
  customScreenSize,
  quizId,
  styleSettings,
}: PreviewContentProps) => (
  <Flex className="relative w-full h-full">
    {screen === "desktop" && placement !== "Stand Alone" && (
      <Box
        className="absolute inset-0 bg-cover bg-center m-2"
        style={{
          backgroundImage: "url('/coffee-demo-site.png')",
          opacity: 0.5,
          zIndex: 0,
        }}
      />
    )}
    {placement !== "Stand Alone" && (
      <Box
        className={`absolute ${
          placement === "Pop Up" ||
          (screen === "mobile" && placement === "Companion")
            ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            : "bottom-8 left-8"
        } m-4 shadow-lg rounded-lg overflow-hidden z-10`}
        style={{
          width: customScreenSize.width,
          height: customScreenSize.height,
        }}
      >
        <iframe
          // src={`http://localhost:4000/quiz/${quizId}?height=${customScreenSize.height}&width=${customScreenSize.width}`}
          src={`http://161.35.107.18:4000/quiz/${quizId}?height=${customScreenSize.height}&width=${customScreenSize.width}`}
          width="100%"
          height="100%"
          style={{
            borderRadius: `${styleSettings.cornerRadius}px`,
            overflow: "hidden",
          }}
        ></iframe>
      </Box>
    )}
    {placement === "Companion" && screen === "desktop" && (
      <Flex
        align="center"
        justify="center"
        className="absolute bottom-0 left-0 m-4 w-8 h-8 rounded-full text-black font-bold z-20"
        style={{ backgroundColor: styleSettings.backgroundColor }}
      >
        ✕
      </Flex>
    )}
  </Flex>
);

const Footer = ({
  quizzes,
  currentQuizIndex,
  setCurrentQuizIndex,
}: FooterProps) => (
  <Flex width="100%" px="4" py="2" className="bg-black">
    <Flex justify="between" align="center" width="100%" px="4" gap="2">
      <RadioCards.Root
        defaultValue="0"
        size="2"
        value={currentQuizIndex.toString()}
        onValueChange={(value) => setCurrentQuizIndex(Number(value))}
      >
        <ScrollArea
          type="always"
          scrollbars="horizontal"
          style={{ height: "100%" }}
        >
          <Flex direction="row" gap="2" py="4">
            {quizzes?.quizzes.map((_, index) => (
              <RadioCards.Item
                key={index}
                value={index.toString()}
                className="relative py-1 w-40 bg-[#242424] cursor-pointer"
                onClick={() => setCurrentQuizIndex(index)}
              >
                <Flex
                  align="center"
                  justify="center"
                  as="span"
                  className="absolute bg-[#3EC4A1] rounded-full h-4 w-4 bottom-2 left-2 text-center text-sm text-black"
                >
                  {index + 1}
                </Flex>
                <Image
                  width={50}
                  height={70}
                  className="cover"
                  src="https://images.pexels.com/photos/357778/pexels-photo-357778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="coffee"
                />
              </RadioCards.Item>
            ))}
          </Flex>
        </ScrollArea>
      </RadioCards.Root>
    </Flex>
    <Flex></Flex>
  </Flex>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quizId } = context.query;
  if (!quizId) {
    return {
      redirect: {
        destination: "/basic",
        permanent: false,
      },
    };
  }
  await connectToDatabase();
  const quiz = await QuizFormData.findById(quizId);
  if (!quiz) {
    return {
      redirect: {
        destination: "/basic",
        permanent: false,
      },
    };
  }
  const layout = await LayoutFormData.findOne({ quizId }).lean();
  try {
    const quizzes = await QuizzesModel.findOne({ quizId }).lean();
    const styles = await StyleSettings.findOne({ quizId }).lean();
    const quizData = await QuizFormData.findById<QuizData>(quizId, "quizName").lean();
    const quizName = quizData?.quizName || "";
    return {
      props: {
        quizId,
        quizName,
        initialLayout: JSON.parse(JSON.stringify(layout)),
        quizzes: quizzes
          ? JSON.parse(JSON.stringify(quizzes))
          : {
              quizzes: [
                {
                  id: 0,
                  quizType: "Start Screen",
                  question: "Edit headline",
                  subHeadline: "Edit sub headline",
                  buttonText: "Edit button text",
                },
                {
                  id: 1,
                  quizType: "Gender",
                  question: "Whats your gender?",
                  options: [
                    {
                      option: "Male",
                    },
                    {
                      option: "Female",
                    },
                    {
                      option: "Prefer not to say!",
                    },
                  ],
                },
                {
                  id: 2,
                  quizType: "Age",
                  question: "Whats your age?",
                  options: [
                    {
                      label: "Prefer not to say",
                    },
                    {
                      label: "Under 20",
                    },
                    {
                      label: "20-35",
                    },
                    {
                      label: "35-50",
                    },
                    {
                      label: "50-65",
                    },
                    {
                      id: 5,
                      label: "Above 65",
                    },
                  ],
                },
                {
                  id: 3,
                  quizType: "Grid",
                  question:
                    "How would you describe yourself when buying a coffee?",
                  options: [
                    { name: "Decisive", active: false },
                    { name: "Purposeful", active: false },
                    { name: "Productive", active: false },
                    { name: "Firm", active: false },
                    { name: "Energetic", active: false },
                    { name: "Emotional", active: false },
                    { name: "Fun-Loving", active: false },
                    { name: "Intuitive", active: false },
                    { name: "Thoughtful", active: false },
                    { name: "Indecisive", active: false },
                    { name: "Easy Going", active: false },
                    { name: "Cooperative", active: false },
                    { name: "Detailed", active: false },
                    { name: "Respectful", active: false },
                    { name: "Methodical", active: false },
                    { name: "Logicalh", active: false },
                  ],
                },
              ],
            },
        styles: styles
          ? JSON.parse(JSON.stringify(styles))
          : {
              styles: {
                textColor: "#008000",
                backgroundColor: "#fbf5e2",
                cornerRadius: "16",
                borderWidth: "0",
                borderColor: "#000000",
                backgroundButton: "#5676FA",
                shadow: "#5676FA",
                font: "Fredoka",
                lineHeight: "1",
                letterSpacing: "0",
                boldness: "6",
              },
            },
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        quizId,
        quizName: "",
        initialLayout: JSON.parse(JSON.stringify(layout)),
        quizzes: {
          quizzes: [
            {
              id: 0,
              quizType: "Start Screen",
              question: "Edit headline",
              subHeadline: "Edit sub headline",
              buttonText: "Edit button text",
            },
            {
              id: 1,
              quizType: "Gender",
              question: "Whats your gender?",
              options: [
                {
                  option: "Male",
                },
                {
                  option: "Female",
                },
                {
                  option: "Prefer not to say!",
                },
              ],
            },
            {
              id: 2,
              quizType: "Age",
              question: "Whats your age?",
              options: [
                {
                  label: "Prefer not to say",
                },
                {
                  label: "Under 20",
                },
                {
                  label: "20-35",
                },
                {
                  label: "35-50",
                },
                {
                  label: "50-65",
                },
                {
                  id: 5,
                  label: "Above 65",
                },
              ],
            },
            {
              id: 3,
              quizType: "Grid",
              question: "How would you describe yourself when buying a coffee?",
              options: [
                { name: "Decisive", active: false },
                { name: "Purposeful", active: false },
                { name: "Productive", active: false },
                { name: "Firm", active: false },
                { name: "Energetic", active: false },
                { name: "Emotional", active: false },
                { name: "Fun-Loving", active: false },
                { name: "Intuitive", active: false },
                { name: "Thoughtful", active: false },
                { name: "Indecisive", active: false },
                { name: "Easy Going", active: false },
                { name: "Cooperative", active: false },
                { name: "Detailed", active: false },
                { name: "Respectful", active: false },
                { name: "Methodical", active: false },
                { name: "Logicalh", active: false },
              ],
            },
          ],
        },
        styles: {
          styles: {
            textColor: "#008000",
            backgroundColor: "#fbf5e2",
            cornerRadius: "16",
            borderWidth: "0",
            borderColor: "#000000",
            backgroundButton: "#5676FA",
            shadow: "#5676FA",
            font: "Fredoka",
            lineHeight: "1",
            letterSpacing: "0",
            boldness: "6",
          },
        },
      },
    };
  }
};

export default ReviewExperience;
