import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text, Button, Heading } from "@radix-ui/themes";

const GenerateHeader = () => {
  return (
    <Box width="100%">
      <Flex align="center" gap="4">
        <ArrowLeftIcon width={24} height={24} />
        <Box>
          <Heading as="h1" size="8" weight="medium">
            Generated Pages
          </Heading>
          <Text size="1">
            Rhoncus morbi et augue nec, in id ullamcorper at sit.
          </Text>
        </Box>
      </Flex>

      {/* Steps Navigation */}
    </Box>
  );
};
export default GenerateHeader;
