import { Box, Flex } from "@radix-ui/themes";
import HeaderProp from "./components/HeaderProp";
import FinalStand from "./components/FinalStand";

const standAlone = () => {
  return (
    <Box p="9">
      <Flex direction="column" gap="4">
        <Box>
          <HeaderProp prevRoute="/" previewRoute="/" generateRoute="/" />
        </Box>

        <Box style={{ marginTop: "40px" }}>
          <FinalStand />
        </Box>
      </Flex>
    </Box>
  );
};

export default standAlone;
