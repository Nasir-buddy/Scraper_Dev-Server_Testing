import Final from "./components/Final";
import Footer from "./components/Footer";
import { Box, Flex, Grid } from "@radix-ui/themes";
import HeaderProp from "./components/HeaderProp";

const preference = () => {
  return (
    <Box p="2">
      <Flex direction="column" gap="4">
        <HeaderProp
          prevRoute="/review"
          previewRoute="/review"
          generateRoute={null}
        />

        <Final />
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Footer
            nextRoute="/companion"
            prevRoute=""
            showText={false}
            showCreateExperience={false}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default preference;
