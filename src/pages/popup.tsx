import { Box, Flex } from "@radix-ui/themes";
import HeaderProp from "./components/HeaderProp";
import CommonStand from "./components/CommonStand";

const popup = () => {
  return (
    <Box minHeight="100dvh" minWidth="100vw" p="9">
      <Flex direction="column" gap="4">
        <Box>
          <HeaderProp prevRoute="/" previewRoute="/" generateRoute="/" />
        </Box>

        <Box style={{ marginTop: "40px" }}>
          <CommonStand
            title="Pop-up (Product Related Quiz)"
            subtitle="Companion is an onsite widget that integrates seamlessly with your website"
            placeholder="An iframe can be used as the target frame for a link. The target attribute of the link must refer to the name attribute of the iframe:"
            buttonText="Add Another Code"
            onButtonClick={() => {
              console.log("Button clicked!");
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default popup;
