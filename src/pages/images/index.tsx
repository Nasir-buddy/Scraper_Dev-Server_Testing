import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Grid,
  IconButton,
  Spinner,
  Strong,
  Text,
  TextArea,
} from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Steps2 from ".././components/Steps2";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { GetServerSideProps } from "next";
import { connectToDatabase } from "@/lib/utils/db";
import { CaretLeftIcon, ChevronLeftIcon, InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { fal } from "@fal-ai/client";
import Image from "next/image";
import LayoutFormData from "@/schemas/layout.schema";
import QuestionFormModel from "@/schemas/questions.schema";
import ExperienceIcon from "../components/ExperienceIcon";
const model = "gpt-4o-mini";

interface ImagesPropsType {
  quizId: string;
  layoutTitle: string;
  initialStartScreenImage: string;
  initialBodyScreenImage: string;
}

const Index: React.FC<ImagesPropsType> = ({
  quizId,
  layoutTitle,
  initialStartScreenImage,
  initialBodyScreenImage,
}) => {
  // console.log("Initial images data", initialQuestions);
  const router = useRouter();
  const [startPrompt, setStartPrompt] = useState<string>("");
  const [bodyPrompt, setBodyPrompt] = useState<string>("");
  const [showPromptAreaStart, setShowPromptAreaStart] =
    useState<boolean>(false);
  const [showPromptAreaBody, setShowPromptAreaBody] = useState<boolean>(false);
  const [progressStart, setProgressStart] = useState<boolean>(false);
  const [progressBody, setProgressBody] = useState<boolean>(false);
  const [startScreenImage, setStartScreenImage] = useState<string>(
    initialStartScreenImage
  );
  const [bodyScreenImage, setBodyScreenImage] = useState<string>(
    initialBodyScreenImage
  );
  const [imageType, setImageType] = useState<"start" | "body" | null>(null);
  const [startOriginalPrompt, setStartOriginalPrompt] = useState<string>("");
  const [bodyOriginalPrompt, setBodyOriginalPrompt] = useState<string>("");
  // console.log("Start prompt", startPrompt, "Body Prompt:", bodyPrompt);
  const generate = async (imageType: "start" | "body", prompt: string) => {
    if (!prompt) {
      return;
    }
    if (imageType === "start") {
      setProgressStart(true);
      try {
        const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
          input: {
            prompt,
          },
          logs: true,
          onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS") {
              update.logs
                .map((log) => log.message)
                .forEach((message) => {
                  console.log("Queue Update:", message);
                });
            }
          },
        });
        console.log("Result Data:", result.data);
        console.log("Request ID:", result.requestId);
        setStartScreenImage(result.data?.images[0].url);
        setShowPromptAreaStart(false);
      } catch (error) {
        console.error("Error during generation:", error);
      } finally {
        setProgressStart(false);
      }
    } else if (imageType === "body") {
      setProgressBody(true);
      try {
        const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
          input: {
            prompt,
          },
          logs: true,
          onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS") {
              update.logs
                .map((log) => log.message)
                .forEach((message) => {
                  console.log("Queue Update:", message);
                });
            }
          },
        });
        console.log("Result Data:", result.data);
        console.log("Request ID:", result.requestId);
        setBodyScreenImage(result.data?.images[0].url);
        setShowPromptAreaBody(false);
      } catch (error) {
        console.error("Error during generation:", error);
      } finally {
        setProgressBody(false);
      }
    }
  };
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isModifying = searchParams.get("isModifying") === "true";

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // Ensure the key is "file"
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

        if (imageType === "start") {
          setStartScreenImage(data?.url);
        } else if (imageType === "body") {
          setBodyScreenImage(data?.url);
        }
        // Optionally update the state with the Cloudinary URL
        // setStartScreenImage(data.secure_url);
      } else {
        const errorData = await response.json();
        console.error("Failed to upload image:", errorData);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const startFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (type: "start" | "body") => {
    setImageType(type);
    startFileInputRef.current?.click();
  };

  async function handleNextClick() {
    setIsLoading(true);
    if (!startScreenImage && !bodyScreenImage) {
      return;
    }
    try {
      const imagesResponse = await fetch("/api/layoutFormApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startScreenImage,
          quizId,
          layoutTitle,
          layoutImage: bodyScreenImage,
        }),
      });

      const imagesResponseData = await imagesResponse.json();
      if (imagesResponseData.success) {
        router.push(`/review?quizId=${quizId}`);
        // console.log(imagesResponseData);
      } else {
        console.error("Error:", imagesResponseData.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGenerateImagePrompt = async (imageType: "start" | "body") => {
    imageType === "start" ? setProgressStart(true) : setProgressBody(true);
    if (imageType === "start") {
      try {
        const response = await fetch("/api/imagePromptGenerator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId,
            originalPrompt: startOriginalPrompt ? startOriginalPrompt : "",
            userPrompt: startPrompt ? startPrompt : "",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate image prompt");
        }

        const data = await response.json();
        // console.log("Data from image prompt generator", data);

        setStartPrompt(data.message);
        setStartOriginalPrompt(data.message); // Update state here
        await generate("start", data.message);
      } catch (error) {
        console.error("Error generating image prompt:", error);
      }
    } else {
      try {
        const response = await fetch("/api/imagePromptGenerator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId,
            originalPrompt: bodyOriginalPrompt ? bodyOriginalPrompt : "",
            userPrompt: bodyPrompt ? bodyPrompt : "",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate image prompt");
        }

        const data = await response.json();
        // console.log("Data from image prompt generator", data);
        setBodyPrompt(data.message);
        setBodyOriginalPrompt(data.message); // Update state here
        await generate("body", data.message);
      } catch (error) {
        console.error("Error generating image prompt:", error);
      }
    }
  };
  // console.log("Start Original Prompt", startOriginalPrompt, "Body Original Prompt", bodyOriginalPrompt);
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
        <Box
          style={{
            marginTop: "20px",
          }}
        >
          <Steps2 currentPage={6} />
        </Box>
        <Flex align="center" justify="center" mt="6" width="100%" gap="4">
          <Card className="w-1/2">
            <Flex
              className="w-full h-full"
              direction="row"
              justify="between"
              align="center"
              gap="3"
              p="6"
            >
              <Flex
                direction="column"
                height="335px"
                width="50%"
                align="center"
                justify="between"
              >
                <Flex
                  direction="column"
                  gap="1"
                  justify="center"
                  align="center"
                >
                  <Strong className="font-bold text-xl">
                    Start screen image
                  </Strong>
                  <Text>Applicable only to first screen of the quiz.</Text>
                </Flex>
                <Flex
                  direction="column"
                  gap="6"
                  width="100%"
                  height="100%"
                  justify="center"
                  align="start"
                >
                  {!showPromptAreaStart && !startScreenImage && (
                    <Button
                      disabled={progressStart || isLoading}
                      onClick={() => handleGenerateImagePrompt("start")}
                      className="rounded-full w-[143px] h-[40px] text-[#3EC4A1] bg-[#3EC4A14D] cursor-pointer"
                    >
                      {progressStart ? (
                        <Spinner />
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.66347 15H12.3364M9.99995 1V2M16.3639 3.63604L15.6568 4.34315M19 9.99995H18M2 9.99995H1M4.34309 4.34315L3.63599 3.63604M6.46441 13.5356C4.51179 11.5829 4.51179 8.41711 6.46441 6.46449C8.41703 4.51187 11.5829 4.51187 13.5355 6.46449C15.4881 8.41711 15.4881 11.5829 13.5355 13.5356L12.9884 14.0827C12.3555 14.7155 11.9999 15.5739 11.9999 16.469V17C11.9999 18.1046 11.1045 19 9.99995 19C8.89538 19 7.99995 18.1046 7.99995 17V16.469C7.99995 15.5739 7.6444 14.7155 7.01151 14.0827L6.46441 13.5356Z"
                            stroke="#3EC4A1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {progressStart ? "Generating.." : "Generate"}
                    </Button>
                  )}
                  {!showPromptAreaStart && startScreenImage && (
                    <Button
                      disabled={progressStart || isLoading}
                      onClick={() =>
                        setShowPromptAreaStart(!showPromptAreaStart)
                      }
                      className="rounded-full w-[143px] h-[40px] text-[#3EC4A1] bg-[#3EC4A14D] cursor-pointer"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.66347 15H12.3364M9.99995 1V2M16.3639 3.63604L15.6568 4.34315M19 9.99995H18M2 9.99995H1M4.34309 4.34315L3.63599 3.63604M6.46441 13.5356C4.51179 11.5829 4.51179 8.41711 6.46441 6.46449C8.41703 4.51187 11.5829 4.51187 13.5355 6.46449C15.4881 8.41711 15.4881 11.5829 13.5355 13.5356L12.9884 14.0827C12.3555 14.7155 11.9999 15.5739 11.9999 16.469V17C11.9999 18.1046 11.1045 19 9.99995 19C8.89538 19 7.99995 18.1046 7.99995 17V16.469C7.99995 15.5739 7.6444 14.7155 7.01151 14.0827L6.46441 13.5356Z"
                          stroke="#3EC4A1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Re Generate
                    </Button>
                  )}

                  {showPromptAreaStart && (
                    <Flex direction="column" gap="2" width="100%" align="end">
                      <Box width="100%">
                        <Flex align="center" gap="8px" mt="8">
                          <>
                            <IconButton variant="surface" size="1" radius="full">
                              <InfoCircledIcon />
                            </IconButton>
                            <Text size="2">
                              Pro tip: Don't remove the whole text, instead edit it until you are happy with the image.
                            </Text>
                          </>
                        </Flex>
                        <TextArea
                          disabled={isLoading || progressStart}
                          radius="full"
                          size="3"
                          value={startPrompt}
                          placeholder="Describe what kind of image you want for the start screen."
                          onChange={(e) => setStartPrompt(e.target.value)}
                        />
                        {/* <Callout.Text style={{ fontWeight: 'normal', marginTop: '8px' }}>
                          Edit only the text, don't remove prompt.
                        </Callout.Text> */}
                      </Box>
                      <Button
                        disabled={progressStart || isLoading}
                        onClick={() => handleGenerateImagePrompt("start")}
                        className="rounded-full w-[143px] h-[40px] text-[#3EC4A1] bg-[#3EC4A14D] cursor-pointer"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.66347 15H12.3364M9.99995 1V2M16.3639 3.63604L15.6568 4.34315M19 9.99995H18M2 9.99995H1M4.34309 4.34315L3.63599 3.63604M6.46441 13.5356C4.51179 11.5829 4.51179 8.41711 6.46441 6.46449C8.41703 4.51187 11.5829 4.51187 13.5355 6.46449C15.4881 8.41711 15.4881 11.5829 13.5355 13.5356L12.9884 14.0827C12.3555 14.7155 11.9999 15.5739 11.9999 16.469V17C11.9999 18.1046 11.1045 19 9.99995 19C8.89538 19 7.99995 18.1046 7.99995 17V16.469C7.99995 15.5739 7.6444 14.7155 7.01151 14.0827L6.46441 13.5356Z"
                            stroke="#3EC4A1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {progressStart ? <Spinner /> : "Confirm"}
                      </Button>
                    </Flex>
                  )}

                  <>
                    <input
                      type="file"
                      accept="image/*"
                      ref={startFileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <Button
                      disabled={isLoading}
                      className="rounded-full w-[143px] h-[40px] cursor-pointer"
                      color="gray"
                      onClick={() => handleButtonClick("start")}
                    >
                      <PlusCircledIcon />
                      Upload
                    </Button>
                  </>
                </Flex>
              </Flex>
              <Flex
                height="335px"
                width="229px"
                direction="column"
                className="bg-white rounded-2xl overflow-hidden"
              >
                {/* <TextOnly /> */}
                <Flex height="50%" width="100%" align="center" justify="center">
                  {startScreenImage ? (
                    <Image
                      src={startScreenImage}
                      alt="start-screen-image"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      width="69"
                      height="69"
                      viewBox="0 0 69 69"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.16699 51.1665L20.2744 32.0591C23.5288 28.8047 28.8052 28.8047 32.0596 32.0591L51.167 51.1665M42.8337 42.8332L49.4411 36.2257C52.6955 32.9714 57.9719 32.9714 61.2262 36.2257L67.8337 42.8332M42.8337 17.8332H42.8753M9.50033 67.8332H59.5003C64.1027 67.8332 67.8337 64.1022 67.8337 59.4998V9.49984C67.8337 4.89746 64.1027 1.1665 59.5003 1.1665H9.50033C4.89795 1.1665 1.16699 4.89746 1.16699 9.49984V59.4998C1.16699 64.1022 4.89795 67.8332 9.50033 67.8332Z"
                        stroke="#111827"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Flex>
                <Flex
                  direction="column"
                  height="50%"
                  width="100%"
                  align="center"
                  gap="4"
                >
                  <Strong className="font-bold text-xl text-black">
                    [HEADLINE]
                  </Strong>
                  <Text className="text-black">[SUBHEADLINE]</Text>
                  <Flex
                    align="center"
                    justify="center"
                    className="rounded-full w-[143px] h-[40px] bg-[#868686]"
                  >
                    [Button]
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Card className="w-1/2">
            <Flex
              className="w-full h-full"
              direction="row"
              justify="between"
              align="center"
              gap="3"
              p="6"
            >
              <Flex
                direction="column"
                height="335px"
                width="50%"
                align="center"
                justify="between"
              >
                <Flex
                  direction="column"
                  gap="1"
                  justify="center"
                  align="center"
                >
                  <Strong className="font-bold text-xl">
                    Body screen image
                  </Strong>
                  <Text>
                    Applicable to all screens of the quiz except for the Start
                    screen.
                  </Text>
                </Flex>
                <Flex
                  direction="column"
                  gap="6"
                  width="100%"
                  height="100%"
                  justify="center"
                  align="start"
                >
                  {!showPromptAreaBody && !bodyScreenImage && (
                    <Button
                      disabled={isLoading || progressBody}
                      onClick={() => handleGenerateImagePrompt("body")}
                      className="rounded-full w-[143px] h-[40px] text-[#3EC4A1] bg-[#3EC4A14D] cursor-pointer"
                    >
                      {progressBody ? (
                        <Spinner />
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.66347 15H12.3364M9.99995 1V2M16.3639 3.63604L15.6568 4.34315M19 9.99995H18M2 9.99995H1M4.34309 4.34315L3.63599 3.63604M6.46441 13.5356C4.51179 11.5829 4.51179 8.41711 6.46441 6.46449C8.41703 4.51187 11.5829 4.51187 13.5355 6.46449C15.4881 8.41711 15.4881 11.5829 13.5355 13.5356L12.9884 14.0827C12.3555 14.7155 11.9999 15.5739 11.9999 16.469V17C11.9999 18.1046 11.1045 19 9.99995 19C8.89538 19 7.99995 18.1046 7.99995 17V16.469C7.99995 15.5739 7.6444 14.7155 7.01151 14.0827L6.46441 13.5356Z"
                            stroke="#3EC4A1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {progressBody ? "Generating.." : "Generate"}
                    </Button>
                  )}
                  {!showPromptAreaBody && bodyScreenImage && (
                    <Button
                      disabled={isLoading || progressBody}
                      onClick={() => setShowPromptAreaBody(!showPromptAreaBody)}
                      className="rounded-full w-[143px] h-[40px] text-[#3EC4A1] bg-[#3EC4A14D] cursor-pointer"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.66347 15H12.3364M9.99995 1V2M16.3639 3.63604L15.6568 4.34315M19 9.99995H18M2 9.99995H1M4.34309 4.34315L3.63599 3.63604M6.46441 13.5356C4.51179 11.5829 4.51179 8.41711 6.46441 6.46449C8.41703 4.51187 11.5829 4.51187 13.5355 6.46449C15.4881 8.41711 15.4881 11.5829 13.5355 13.5356L12.9884 14.0827C12.3555 14.7155 11.9999 15.5739 11.9999 16.469V17C11.9999 18.1046 11.1045 19 9.99995 19C8.89538 19 7.99995 18.1046 7.99995 17V16.469C7.99995 15.5739 7.6444 14.7155 7.01151 14.0827L6.46441 13.5356Z"
                          stroke="#3EC4A1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Re Generate
                    </Button>
                  )}
                  {showPromptAreaBody && (
                    <Flex direction="column" gap="2" width="100%" align="end">
                      <Box width="100%">
                        <Flex align="center" gap="8px" mt="8">
                          <>
                            <IconButton variant="surface" size="1" radius="full">
                              <InfoCircledIcon />
                            </IconButton>
                            <Text size="2">
                              Pro tip: Don't remove the whole text, instead edit it until you are happy with the image.
                            </Text>
                          </>
                        </Flex>
                        <TextArea
                          disabled={isLoading || progressBody}
                          radius="full"
                          size="3"
                          value={bodyPrompt}
                          placeholder="Describe what kind of image you want for the body screens."
                          onChange={(e) => setBodyPrompt(e.target.value)}
                        />
                        {/* <Callout.Text style={{ fontWeight: 'normal', marginTop: '8px' }}>
                          Edit only the text, don't remove prompt.
                        </Callout.Text> */}
                      </Box>
                      <Button
                        disabled={progressBody || isLoading}
                        onClick={() => handleGenerateImagePrompt("body")}
                        className="rounded-full w-[143px] h-[40px] text-[#3EC4A1] bg-[#3EC4A14D] cursor-pointer"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.66347 15H12.3364M9.99995 1V2M16.3639 3.63604L15.6568 4.34315M19 9.99995H18M2 9.99995H1M4.34309 4.34315L3.63599 3.63604M6.46441 13.5356C4.51179 11.5829 4.51179 8.41711 6.46441 6.46449C8.41703 4.51187 11.5829 4.51187 13.5355 6.46449C15.4881 8.41711 15.4881 11.5829 13.5355 13.5356L12.9884 14.0827C12.3555 14.7155 11.9999 15.5739 11.9999 16.469V17C11.9999 18.1046 11.1045 19 9.99995 19C8.89538 19 7.99995 18.1046 7.99995 17V16.469C7.99995 15.5739 7.6444 14.7155 7.01151 14.0827L6.46441 13.5356Z"
                            stroke="#3EC4A1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {progressBody ? <Spinner /> : "Confirm"}
                      </Button>
                    </Flex>
                  )}
                  <Button
                    disabled={isLoading}
                    onClick={() => handleButtonClick("body")}
                    className="rounded-full w-[143px] h-[40px] cursor-pointer"
                    color="gray"
                  >
                    <PlusCircledIcon />
                    Upload
                  </Button>
                </Flex>
              </Flex>
              <Flex
                align="center"
                height="335px"
                width="350px"
                className="bg-white rounded-2xl overflow-hidden"
              >
                <Flex align="center" justify="center" width="45%" height="100%">
                  {bodyScreenImage ? (
                    <Image
                      src={bodyScreenImage}
                      alt="start-screen-image"
                      width={300}
                      height={500}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <svg
                      width="69"
                      height="69"
                      viewBox="0 0 69 69"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.16699 51.1665L20.2744 32.0591C23.5288 28.8047 28.8052 28.8047 32.0596 32.0591L51.167 51.1665M42.8337 42.8332L49.4411 36.2257C52.6955 32.9714 57.9719 32.9714 61.2262 36.2257L67.8337 42.8332M42.8337 17.8332H42.8753M9.50033 67.8332H59.5003C64.1027 67.8332 67.8337 64.1022 67.8337 59.4998V9.49984C67.8337 4.89746 64.1027 1.1665 59.5003 1.1665H9.50033C4.89795 1.1665 1.16699 4.89746 1.16699 9.49984V59.4998C1.16699 64.1022 4.89795 67.8332 9.50033 67.8332Z"
                        stroke="#111827"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Flex>
                <Flex
                  width="55%"
                  height="100%"
                  direction="column"
                  align="center"
                  justify="center"
                  gap="3"
                >
                  <Strong className="font-bold text-2xl text-black">
                    QUESTION
                  </Strong>
                  <Box className="text-xl rounded-full w-[143px] h-[40px] text-black border border-gray-300 flex items-center gap-2 justify-center">
                    <Box className="w-4 h-4 border border-gray-300 rounded-full"></Box>
                    Option 1
                  </Box>
                  <Box className="text-xl rounded-full w-[143px] h-[40px] text-black border border-gray-300 flex items-center gap-2 justify-center">
                    <Box className="w-4 h-4 border border-gray-300 rounded-full"></Box>
                    Option 2
                  </Box>
                  <Box className="text-xl rounded-full w-[143px] h-[40px] text-black border border-gray-300 flex items-center gap-2 justify-center">
                    <Box className="w-4 h-4 border border-gray-300 rounded-full"></Box>
                    Option 3
                  </Box>

                  <Flex
                    align="center"
                    justify="center"
                    className="rounded-full w-[143px] h-[40px] bg-[#868686]"
                  >
                    [Button]
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          {/* </RadioCards.Root> */}
        </Flex>
        <Flex
          style={{
            bottom: "0",
            right: "0",
            width: "100%",
            boxSizing: "border-box",
            marginRight: "40px",
          }}
          justify="between"
          align="center"
        >
          <Flex gap="5" style={{ marginLeft: "auto" }}>
            {/* <Button
              size="3"
              variant="surface"
              disabled={isLoading}
              color="gray"
              className="rounded-full cursor-pointer w-[200px] relative"
              onClick={() =>
                router.push(isModifying ? "/basic" : `/layout?quizId=${quizId}`)
              }
              // onClick={() => handleGenerateImagePrompt("start")}
            >
              <CaretLeftIcon className="ablosute left-2 w-6 h-6" />
              {isModifying ? "Cancel" : "Back"}
            </Button> */}
            <Button
              size="3"
              variant="surface"
              disabled={isLoading}
              color="gray"
              onClick={() =>
                router.push(isModifying ? "/basic" : `/layout?quizId=${quizId}`)
              }
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
              disabled={isLoading || !(startScreenImage && bodyScreenImage)}
              onClick={handleNextClick}
              size="3"
              className={`rounded-full w-[200px] ${isLoading || !(startScreenImage && bodyScreenImage)
                  ? "bg-[#868686] text-white"
                  : "bg-[#3EC4A1] cursor-pointer"
                }`}
              loading={isLoading}
            >
              Create Experience
            </Button> */}
            <Button
              size="3"
              onClick={handleNextClick}
              disabled={isLoading || !(startScreenImage && bodyScreenImage)}
              loading={isLoading}
              className={`rounded-full w-[200px] ${isLoading || !(startScreenImage && bodyScreenImage)
                ? "bg-[#868686] text-white"
                : "bg-[#3EC4A1] cursor-pointer"
                }`}
              style={{
                width: "223px",
                height: "48px",
                cursor: "pointer",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                position: "relative",
                paddingLeft: "10px",
              }}
            >
              <>
                <ExperienceIcon />
                <span className="ml-2">Create Experience</span>
              </>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Index;
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

  try {
    await connectToDatabase();

    const initialImagesResponseData = await LayoutFormData.findOne({
      quizId,
    }).lean();
    // const questions = await QuestionFormModel.findOne(
    //   { quizId },
    //   { questionAnswer: 1, _id: 0 } // Projection to retrieve only questionAnswer
    // ).lean();
    // const initialAnswers = questions
    //   ? questions.questionAnswer.map((answer: any) => ({
    //     ...answer,
    //     _id: answer._id.toString(),
    //   }))
    //   : [];
    // console.log("Questions:", questions?.questionAnswer);
    return {
      props: {
        quizId,
        // initialQuestions: initialAnswers,
        layoutTitle: initialImagesResponseData?.layoutTitle,
        initialStartScreenImage:
          initialImagesResponseData?.startScreenImage || "",
        initialBodyScreenImage: initialImagesResponseData?.layoutImage || "",
      },
    };
  } catch (error) {
    return {
      props: {
        quizId,
        // initialQuestions: [],
        layoutTitle: "",
        initialStartScreenImage: "",
        initialBodyScreenImage: "",
      },
    };
  }
};
