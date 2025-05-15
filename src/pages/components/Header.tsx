import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text, Heading } from "@radix-ui/themes";
import { useRouter } from "next/router";


function Header() {
  const router = useRouter();

  function handleBackClick() {
    router.push("/basic");
  }
  return (
    <Box width="100%">
      <Flex align="center" gap="4">
        <ArrowLeftIcon
          width={24}
          height={24}
          onClick={handleBackClick}
          cursor="pointer"
        />
        <Box>
          <Heading as="h1" size="8" weight="medium">
            Create Experience
          </Heading>
          <Text size="1">
            Rhoncus morbi et augue nec, in id ullamcorper at sit.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
export default Header;
