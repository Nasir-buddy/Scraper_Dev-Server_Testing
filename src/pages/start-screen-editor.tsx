import { useEffect, useState } from "react";
import QuizBodyLayoutIcon from "../../public/EditorIcons/QuizBodyLayoutIcon.svg";
import AddImageIcon from "../../public/EditorIcons/AddImageIcon.svg";
import SelectionLayoutIcon from "../../public/EditorIcons/SelectionLayoutIcon.svg";
import SelectionTypeIcon from "../../public/EditorIcons/SelectionTypeIcon.svg";
import { connectToDatabase } from "@/lib/utils/db";
import { QuizzesModel, QuizItem, QuizOption } from "../schemas/quizzes.schema";
import StyleSettings from "../schemas/styleSettings.schema";
import { QuizDocument } from "../schemas/quizzes.schema";
import { IStyleSettings } from "../schemas/styleSettings.schema";
import { GetServerSideProps } from "next";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CrossCircledIcon,
  EyeOpenIcon,
  InfoCircledIcon,
  PlayIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  Heading,
  Radio,
  RadioCards,
  ScrollArea,
  Separator,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import QuizFormData from "@/schemas/quiz.schema";
import LayoutFormData, { LayoutFormDataType } from "@/schemas/layout.schema";
const TextOnlyLayoutInputs = ["2 Input", "3 Input", "4 Input", "5 Input"];
const ImageAndTextLayoutInputs = [
  "2 Image + Text",
  "3 Image + Text",
  "4 Image + Text",
  "5 Image + Text",
];

const SelectionLayout = [
  "Text Only",
  "Free Text",
  "Slider",
  "Number",
  "Image & Text",
];
interface StyleSettings {
  textColor: string;
  backgroundColor: string;
  cornerRadius: string;
  borderWidth: string;
  borderColor: string;
  backgroundButton: string;
  shadow: string;
  font: string;
  lineHeight: string;
  letterSpacing: string;
  boldness: string;
}
interface Props {
  quizId: string;
  quizName: string;
  quizzes: QuizDocument;
  styles: IStyleSettings;
  initialLayout: LayoutFormDataType;
}
// interface QuizOption {
//   productName?: string;
//   image?: string;
//   option?: string;
//   label?: string;
//   name?: string;
//   active?: boolean;
// }

// interface QuizItem {
//   id: number;
//   quizType: string;
//   question: string;
//   choice?: string;
//   options?: QuizOption[];
//   numberOfInput?: number;
//   minRange?: string;
//   maxRange?: string;
// }
const Editor = ({
  quizId,
  quizzes,
  quizName,
  styles,
  initialLayout,
}: Props) => {
  console.log("Quiz name is:", quizName);
  const [demoQuiz, setDemoQuiz] = useState<QuizItem[]>(quizzes?.quizzes);
  const [layoutTitle, setLayoutTitle] = useState<string>(
    initialLayout?.layoutTitle || "Text Only"
  );
  const [layoutImage, setLayoutImage] = useState<string>(
    initialLayout?.layoutImage || ""
  );
  const [startScreenImage, setStartScreenImage] = useState<string>(
    initialLayout?.startScreenImage || ""
  );
  const [toggleSelectionLayout, setToggleSelectionLayout] =
    useState<boolean>(false);
  const [toggleStartScreenQuestionLayout, setToggleStartScreenQuestionLayout] =
    useState<boolean>(false);
  const [screen, setScreen] = useState<string>("mobile");
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [styleSettings, setStyleSettings] = useState<StyleSettings>(
    styles?.styles
  );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<string> => {
    const file = event.target.files?.[0];
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qtg02bum");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtdz3lyxv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        return data.url; // Return the URL
      } else {
        const errorData = await response.json();
        console.error("Failed to upload image:", errorData);
        return "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const handleSave = () => {
    updateCurrentQuizItem({
      question: questionInput,
      minRange: minMaxValues.minRange,
      maxRange: minMaxValues.maxRange,
      options: inputData,
    });
  };

  function updateCurrentQuizItem(changes: Partial<QuizItem>) {
    setDemoQuiz((prevQuiz) => {
      const updatedQuiz = [...prevQuiz];
      const currentItem = updatedQuiz[currentQuizIndex];

      // Only update if there are changes
      if (currentItem) {
        updatedQuiz[currentQuizIndex] = { ...currentItem, ...changes };
      }
      setToggleSelectionLayout(false);
      setToggleStartScreenQuestionLayout(false);
      return updatedQuiz;
    });
  }
  function handleNumberOfInput(value: number) {
    // setDemoQuiz((prevQuiz) => {
    const currentItem = demoQuiz[currentQuizIndex];

    if (currentItem && currentItem.numberOfInput !== undefined) {
      const currentOptions = currentItem.options || [];
      if (currentOptions.length > value) {
        updateCurrentQuizItem({
          numberOfInput: value,
          options: currentOptions.slice(0, value),
        });
      } else if (currentItem.numberOfInput < value) {
        const additionalOptions = Array.from(
          { length: value - currentItem.numberOfInput },
          () => ({
            productName: "Product Name",
            image: "",
          })
        );
        updateCurrentQuizItem({
          numberOfInput: value,
          options: [...currentOptions, ...additionalOptions],
        });
      }
    }

    // });
  }

  const updateStyleSetting = (key: string, value: string | number) => {
    setStyleSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };
  // function to create new quiz
  const handleAddNewQuestion = () => {
    const newQuizItem: QuizItem = {
      id: demoQuiz.length,
      quizType: "Text Only",
      question: "Edit your question",
      choice: "Single Choice",
      options: [
        { productName: "First option" },
        { productName: "Second option" },
        { productName: "Third option" },
      ],
      numberOfInput: 3,
    };

    setDemoQuiz((prevQuiz) => [...prevQuiz, newQuizItem]);
    setCurrentQuizIndex(demoQuiz.length);
  };

  //Delete quiz method
  const handleDeleteQuiz = () => {
    setDemoQuiz((prevQuiz) => {
      // Remove the quiz at the current index
      const updatedQuiz = prevQuiz.filter(
        (_, index) => index !== currentQuizIndex
      );

      // Reassign IDs to maintain correct sequence
      return updatedQuiz.map((item, index) => ({
        ...item,
        id: index,
      }));
    });

    // Adjust the currentQuizIndex if necessary
    setCurrentQuizIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const [inputData, setInputData] = useState<QuizOption[]>([]);
  useEffect(() => {
    const currentOptions = demoQuiz[currentQuizIndex]?.options || [];
    setInputData(
      currentOptions.map((option) => ({
        productName: option.productName || "",
        image: option.image || "",
      }))
    );
  }, [currentQuizIndex, demoQuiz]);
  const handleInputChange = (index: number, value: string, field: string) => {
    setInputData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
  };

  // Sending data methods to iframe
  const [questionInput, setQuestionInput] = useState<string>(
    demoQuiz[currentQuizIndex].question
  );

  const [startScreenLayoutInput, setStartScreenLayoutInput] = useState(() => {
    const firstQuizItem = demoQuiz[0] || {};
    return {
      question: firstQuizItem.question || "",
      subHeadline: firstQuizItem.subHeadline || "",
      buttonText: firstQuizItem.buttonText || "",
    };
  });
  console.log("start screen layout:", startScreenLayoutInput);
  const [minMaxValues, setMinMaxValues] = useState({
    minRange: demoQuiz[currentQuizIndex]?.minRange || "",
    maxRange: demoQuiz[currentQuizIndex]?.maxRange || "",
  });
  useEffect(() => {
    const currentQuiz = demoQuiz[currentQuizIndex];
    if (currentQuiz) {
      setQuestionInput(currentQuiz.question);
      setMinMaxValues({
        minRange: currentQuiz.minRange || "",
        maxRange: currentQuiz.maxRange || "",
      });
    }
  }, [currentQuizIndex, demoQuiz]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const imageUrl = await handleImageUpload(event);
    if (imageUrl) {
      setState(imageUrl); // Use the provided setState function to update the state
    } else {
      console.error("Image upload failed");
    }
  };

  const handleInputImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(index);
    const imageUrl = await handleImageUpload(event);
    if (imageUrl) {
      handleInputChange(index, imageUrl, "image"); // Store the URL in the state
    } else {
      console.error("Image upload failed");
    }
  };

  const sendMessageToIframe = () => {
    const iframe = document.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
      const data = {
        layoutData: {
          layoutImage: layoutImage,
          layoutTitle: layoutTitle,
          startScreenImage: startScreenImage,
        },
        styleSettings,
        demoQuiz,
        currentQuizIndex,
        admin: true,
      };
      iframe.contentWindow.postMessage(data, "http://161.35.107.18:4000");
      // iframe.contentWindow.postMessage(data, "http://localhost:4000");
    }
  };
  useEffect(() => {
    sendMessageToIframe();
  }, []);
  //Api for saving the data
  useEffect(() => {
    const saveStyleSettings = async () => {
      try {
        const response = await fetch("/api/styleSettingsApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            styles: styleSettings,
            quizId,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("Style settings saved successfully");
        } else {
          console.error("Failed to save style settings");
        }
      } catch (error) {
        console.error("Error saving style settings:", error);
      }
    };
    saveStyleSettings();
    sendMessageToIframe();
  }, [styleSettings]);
  //Api for saving layout
  useEffect(() => {
    const saveLayoutSettings = async () => {
      try {
        const response = await fetch("/api/layoutFormApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            layoutTitle,
            layoutImage,
            startScreenImage,
            quizId,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("Layout saved successfully");
          console.log("saved layout data", data);
        } else {
          console.error("Failed to save Layout");
        }
      } catch (error) {
        console.error("Error saving Layout:", error);
      }
    };
    saveLayoutSettings();
  }, [layoutImage, layoutTitle, startScreenImage]);
  useEffect(() => {
    const saveQuizzes = async () => {
      try {
        const response = await fetch("/api/quizzesApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizzes: demoQuiz,
            quizId,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("Quizzes saved");
        } else {
          console.error("Failed to save quizzes", data);
        }
      } catch (error) {
        console.error("Error saving quizzes:", error);
      }
    };
    saveQuizzes();
    sendMessageToIframe();
  }, [demoQuiz]);

  useEffect(() => {
    sendMessageToIframe();
    setToggleSelectionLayout(false);
  }, [currentQuizIndex, layoutImage, layoutTitle, startScreenImage]);

  return (
    <Flex className="w-full bg-[#393939] text-sm">
      {/* Sidebar */}
      <ScrollArea
        type="always"
        scrollbars="vertical"
        style={{ height: "100vh", width: "360px" }}
      >
        <Flex direction="column" className="bg-[#141414] text-white p-4 h-full">
          <Flex direction="column" gap="2">
            <Heading as="h2" size="2">
              VIEW
            </Heading>
            <Flex align="start" direction="column" gap="3">
              <Flex asChild gap="2">
                <Text as="label" size="2">
                  <Radio
                    name="screen"
                    value="mobile"
                    checked={screen === "mobile"}
                    onChange={(e) => setScreen(e.target.value)}
                  />
                  Mobile
                </Text>
              </Flex>
              <Flex asChild gap="2">
                <Text as="label" size="2">
                  <Radio
                    name="screen"
                    value="desktop"
                    checked={screen === "desktop"}
                    onChange={(e) => setScreen(e.target.value)}
                  />
                  Desktop
                </Text>
              </Flex>
            </Flex>
            <Separator my="3" size="4" />

            {demoQuiz[currentQuizIndex].quizType === "Start Screen" ? (
              <Flex direction="column" gap="2" mb="2">
                <Heading as="h2" size="2">
                  START SCREEN LAYOUT
                </Heading>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button
                      className="bg-[#242424] text-white flex justify-between p-4"
                      size="1"
                    >
                      <Flex gap="1">
                        <Image
                          src={QuizBodyLayoutIcon}
                          alt="Icon"
                          width={17}
                          height={17}
                        />
                        {layoutTitle}
                      </Flex>
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="1">
                    <DropdownMenu.Item
                      onSelect={() => setLayoutTitle("Text Only")}
                    >
                      <Image
                        src={QuizBodyLayoutIcon}
                        alt="Icon"
                        width={17}
                        height={17}
                      />{" "}
                      Text Only
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      onSelect={() => setLayoutTitle("Image and Text")}
                    >
                      <Image
                        src={QuizBodyLayoutIcon}
                        alt="Icon"
                        width={17}
                        height={17}
                      />{" "}
                      Image & Text
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            ) : (
              <Flex direction="column" gap="2" mb="2">
                <Heading as="h2" size="2">
                  QUIZ BODY LAYOUT
                </Heading>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button
                      className="bg-[#242424] text-white flex justify-between p-4"
                      size="1"
                    >
                      <Flex gap="1">
                        <Image
                          src={QuizBodyLayoutIcon}
                          alt="Icon"
                          width={17}
                          height={17}
                        />
                        {layoutTitle}
                      </Flex>
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="1">
                    <DropdownMenu.Item
                      onSelect={() => setLayoutTitle("Text Only")}
                    >
                      <Image
                        src={QuizBodyLayoutIcon}
                        alt="Icon"
                        width={17}
                        height={17}
                      />{" "}
                      Text Only
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      onSelect={() => setLayoutTitle("Image and Text")}
                    >
                      <Image
                        src={QuizBodyLayoutIcon}
                        alt="Icon"
                        width={17}
                        height={17}
                      />{" "}
                      Image & Text
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            )}
            {layoutTitle === "Image and Text" &&
              demoQuiz[currentQuizIndex].quizType === "Start Screen" && (
                <Flex direction="column" gap="2">
                  <Heading as="h2" size="2">
                    START SCREEN IMAGE
                  </Heading>
                  <Flex align="center" justify="center">
                    <label
                      htmlFor="file-upload"
                      className="bg-[#242424] text-white flex justify-between w-full rounded-sm py-2 px-4"
                    >
                      Add Image
                      <Image
                        src={AddImageIcon}
                        alt="Icon"
                        width={17}
                        height={17}
                      />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(event) =>
                        handleImageChange(event, setStartScreenImage)
                      }
                    />
                  </Flex>
                </Flex>
              )}
            {layoutTitle === "Image and Text" &&
              demoQuiz[currentQuizIndex].quizType !== "Start Screen" && (
                <Flex direction="column" gap="2">
                  <Heading as="h2" size="2">
                    QUIZ BODY IMAGE
                  </Heading>
                  <Flex align="center" justify="center">
                    <label
                      htmlFor="file-upload"
                      className="bg-[#242424] text-white flex justify-between w-full rounded-sm py-2 px-4"
                    >
                      Add Image
                      <Image
                        src={AddImageIcon}
                        alt="Icon"
                        width={17}
                        height={17}
                      />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(event) =>
                        handleImageChange(event, setLayoutImage)
                      }
                    />
                  </Flex>
                </Flex>
              )}
            <Separator my="3" size="4" />
            {SelectionLayout.includes(demoQuiz[currentQuizIndex].quizType) && (
              <Flex direction="column" gap="2" mb="2">
                <>
                  <Heading as="h2" size="2">
                    OPTIONS FORMAT
                  </Heading>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button
                        className="bg-[#242424] text-white flex justify-between p-4"
                        size="1"
                      >
                        <Flex gap="1">
                          <Image
                            src={QuizBodyLayoutIcon}
                            alt="Icon"
                            width={17}
                            height={17}
                          />
                          {demoQuiz[currentQuizIndex]?.quizType ||
                            "Select layout type"}
                        </Flex>
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content size="1">
                      {SelectionLayout.map((item, index) => (
                        <>
                          <DropdownMenu.Item
                            key={index}
                            onSelect={() =>
                              updateCurrentQuizItem({ quizType: item })
                            }
                            // updateQuizItem(currentQuizIndex, {
                            //   quizType: item,
                            // })
                          >
                            <Image
                              src={QuizBodyLayoutIcon}
                              alt="Icon"
                              width={17}
                              height={17}
                            />{" "}
                            {item}
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                        </>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </>
              </Flex>
            )}
            {["Image & Text", "Text Only", "Image Only"].includes(
              demoQuiz[currentQuizIndex].quizType
            ) && (
              <Flex direction="column" gap="2" mb="2">
                <Heading as="h2" size="2">
                  NUMBER OF OPTIONS
                </Heading>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button
                      className="bg-[#242424] text-white flex justify-between p-4"
                      size="1"
                    >
                      <Flex gap="1">
                        <Image
                          src={SelectionLayoutIcon}
                          alt="Icon"
                          width={17}
                          height={17}
                        />
                        {demoQuiz[currentQuizIndex].quizType === "Text Only" ||
                        demoQuiz[currentQuizIndex].quizType === "Image Only"
                          ? TextOnlyLayoutInputs[
                              (demoQuiz[currentQuizIndex]?.numberOfInput ?? 2) -
                                2
                            ]
                          : ImageAndTextLayoutInputs[
                              (demoQuiz[currentQuizIndex]?.numberOfInput ?? 2) -
                                2
                            ]}
                      </Flex>
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content size="1">
                    {demoQuiz[currentQuizIndex].quizType === "Text Only" &&
                      TextOnlyLayoutInputs.map((item, index) => (
                        <div key={index}>
                          <DropdownMenu.Item
                            onSelect={() =>
                              // updateQuizItem(currentQuizIndex, {
                              //   numberOfInput: index + 2,
                              // })
                              // updateCurrentQuizItem({
                              //   numberOfInput: index + 2,
                              // })
                              handleNumberOfInput(index + 2)
                            }
                          >
                            <Image
                              src={SelectionLayoutIcon}
                              alt="Icon"
                              width={17}
                              height={17}
                            />
                            {item}
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                        </div>
                      ))}
                    {demoQuiz[currentQuizIndex].quizType === "Image & Text" &&
                      ImageAndTextLayoutInputs.map((item, index) => (
                        <div key={index}>
                          <DropdownMenu.Item
                            onSelect={() =>
                              // updateQuizItem(currentQuizIndex, {
                              //   numberOfInput: index + 2,
                              // })
                              // updateCurrentQuizItem({
                              //   numberOfInput: index + 2,
                              // })
                              handleNumberOfInput(index + 2)
                            }
                          >
                            <Image
                              src={SelectionLayoutIcon}
                              alt="Icon"
                              width={17}
                              height={17}
                            />
                            {item}
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                        </div>
                      ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            )}

            {["Image & Text", "Text Only"].includes(
              demoQuiz[currentQuizIndex].quizType
            ) && (
              <>
                <Flex direction="column" gap="2">
                  <Heading as="h2" size="2">
                    SELECTION TYPE
                  </Heading>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button
                        className="bg-[#242424] text-white flex justify-between p-4"
                        size="1"
                      >
                        <Flex gap="1">
                          <Image
                            src={SelectionTypeIcon}
                            alt="Icon"
                            width={17}
                            height={17}
                          />
                          {demoQuiz[currentQuizIndex].choice}
                        </Flex>
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content size="1">
                      <DropdownMenu.Item
                        onSelect={() =>
                          // updateQuizItem(currentQuizIndex, {
                          //   choice: "Single Choice",
                          // })
                          updateCurrentQuizItem({ choice: "Single Choice" })
                        }
                      >
                        Single Choice
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        onSelect={() =>
                          // updateQuizItem(currentQuizIndex, {
                          //   choice: "Multiple Choice",
                          // })
                          updateCurrentQuizItem({ choice: "Multiple Choice" })
                        }
                      >
                        Multiple Choice
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Flex>
                <Separator my="3" size="4" />
              </>
            )}

            {demoQuiz[currentQuizIndex].quizType === "Start Screen" ? (
              <Flex className="w-full">
                <Button
                  onClick={() =>
                    setToggleStartScreenQuestionLayout(
                      !toggleStartScreenQuestionLayout
                    )
                  }
                  // className="bg-inherit text-white w-full flex items-center justify-between"
                  className={`bg-inherit p-0  w-full flex items-center justify-between text-white cursor-pointer
                `}
                >
                  <Flex gap="1">
                    <Heading as="h2" size="2">
                      EDIT HEADLINE/SUBHEADLINE
                    </Heading>
                  </Flex>
                  <Flex
                    align="center"
                    justify="center"
                    className="w-8 h-8 bg-black rounded-full"
                  >
                    {toggleSelectionLayout ? (
                      <ArrowUpIcon className="w-4 h-4 text-[#3EC4A1]" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-[#818181]" />
                    )}
                  </Flex>
                  {/* </Flex> */}
                </Button>
              </Flex>
            ) : (
              <Flex className="w-full">
                <Button
                  onClick={() =>
                    setToggleSelectionLayout(!toggleSelectionLayout)
                  }
                  // className="bg-inherit text-white w-full flex items-center justify-between"
                  className={`bg-inherit p-0  w-full flex items-center justify-between ${
                    !SelectionLayout.includes(
                      demoQuiz[currentQuizIndex].quizType
                    )
                      ? " text-gray-500"
                      : " text-white cursor-pointer"
                  }`}
                >
                  <Flex gap="1">
                    <Heading as="h2" size="2">
                      EDIT QUESTIONS/ANSWERS
                    </Heading>
                    {!SelectionLayout.includes(
                      demoQuiz[currentQuizIndex].quizType
                    ) && (
                      <Tooltip content="Personality questions or answers cannot be edited since this would affect the modelling and page generation. However,  the question can be completely removed from the quiz">
                        <InfoCircledIcon color="white" />
                      </Tooltip>
                    )}
                  </Flex>
                  <Flex
                    align="center"
                    justify="center"
                    className="w-8 h-8 bg-black rounded-full"
                  >
                    {toggleSelectionLayout ? (
                      <ArrowUpIcon className="w-4 h-4 text-[#3EC4A1]" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-[#818181]" />
                    )}
                  </Flex>
                  {/* </Flex> */}
                </Button>
              </Flex>
            )}
            {toggleSelectionLayout &&
              SelectionLayout.includes(demoQuiz[currentQuizIndex].quizType) && (
                <Flex direction="column" gap="3">
                  <Heading as="h2" size="2">
                    QUESTION
                  </Heading>
                  <TextArea
                    // value={demoQuiz[currentQuizIndex].question}
                    value={questionInput}
                    onChange={(e) =>
                      // updateQuizItem(currentQuizIndex, {
                      //   question: e.target.value,
                      // })
                      setQuestionInput(e.target.value)
                    }
                    placeholder="Edit Question"
                    className="h-20 rounded-xl"
                  />
                  <Heading as="h2" size="2">
                    ANSWERS
                  </Heading>
                  {demoQuiz[currentQuizIndex].quizType === "Slider" && (
                    <Flex justify="between" align="center">
                      <TextField.Root
                        className="rounded-xl w-[40%]"
                        // value={demoQuiz[currentQuizIndex]?.minRange}
                        value={minMaxValues.minRange}
                        onChange={(e) => {
                          // updateQuizItem(currentQuizIndex, {
                          //   minRange: e.target.value,
                          // });
                          setMinMaxValues((prevValues) => ({
                            ...prevValues,
                            minRange: e.target.value,
                          }));
                        }}
                      ></TextField.Root>
                      to
                      <TextField.Root
                        className="rounded-xl w-[40%]"
                        // value={demoQuiz[currentQuizIndex]?.maxRange}
                        value={minMaxValues.maxRange}
                        onChange={(e) => {
                          // updateQuizItem(currentQuizIndex, {
                          //   maxRange: e.target.value,
                          // });
                          setMinMaxValues((prevValues) => ({
                            ...prevValues,
                            maxRange: e.target.value,
                          }));
                        }}
                      ></TextField.Root>
                    </Flex>
                  )}
                  {demoQuiz[currentQuizIndex]?.numberOfInput !== undefined &&
                    ["Image & Text", "Image Only", "Text Only"].includes(
                      demoQuiz[currentQuizIndex]?.quizType
                    ) && (
                      <Flex direction="column" gap="2">
                        {/* { demoQuiz[currentQuizIndex].numberOfInput} */}
                        {Array.from({
                          length: demoQuiz[currentQuizIndex].numberOfInput || 0,
                        }).map((_, index) => (
                          <Flex justify="between" key={index}>
                            {["Image & Text", "Text Only"].includes(
                              demoQuiz[currentQuizIndex]?.quizType
                            ) && (
                              <TextField.Root
                                defaultValue={
                                  demoQuiz[currentQuizIndex]?.options?.[index]
                                    ?.productName || ""
                                }
                                placeholder="Enter product name"
                                mb="1"
                                className="rounded-xl w-1/2"
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    e.target.value,
                                    "productName"
                                  )
                                }
                              />
                            )}
                            {demoQuiz[currentQuizIndex]?.quizType ===
                              "Image & Text" && (
                              <Flex align="center" justify="center" width="40%">
                                <label
                                  htmlFor={`input-file-upload-${index}`}
                                  className="bg-[#242424] text-white flex justify-between w-full rounded-sm p-2"
                                >
                                  Upload
                                  <Image
                                    src={AddImageIcon}
                                    alt="Icon"
                                    width={17}
                                    height={17}
                                  />
                                </label>
                                <input
                                  id={`input-file-upload-${index}`}
                                  type="file"
                                  className="hidden"
                                  onChange={(event) =>
                                    handleInputImageChange(event, index)
                                  }
                                />
                              </Flex>
                            )}
                          </Flex>
                        ))}
                        {/* <Button onClick={() => handleSave(inputData)}>
                        Save
                      </Button> */}
                      </Flex>
                    )}
                  <Flex justify="between">
                    <Button
                      className="rounded-xl w-[40%] bg-[#242424]"
                      color="gray"
                      onClick={() =>
                        setToggleSelectionLayout(!toggleSelectionLayout)
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      className="rounded-xl w-[40%]"
                      onClick={() => handleSave()}
                    >
                      Save
                    </Button>
                  </Flex>
                </Flex>
              )}

            {toggleStartScreenQuestionLayout &&
              demoQuiz[currentQuizIndex].quizType === "Start Screen" && (
                <Flex direction="column" gap="3">
                  <Heading as="h2" size="2">
                    HEADLINE
                  </Heading>
                  <TextArea
                    value={startScreenLayoutInput.question}
                    onChange={(e) =>
                      setStartScreenLayoutInput((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }))
                    }
                    placeholder="Edit headline"
                    className="h-20 rounded-xl"
                  />
                  <Heading as="h2" size="2">
                    SUB HEADLINE
                  </Heading>
                  <TextArea
                    value={startScreenLayoutInput.subHeadline}
                    onChange={(e) =>
                      setStartScreenLayoutInput((prev) => ({
                        ...prev,
                        subHeadline: e.target.value,
                      }))
                    }
                    placeholder="Edit sub headline"
                    className="h-20 rounded-xl"
                  />
                  <Heading as="h2" size="2">
                    BUTTON TEXT
                  </Heading>
                  <TextArea
                    value={startScreenLayoutInput.buttonText}
                    onChange={(e) =>
                      setStartScreenLayoutInput((prev) => ({
                        ...prev,
                        buttonText: e.target.value,
                      }))
                    }
                    placeholder="Edit button text"
                    className="h-20 rounded-xl"
                  />

                  <Flex justify="between">
                    <Button
                      className="rounded-xl w-[40%] bg-[#242424]"
                      color="gray"
                      onClick={() =>
                        setToggleSelectionLayout(!toggleSelectionLayout)
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      className="rounded-xl w-[40%]"
                      onClick={() => {
                        updateCurrentQuizItem(startScreenLayoutInput);
                      }}
                    >
                      Save
                    </Button>
                  </Flex>
                </Flex>
              )}

            <Separator my="3" size="4" />

            <Flex direction="column" gap="3">
              <Heading as="h2" size="2" mb="3">
                BACKGROUND
              </Heading>
              <Flex justify="between" align="center">
                <Text>Color</Text>
                <input
                  type="color"
                  value={styleSettings.backgroundColor}
                  onChange={(e) =>
                    updateStyleSetting("backgroundColor", e.target.value)
                  }
                  className="w-8 h-8 rounded-lg"
                />
              </Flex>
              <Flex justify="between" align="center">
                <Text>Corner Radius</Text>
                <Flex align="center">
                  <input
                    type="number"
                    value={styleSettings.cornerRadius}
                    onChange={(e) =>
                      updateStyleSetting("cornerRadius", e.target.value)
                    }
                    className="bg-[#242424] w-12 h-8 rounded-lg p-2"
                  />
                  <Box as="span" className="text-white ml-2">
                    px
                  </Box>
                </Flex>
              </Flex>
              <Flex justify="between" align="center">
                <Text>Border Width</Text>
                <Flex align="center">
                  <input
                    type="number"
                    value={styleSettings.borderWidth}
                    onChange={(e) =>
                      updateStyleSetting("borderWidth", e.target.value)
                    }
                    className="bg-[#242424] w-12 h-8 rounded-lg p-2"
                  />
                  <Box as="span" className="text-white ml-2">
                    px
                  </Box>
                </Flex>
              </Flex>
              <Flex justify="between" align="center">
                <Text>Border Color</Text>{" "}
                <input
                  type="color"
                  value={styleSettings.borderColor}
                  onChange={(e) =>
                    updateStyleSetting("borderColor", e.target.value)
                  }
                  className="w-8 h-8 rounded-lg"
                />
              </Flex>
              <Flex justify="between" align="center">
                <Text>Button Color</Text>{" "}
                <input
                  type="color"
                  value={styleSettings.backgroundButton}
                  onChange={(e) =>
                    updateStyleSetting("backgroundButton", e.target.value)
                  }
                  className="w-8 h-8 rounded-lg"
                />
              </Flex>
              <Flex justify="between" align="center">
                <Text>Shadow</Text>{" "}
                <input
                  type="color"
                  value={styleSettings.shadow}
                  onChange={(e) => updateStyleSetting("shadow", e.target.value)}
                  className="w-8 h-8 rounded-lg"
                />
              </Flex>
            </Flex>

            <Separator my="3" size="4" />
            <Flex direction="column" gap="3">
              <Heading as="h2" size="2" mb="3">
                TEXT
              </Heading>
              <Flex justify="between" align="center" mb="2">
                <Text>Font</Text>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button
                      className="bg-[#242424] text-white flex justify-between p-2"
                      size="1"
                    >
                      <Flex gap="1">{styleSettings.font}</Flex>
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="1">
                    <DropdownMenu.Item
                      onSelect={() => updateStyleSetting("font", "Fredoka")}
                    >
                      Fredoka
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      onSelect={() => updateStyleSetting("font", "serif")}
                    >
                      serif
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      onSelect={() => updateStyleSetting("font", "sans")}
                    >
                      sans
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      onSelect={() => updateStyleSetting("font", "mono")}
                    >
                      mono
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      onSelect={() => updateStyleSetting("font", "mono")}
                    >
                      thin
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
              <Flex justify="between" align="center">
                <Text>Color</Text>
                <input
                  type="color"
                  value={styleSettings.textColor}
                  onChange={(e) =>
                    updateStyleSetting("textColor", e.target.value)
                  }
                  className="w-8 h-8 rounded-lg"
                />
              </Flex>
              <Flex justify="between" align="center">
                <Text>Line Height</Text>
                <Flex align="center">
                  <input
                    type="number"
                    value={styleSettings.lineHeight}
                    onChange={(e) =>
                      updateStyleSetting("lineHeight", e.target.value)
                    }
                    className="bg-[#242424] w-12 h-8 rounded-lg p-2"
                  />
                  <Box as="span" className="text-white ml-2">
                    px
                  </Box>
                </Flex>
              </Flex>
              <Flex justify="between" align="center">
                <Text>Letter Spacing</Text>{" "}
                <Flex align="center">
                  <input
                    type="number"
                    value={styleSettings.letterSpacing}
                    onChange={(e) =>
                      updateStyleSetting("letterSpacing", e.target.value)
                    }
                    className="bg-[#242424] w-12 h-8 rounded-lg p-2"
                  />
                  <Box as="span" className="text-white ml-2">
                    px
                  </Box>
                </Flex>
              </Flex>
              <Flex justify="between" align="center">
                <Text>Boldness</Text>{" "}
                <Flex align="center">
                  <input
                    type="number"
                    value={styleSettings.boldness}
                    onChange={(e) =>
                      updateStyleSetting("boldness", e.target.value)
                    }
                    className="bg-[#242424] w-12 h-8 rounded-lg p-2"
                    min="1"
                    max="9"
                  />
                  {/* <Box as="span" className="text-white ml-2">
                    px
                  </Box> */}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </ScrollArea>
      {/* Content */}
      <Flex
        direction="column"
        justify="between"
        align="center"
        width="100%"
        className="h-screen"
      >
        <Flex
          align="center"
          justify="between"
          className="w-full h-[60px] px-5 bg-black shadow-md z-1000"
        >
          <Flex align="center" gap="3">
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
            <Link href={`/review?quizId=${quizId}`}>
              <Button
                size="3"
                className="flex items-center gap-2 rounded-full bg-[#242424] text-white px-14 cursor-pointer text-sm font-medium"
              >
                <EyeOpenIcon color="gray" width={24} height={24} /> Preview
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
        <Flex gap="2">
          <Flex align="center" justify="center">
            <Button onClick={handleDeleteQuiz} className="bg-black h-[50px]">
              <TrashIcon color="white" className="w-8 h-8" />
            </Button>
          </Flex>
          <Box className="max-h-[100%]  overflow-hidden">
            <iframe
              // src={`http://161.35.107.18:4000/quiz/${quizId}?height=570&width=1100`}
              src={`http://localhost:4000/quiz/${quizId}?height=570&width=1100`}
              width={screen === "mobile" ? 375 : 1100}
              height={570}
              style={{
                borderRadius: `${styleSettings.cornerRadius}px`,
                overflow: "hidden",
              }}
            ></iframe>
          </Box>
        </Flex>
        {/* Footer */}
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
                  {demoQuiz.map((_, index) => (
                    <RadioCards.Item
                      key={index}
                      value={index.toString()}
                      className="relative py-1 w-40 bg-[#242424] cursor-pointer"
                      // onClick={() => setCurrentQuizIndex(index)}
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

            <Dialog.Root>
              <Dialog.Trigger>
                <Button
                  size="4"
                  className="bg-[#242424] text-white w-40 cursor-pointer"
                >
                  <PlusIcon color="white" />
                </Button>
              </Dialog.Trigger>

              <Dialog.Content maxWidth="450px">
                <Dialog.Title align="center" size="8">
                  Add New Question
                </Dialog.Title>
                <Dialog.Description size="1" mb="4" align="center">
                  Are you sure you want to add new question to your experience?
                </Dialog.Description>
                <Flex gap="3" mt="4" direction="column" justify="end">
                  <Dialog.Close>
                    <Button onClick={handleAddNewQuestion}>
                      Add New Question
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
          <Flex></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

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
  // console.log(quiz, "Finding quiz at editor");
  if (quiz.length === 0) {
    return {
      redirect: {
        destination: "/basic",
        permanent: false,
      },
    };
  }
  const layout = await LayoutFormData.findOne({ quizId }).lean();
  console.log("Layout:", layout);
  try {
    const quizzes = await QuizzesModel.findOne({ quizId }).lean();
    const styles = await StyleSettings.findOne({ quizId }).lean();
    const quizData = await QuizFormData.findById(quizId, "quizName").lean();
    const quizName = Array.isArray(quizData) ? quizData[0]?.quizName || "" : quizData?.quizName || "";
    console.log("Quiz Name:", quizName)
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
export default Editor;
