import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import React from "react";

const SuggestionsBox = ({ quizId }: { quizId: string }) => {
  const router = useRouter();
  const suggestions = Array(5).fill(null);
  const handleFixClick = () => router.push(`/editor?quizId=${quizId}`);
  return (
    <Flex gap="3" direction="column" className="px-4 pb-4">
      {suggestions.map((_, index) => (
        <Flex
          key={index}
          align="center"
          width="full"
          className="bg-[#111111] h-[63px] rounded-xl pl-2 pr-2"
        >
          <Flex align="center" justify="between" width="100%">
            <Flex gap="2" align="center">
              <Box
                as="span"
                className="flex items-center justify-center w-[35px] h-[35px] bg-[#FAC4234D] rounded-full mr-2"
              >
                <ExclamationTriangleIcon className="text-[#FAC423] w-[15px] h-[15px]" />
              </Box>
              <Box>
                <Text as="div" size="2">
                  Products missing keywords{" "}
                  <Text className="text-[#D40D3D]">(All Products)</Text>
                </Text>
                <Text as="div" size="2" color="gray">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptatem ullam ea soluta facere culpa est.
                </Text>
              </Box>
            </Flex>
            <Flex gap="3">
              <Button
                size="3"
                radius="full"
                color="gray"
                variant="soft"
                className="w-[132px] cursor-pointer bg-[#171717] text-[14px]"
              >
                Dismiss
              </Button>
              <Button
                onClick={handleFixClick}
                size="3"
                radius="full"
                className="w-[132px] cursor-pointer bg-[#3EC4A14D] text-[14px]"
                variant="soft"
              >
                Fix
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default SuggestionsBox;
