import { Button, Flex,Text } from "@radix-ui/themes";
import { ReaderIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface HeaderProps {
  prevRoute?: string | null;  
  previewRoute?: string | null;  
  generateRoute?: string | null; 
}

const HeaderProp: React.FC<HeaderProps> = ({ prevRoute, previewRoute, generateRoute }) => {
  const router = useRouter();

  return (
    <Flex
      style={{
        maxWidth: "1310px",
        padding: "10px",
        boxSizing: "border-box",
        backgroundColor: "black",
        borderRadius: "5px",
      }}
      justify="between"
      width="100%"
    >
      {/* Left side: Icon */}
      <Flex align="center" gap="8px">
        <IconButton variant="surface" size="1" radius="full">
          <ReaderIcon />
        </IconButton>
        <Text size="3" style={{fontWeight:'bold',fontFamily: 'Mulish, sans-serif'}}>
         Quiz1234
        </Text>
      </Flex>

      {/* Right side: Buttons */}
      <Flex gap="4">
        {prevRoute && (
          <Button
            size="3"
            variant="surface"
            color="gray"
            onClick={() => router.push(prevRoute)} // Navigate to previous route
          >
            Back
          </Button>
        )}

        {previewRoute && (
          <Button
            size="3"
            variant="surface"
            color="gray"
            onClick={() => router.push(previewRoute)} // Navigate to preview route
          >
            Preview
          </Button>
        )}

        {generateRoute && (
          <Button
            size="3"
            onClick={() => router.push(generateRoute)} // Navigate to generate route
            style={{
              backgroundColor: "#3EB489",
              color: "black",
              fontWeight: 600,
            }}
          >
            Generate Tags
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default HeaderProp;
