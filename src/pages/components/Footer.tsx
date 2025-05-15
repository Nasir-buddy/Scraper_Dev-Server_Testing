import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

const Footer = ({
  nextRoute,
  prevRoute,
  onCreateExperience, 
  showCreateExperience, 
  showText, 
}: {
  nextRoute: string | null;
  prevRoute: string | null;
  onCreateExperience?: () => void; 
  showCreateExperience: boolean;
  showText: boolean; 
}) => {
  const router = useRouter();

  return (
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
      <Flex align="center" gap="3px">
        {showText && (
          <>
            <IconButton variant="surface" size="1" radius="full">
              <InfoCircledIcon />
            </IconButton>
            <Text size="2">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for
            </Text>
          </>
        )}
      </Flex>

      {/* Right-side content: Buttons */}
      <Flex gap="10px" style={{ marginLeft: 'auto' }}>
       
        {prevRoute && (
          <Button
            size="3"
            variant="surface"
            color="gray"
            onClick={() => router.push(prevRoute)}
            style={{ width: "150px" }}
          >
            Back
          </Button>
        )}
         {showCreateExperience && onCreateExperience && (
          <Button
            size="3"
            variant="surface"
            onClick={onCreateExperience} 
            style={{ width: '200px', backgroundColor: '#3EB489' ,color:'black'}} 
          >
            Create Experience
          </Button>
        )}
        {nextRoute && (
          <Button
            size="3"
            onClick={() => router.push(nextRoute)}
            style={{ width: '300px', backgroundColor: '#3EB489' }}
          >
            Next
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Footer;
